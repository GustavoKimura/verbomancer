import { GAME_CONFIG } from '../config/game.config';
import type { GameMode } from '../types/game';

interface LexiconPayload {
    targets: string[];
    dictionary: string[];
}

export const normalizeWord = (word: string): string => {
    return word
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
};

class WordService {
    private targets: string[] = [];
    private dictionarySet: Set<string> = new Set();
    private originalMap: Map<string, string> = new Map();
    private isLoaded = false;
    private loadPromise: Promise<void> | null = null;

    public async initialize(): Promise<void> {
        if (this.isLoaded) return;
        if (this.loadPromise) return this.loadPromise;

        this.loadPromise = (async () => {
            try {
                const response = await fetch(GAME_CONFIG.wordDataSourceUrl);
                const data: LexiconPayload = await response.json();

                this.targets = data.targets;
                const allWords = [...data.targets, ...data.dictionary];

                allWords.forEach((word) => {
                    const norm = normalizeWord(word);
                    this.dictionarySet.add(norm);
                    if (!this.originalMap.has(norm)) {
                        this.originalMap.set(norm, word.toUpperCase());
                    }
                });

                this.isLoaded = true;
            } catch {
                this.targets = ['TERMO', 'LIVRO', 'MAGIA', 'SAGAZ', 'NOBRE'];
                this.targets.forEach((word) => {
                    const norm = normalizeWord(word);
                    this.dictionarySet.add(norm);
                    this.originalMap.set(norm, word);
                });
                this.isLoaded = true;
            }
        })();

        return this.loadPromise;
    }

    public isValid(word: string): boolean {
        return this.dictionarySet.has(normalizeWord(word));
    }

    public getOriginalSpelling(normalized: string): string {
        return this.originalMap.get(normalized) || normalized;
    }

    public getDailyWords(mode: GameMode, dayNumber: number): string[] {
        if (this.targets.length === 0) {
            return ['TERMO'];
        }

        const config = GAME_CONFIG.modes[mode];
        const wordsNeeded = config.boardsCount;
        const totalTargets = this.targets.length;

        const pseudoRandom = (seed: number) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        const previousDayIndices = new Set<number>();
        if (dayNumber > 1) {
            for (let i = 0; i < wordsNeeded; i++) {
                const prevSeed = (dayNumber - 1) * 31 + i * 17;
                const prevIndex = Math.floor(pseudoRandom(prevSeed) * totalTargets);
                previousDayIndices.add(prevIndex);
            }
        }

        const selected: string[] = [];
        let salt = 0;

        while (selected.length < wordsNeeded) {
            const seed = dayNumber * 31 + selected.length * 17 + salt;
            const index = Math.floor(pseudoRandom(seed) * totalTargets);

            if (!previousDayIndices.has(index) || salt > 100) {
                const word = this.targets[index];
                if (!selected.includes(word)) {
                    selected.push(word);
                }
            }
            salt++;
        }

        return selected;
    }
}

export const wordService = new WordService();