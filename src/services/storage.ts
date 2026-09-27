import type { GameMode } from '../types/game';

interface StoredGameProgress {
    dayNumber: number;
    guesses: string[];
}

export const loadGameProgress = (mode: GameMode, dayNumber: number): string[] => {
    const key = `verbomancer_${mode}_${dayNumber}`;
    try {
        const item = localStorage.getItem(key);
        if (!item) return [];
        const data = JSON.parse(item) as StoredGameProgress;
        if (data.dayNumber === dayNumber && Array.isArray(data.guesses)) {
            return data.guesses;
        }
        return [];
    } catch {
        return [];
    }
};

export const saveGameProgress = (mode: GameMode, dayNumber: number, guesses: string[]): void => {
    const key = `verbomancer_${mode}_${dayNumber}`;
    try {
        const data: StoredGameProgress = { dayNumber, guesses };
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        return;
    }
};