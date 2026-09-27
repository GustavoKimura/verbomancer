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
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [notification, setNotification] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState<boolean>(false);
    const [targetWords, setTargetWords] = useState<string[]>([]);

    const config = GAME_CONFIG.modes[mode];

    useEffect(() => {
        let mounted = true;
        wordService.initialize().then(() => {
            if (mounted) {
                setTargetWords(wordService.getDailyWords(mode, dayNumber));
                setIsReady(true);
            }
        });
        return () => {
            mounted = false;
        };
    }, [mode, dayNumber]);

    useEffect(() => {
        const interval = setInterval(() => {
            const current = getDailyNumber();
            if (current !== dayNumber) {
                setDayNumber(current);
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [dayNumber]);

    const [guesses, setGuesses] = useState<string[]>(() => {
        return loadGameProgress(mode, dayNumber);
    });

    useEffect(() => {
        setGuesses(loadGameProgress(mode, dayNumber));
        setCurrentGuess('');
        setNotification(null);
    }, [mode, dayNumber]);

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
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const submitGuess = useCallback(() => {
        if (isGameOver || !isReady) return;

        if (currentGuess.length < GAME_CONFIG.wordLength) {
            showNotification(GAME_CONFIG.messages.insufficientLetters);
            triggerShake();
            return;
        }

        const normalizedGuess = normalizeWord(currentGuess);

        if (!wordService.isValid(normalizedGuess)) {
            showNotification(GAME_CONFIG.messages.wordNotFound);
            triggerShake();
            return;
        }

        const nextGuesses = [...guesses, normalizedGuess];
        setGuesses(nextGuesses);
        setCurrentGuess('');
        saveGameProgress(mode, dayNumber, nextGuesses);

        const willBeSolved = boards.every((b) => {
            return b.isSolved || normalizedGuess === b.targetNormalized;
        });

        if (willBeSolved) {
            showNotification(GAME_CONFIG.messages.victory);
        } else if (nextGuesses.length >= config.maxRows) {
            showNotification(GAME_CONFIG.messages.defeat);
        }
    }, [
        currentGuess,
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

    const handleKeyPress = useCallback(
        (key: string) => {
            if (isGameOver || !isReady) return;

            const upperKey = key.toUpperCase();

            if (upperKey === 'ENTER') {
                submitGuess();
            } else if (upperKey === 'BACKSPACE' || upperKey === 'DEL') {
                setCurrentGuess((prev) => prev.slice(0, -1));
            } else if (/^[A-Z]$/.test(upperKey) && currentGuess.length < GAME_CONFIG.wordLength) {
                setCurrentGuess((prev) => prev + upperKey);
            }
        },
        [currentGuess.length, isGameOver, isReady, submitGuess]
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
        currentGuess,
        guesses,
        maxRows: config.maxRows,
        isGameOver,
        isGameWon,
        notification,
        isShaking,
        keyboardMultiStatuses,
        handleKeyPress,
    };
};