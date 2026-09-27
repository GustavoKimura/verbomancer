import { useState, useEffect, useCallback, useMemo } from 'react';
import type { GameMode, BoardState, KeyBoardStatusMulti, LetterStatus } from '../types/game';
import { GAME_CONFIG } from '../config/game.config';
import { getDailyNumber } from '../services/daily';
import { wordService, normalizeWord } from '../services/wordService';
import { evaluateGuess } from '../services/evaluator';
import { loadGameProgress, saveGameProgress } from '../services/storage';

export const useGameViewModel = (mode: GameMode) => {
    const [dayNumber, setDayNumber] = useState<number>(() => getDailyNumber());
    const [isReady, setIsReady] = useState<boolean>(false);
    const [currentLetters, setCurrentLetters] = useState<string[]>(['', '', '', '', '']);
    const [cursorIndex, setCursorIndex] = useState<number | null>(0);
    const [notification, setNotification] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState<boolean>(false);
    const [animatingRowIndex, setAnimatingRowIndex] = useState<number | null>(null);

    const [guessesByMode, setGuessesByMode] = useState<Record<GameMode, string[]>>(() => ({
        espectro: loadGameProgress('espectro', getDailyNumber()),
        sombras: loadGameProgress('sombras', getDailyNumber()),
        catacumba: loadGameProgress('catacumba', getDailyNumber()),
    }));

    const guesses = guessesByMode[mode] || [];
    const config = GAME_CONFIG.modes[mode];

    useEffect(() => {
        let mounted = true;
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 5000));

        Promise.all([wordService.initialize(), minLoadingTime]).then(() => {
            if (mounted) {
                setIsReady(true);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        setCurrentLetters(['', '', '', '', '']);
        setCursorIndex(0);
        setNotification(null);
        setAnimatingRowIndex(null);
    }, [mode]);

    useEffect(() => {
        const interval = setInterval(() => {
            const current = getDailyNumber();
            if (current !== dayNumber) {
                setDayNumber(current);
                setGuessesByMode({
                    espectro: loadGameProgress('espectro', current),
                    sombras: loadGameProgress('sombras', current),
                    catacumba: loadGameProgress('catacumba', current),
                });
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [dayNumber]);

    const targetWords = useMemo(() => {
        if (!isReady) return [];
        return wordService.getDailyWords(mode, dayNumber);
    }, [mode, dayNumber, isReady]);

    const normalizedTargets = useMemo(() => {
        return targetWords.map(normalizeWord);
    }, [targetWords]);

    const boards: BoardState[] = useMemo(() => {
        return targetWords.map((target, idx) => {
            const targetNorm = normalizedTargets[idx] || '';
            const boardGuesses: string[] = [];

            for (const guess of guesses) {
                boardGuesses.push(guess);
                if (guess === targetNorm) {
                    break;
                }
            }

            const isSolved = boardGuesses.includes(targetNorm);
            const isFailed = !isSolved && guesses.length >= config.maxRows;

            return {
                id: `board-${idx}`,
                targetWord: target,
                targetNormalized: targetNorm,
                guesses: boardGuesses,
                maxRows: config.maxRows,
                wordLength: GAME_CONFIG.wordLength,
                isSolved,
                isFailed,
            };
        });
    }, [targetWords, normalizedTargets, guesses, config.maxRows]);

    const isGameOver = useMemo(() => {
        if (boards.length === 0) return false;
        const allSolved = boards.every((b) => b.isSolved);
        const reachedLimit = guesses.length >= config.maxRows;
        return allSolved || reachedLimit;
    }, [boards, guesses.length, config.maxRows]);

    const isGameWon = useMemo(() => {
        if (boards.length === 0) return false;
        return boards.every((b) => b.isSolved);
    }, [boards]);

    const triggerShake = useCallback(() => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
    }, []);

    const showNotification = useCallback((message: string) => {
        setNotification(message);
        const timer = setTimeout(() => {
            setNotification((curr) => (curr === message ? null : curr));
        }, 3200);
        return () => clearTimeout(timer);
    }, []);

    const currentGuessString = useMemo(() => {
        return currentLetters.join('');
    }, [currentLetters]);

    const submitGuess = useCallback(() => {
        if (isGameOver || !isReady) return;

        if (currentGuessString.length < GAME_CONFIG.wordLength) {
            showNotification(GAME_CONFIG.messages.insufficientLetters);
            triggerShake();
            return;
        }

        const normalizedGuess = normalizeWord(currentGuessString);

        if (!wordService.isValid(normalizedGuess)) {
            showNotification(GAME_CONFIG.messages.wordNotFound);
            triggerShake();
            return;
        }

        const newRowIndex = guesses.length;
        setAnimatingRowIndex(newRowIndex);

        const nextGuesses = [...guesses, normalizedGuess];
        setGuessesByMode((prev) => ({
            ...prev,
            [mode]: nextGuesses,
        }));
        setCurrentLetters(['', '', '', '', '']);
        setCursorIndex(0);
        saveGameProgress(mode, dayNumber, nextGuesses);

        const willBeSolved = boards.every((b) => {
            return b.isSolved || normalizedGuess === b.targetNormalized;
        });

        if (willBeSolved) {
            showNotification(GAME_CONFIG.messages.victory);
        } else if (nextGuesses.length >= config.maxRows) {
            showNotification(GAME_CONFIG.messages.defeat);
        }

        setTimeout(() => {
            setAnimatingRowIndex(null);
        }, 1000);
    }, [
        currentGuessString,
        isGameOver,
        isReady,
        guesses,
        boards,
        mode,
        dayNumber,
        config.maxRows,
        showNotification,
        triggerShake,
    ]);

    const moveCursor = useCallback((direction: 'left' | 'right') => {
        setCursorIndex((prev) => {
            if (prev === null) {
                return direction === 'right' ? 0 : GAME_CONFIG.wordLength - 1;
            }
            if (direction === 'left') {
                return Math.max(0, prev - 1);
            }
            return Math.min(GAME_CONFIG.wordLength - 1, prev + 1);
        });
    }, []);

    const handleTileClick = useCallback((index: number) => {
        setCursorIndex(index);
    }, []);

    const handleKeyPress = useCallback(
        (key: string) => {
            if (isGameOver || !isReady) return;

            const upperKey = key.toUpperCase();

            if (upperKey === 'ENTER') {
                submitGuess();
                return;
            }

            if (upperKey === 'ARROWLEFT') {
                moveCursor('left');
                return;
            }

            if (upperKey === 'ARROWRIGHT') {
                moveCursor('right');
                return;
            }

            if (upperKey === 'BACKSPACE' || upperKey === 'DEL') {
                setCurrentLetters((prev) => {
                    const next = [...prev];
                    const targetIdx = cursorIndex !== null ? cursorIndex : 4;

                    if (next[targetIdx] !== '') {
                        next[targetIdx] = '';
                        setCursorIndex(targetIdx);
                    } else if (targetIdx > 0) {
                        next[targetIdx - 1] = '';
                        setCursorIndex(targetIdx - 1);
                    }
                    return next;
                });
                return;
            }

            const normalizedChar = normalizeWord(upperKey);

            if (/^[A-Z]$/.test(normalizedChar)) {
                setCurrentLetters((prev) => {
                    const isFull = prev.every((c) => c !== '');
                    if (isFull && cursorIndex === null) {
                        return prev;
                    }

                    const next = [...prev];
                    let insertIdx = cursorIndex;

                    if (insertIdx === null) {
                        const firstEmpty = next.findIndex((ch) => ch === '');
                        if (firstEmpty === -1) {
                            return prev;
                        }
                        insertIdx = firstEmpty;
                    }

                    next[insertIdx] = normalizedChar;

                    const firstEmpty = next.findIndex((ch) => ch === '');
                    if (firstEmpty !== -1) {
                        setCursorIndex(firstEmpty);
                    } else {
                        setCursorIndex(null);
                    }

                    return next;
                });
            }
        },
        [cursorIndex, isGameOver, isReady, moveCursor, submitGuess]
    );

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
            }
            handleKeyPress(e.key);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [handleKeyPress]);

    const keyboardMultiStatuses = useMemo<KeyBoardStatusMulti>(() => {
        const map: KeyBoardStatusMulti = {};
        const boardsCount = config.boardsCount;

        boards.forEach((board, boardIdx) => {
            board.guesses.forEach((guess) => {
                const evaluated = evaluateGuess(guess, board.targetNormalized, board.targetWord);
                evaluated.forEach(({ letter, status }) => {
                    const norm = normalizeWord(letter);
                    if (!map[norm]) {
                        map[norm] = Array(boardsCount).fill('empty');
                    }

                    const currentStatus = map[norm][boardIdx];
                    const priority: Record<LetterStatus, number> = {
                        right: 3,
                        place: 2,
                        wrong: 1,
                        tbd: 0,
                        empty: 0,
                    };

                    if (priority[status] > priority[currentStatus]) {
                        map[norm][boardIdx] = status;
                    }
                });
            });
        });

        return map;
    }, [boards, config.boardsCount]);

    return {
        dayNumber,
        isReady,
        boards,
        currentLetters,
        cursorIndex,
        guesses,
        maxRows: config.maxRows,
        isGameOver,
        isGameWon,
        notification,
        isShaking,
        animatingRowIndex,
        keyboardMultiStatuses,
        handleKeyPress,
        handleTileClick,
    };
};