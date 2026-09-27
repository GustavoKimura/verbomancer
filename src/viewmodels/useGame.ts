import { useState, useEffect, useCallback, useMemo } from 'react';
import type { GameMode, BoardState, KeyStatusMap, LetterStatus } from '../types/game';
import { getDailyIndex, getDailyTargetWords, getNormalizedTargets } from '../services/daily';
import { normalizeWord, isValidWord } from '../services/wordList';
import { evaluateGuess } from '../services/evaluator';
import { loadGameProgress, saveGameProgress } from '../services/storage';

const MODE_CONFIG = {
    termo: { boardsCount: 1, maxRows: 6 },
    dueto: { boardsCount: 2, maxRows: 7 },
    quarteto: { boardsCount: 4, maxRows: 9 },
};

export const useGame = (mode: GameMode) => {
    const [dayIndex] = useState<number>(() => getDailyIndex());
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [notification, setNotification] = useState<string | null>(null);

    const targetWords = useMemo(() => getDailyTargetWords(mode, dayIndex), [mode, dayIndex]);
    const normalizedTargets = useMemo(() => getNormalizedTargets(targetWords), [targetWords]);
    const config = MODE_CONFIG[mode];

    const [guesses, setGuesses] = useState<string[]>(() => {
        return loadGameProgress(mode, dayIndex);
    });

    useEffect(() => {
        setGuesses(loadGameProgress(mode, dayIndex));
        setCurrentGuess('');
        setNotification(null);
    }, [mode, dayIndex]);

    const boards: BoardState[] = useMemo(() => {
        return targetWords.map((target, idx) => {
            const targetNorm = normalizedTargets[idx];
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
                wordLength: 5,
                isSolved,
                isFailed,
            };
        });
    }, [targetWords, normalizedTargets, guesses, config.maxRows]);

    const isGameOver = useMemo(() => {
        const allSolved = boards.every((b) => b.isSolved);
        const reachedLimit = guesses.length >= config.maxRows;
        return allSolved || reachedLimit;
    }, [boards, guesses.length, config.maxRows]);

    const isGameWon = useMemo(() => {
        return boards.every((b) => b.isSolved);
    }, [boards]);

    const showNotification = useCallback((message: string) => {
        setNotification(message);
        const timer = setTimeout(() => {
            setNotification((curr) => (curr === message ? null : curr));
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const submitGuess = useCallback(() => {
        if (isGameOver) {
            return;
        }

        if (currentGuess.length < 5) {
            showNotification('Letras insuficientes');
            return;
        }

        const normalizedGuess = normalizeWord(currentGuess);

        if (!isValidWord(normalizedGuess)) {
            showNotification('Palavra não encontrada');
            return;
        }

        const nextGuesses = [...guesses, normalizedGuess];
        setGuesses(nextGuesses);
        setCurrentGuess('');
        saveGameProgress(mode, dayIndex, nextGuesses);

        const willBeSolved = boards.every((b) => {
            return b.isSolved || normalizedGuess === b.targetNormalized;
        });

        if (willBeSolved) {
            showNotification('Vitória extraordinária!');
        } else if (nextGuesses.length >= config.maxRows) {
            showNotification('O grimório foi fechado.');
        }
    }, [currentGuess, isGameOver, guesses, boards, mode, dayIndex, config.maxRows, showNotification]);

    const handleKeyPress = useCallback(
        (key: string) => {
            if (isGameOver) return;

            const upperKey = key.toUpperCase();

            if (upperKey === 'ENTER') {
                submitGuess();
            } else if (upperKey === 'BACKSPACE' || upperKey === 'DEL') {
                setCurrentGuess((prev) => prev.slice(0, -1));
            } else if (/^[A-Z]$/.test(upperKey) && currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + upperKey);
            }
        },
        [currentGuess.length, isGameOver, submitGuess]
    );

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            handleKeyPress(e.key);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [handleKeyPress]);

    const keyboardStatuses = useMemo<KeyStatusMap>(() => {
        const map: KeyStatusMap = {};
        const priority: Record<LetterStatus, number> = {
            right: 3,
            place: 2,
            wrong: 1,
            tbd: 0,
            empty: 0,
        };

        boards.forEach((board) => {
            board.guesses.forEach((guess) => {
                const evaluated = evaluateGuess(guess, board.targetNormalized, board.targetWord);
                evaluated.forEach(({ letter, status }) => {
                    const norm = normalizeWord(letter);
                    const currentPriority = map[norm] ? priority[map[norm]] : 0;
                    const newPriority = priority[status];
                    if (newPriority > currentPriority) {
                        map[norm] = status;
                    }
                });
            });
        });

        return map;
    }, [boards]);

    return {
        dayIndex,
        boards,
        currentGuess,
        guesses,
        maxRows: config.maxRows,
        isGameOver,
        isGameWon,
        notification,
        keyboardStatuses,
        handleKeyPress,
    };
};