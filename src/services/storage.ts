import type { GameMode } from '../types/game';

interface StoredGameProgress {
    dayIndex: number;
    guesses: string[];
}

export const loadGameProgress = (mode: GameMode, dayIndex: number): string[] => {
    const key = `verbomancer_${mode}_${dayIndex}`;
    try {
        const item = localStorage.getItem(key);
        if (!item) return [];
        const data = JSON.parse(item) as StoredGameProgress;
        if (data.dayIndex === dayIndex && Array.isArray(data.guesses)) {
            return data.guesses;
        }
        return [];
    } catch {
        return [];
    }
};

export const saveGameProgress = (mode: GameMode, dayIndex: number, guesses: string[]): void => {
    const key = `verbomancer_${mode}_${dayIndex}`;
    try {
        const data: StoredGameProgress = { dayIndex, guesses };
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        return;
    }
};