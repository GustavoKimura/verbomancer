import type { GameMode, GameStats } from '../types/game';
import { GAME_CONFIG } from '../config/game.config';

const getInitialStats = (maxRows: number): GameStats => {
    const distribution: Record<number, number> = {};
    for (let i = 1; i <= maxRows; i++) {
        distribution[i] = 0;
    }
    return {
        played: 0,
        wins: 0,
        currentStreak: 0,
        maxStreak: 0,
        distribution,
    };
};

class StatsService {
    public getStats(mode: GameMode): GameStats {
        const maxRows = GAME_CONFIG.modes[mode].maxRows;
        const key = `verbomancer_stats_${mode}`;
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return getInitialStats(maxRows);
            const parsed = JSON.parse(raw) as GameStats;
            for (let i = 1; i <= maxRows; i++) {
                if (parsed.distribution[i] === undefined) {
                    parsed.distribution[i] = 0;
                }
            }
            return parsed;
        } catch {
            return getInitialStats(maxRows);
        }
    }

    public recordGameEnd(
        mode: GameMode,
        dayNumber: number,
        isWon: boolean,
        guessCount: number
    ): GameStats {
        const stats = this.getStats(mode);
        const key = `verbomancer_stats_${mode}`;

        if (stats.lastRecordedDay === dayNumber) {
            return stats;
        }

        stats.played += 1;
        stats.lastRecordedDay = dayNumber;

        if (isWon) {
            stats.wins += 1;
            stats.currentStreak += 1;
            if (stats.currentStreak > stats.maxStreak) {
                stats.maxStreak = stats.currentStreak;
            }
            stats.distribution[guessCount] = (stats.distribution[guessCount] || 0) + 1;
        } else {
            stats.currentStreak = 0;
        }

        try {
            localStorage.setItem(key, JSON.stringify(stats));
        } catch {
            // Ignora falha de armazenamento
        }

        return stats;
    }
}

export const statsService = new StatsService();