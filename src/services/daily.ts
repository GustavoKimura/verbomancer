import { TARGET_WORDS, normalizeWord } from './wordList';
import type { GameMode } from '../types/game';

const EPOCH_DATE = new Date('2022-01-01T00:00:00');

export const getDailyIndex = (): number => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffTime = today.getTime() - EPOCH_DATE.getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
};

export const getDailyTargetWords = (mode: GameMode, dayIndex: number): string[] => {
    const total = TARGET_WORDS.length;

    if (mode === 'termo') {
        const word = TARGET_WORDS[dayIndex % total];
        return [word];
    }

    if (mode === 'dueto') {
        const w1 = TARGET_WORDS[(dayIndex * 2) % total];
        const w2 = TARGET_WORDS[(dayIndex * 2 + 1) % total];
        return [w1, w2];
    }

    const w1 = TARGET_WORDS[(dayIndex * 4) % total];
    const w2 = TARGET_WORDS[(dayIndex * 4 + 1) % total];
    const w3 = TARGET_WORDS[(dayIndex * 4 + 2) % total];
    const w4 = TARGET_WORDS[(dayIndex * 4 + 3) % total];
    return [w1, w2, w3, w4];
};

export const getNormalizedTargets = (words: string[]): string[] => {
    return words.map(normalizeWord);
};