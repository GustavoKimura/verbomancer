import { GAME_CONFIG } from '../config/game.config';

export const getDailyNumber = (): number => {
    const start = new Date(GAME_CONFIG.startDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const diffTime = today.getTime() - startDay.getTime();
    const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, dayIndex + 1);
};