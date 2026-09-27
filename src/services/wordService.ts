import { GAME_CONFIG } from '../config/game.config';
import type { GameMode } from '../types/game';

export const normalizeWord = (word: string): string => {
    return word
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[Çç]/g, 'C')
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
            const cached = this.loadFromStorage();
            if (cached && cached.length > 0) {
                this.processWords(cached);
                this.isLoaded = true;
                return;
            }

            try {
                let text = '';
                try {
                    const res = await fetch(GAME_CONFIG.lexiconCdnUrl);
                    if (res.ok) text = await res.text();
                } catch (err) {
                    console.error(err);
                    const resFallback = await fetch(GAME_CONFIG.lexiconFallbackUrl);
                    if (resFallback.ok) text = await resFallback.text();
                }

                if (text) {
                    const lines = text.split('\n');
                    this.processWords(lines);
                    this.saveToStorage(lines);
                    this.isLoaded = true;
                    return;
                }
            } catch (err) {
                console.error(err);
            }

            const emergencyWords = [
                'CARRO', 'TERMO', 'LIVRO', 'MAGIA', 'SAGAZ', 'NOBRE', 'PODER', 'TEMPO',
                'MUNDO', 'VIVER', 'PORTA', 'CORPO', 'FESTA', 'SOLAR', 'LUNAR', 'VENTO',
                'AREIA', 'FAROL', 'GRUPO', 'TURMA', 'VIOLA', 'PULGA', 'CHAVE', 'BRAVO',
                'CORVO', 'TREVO', 'PRATA', 'CANTO', 'PEDRA', 'FLORA', 'FAUNA', 'TERRA',
                'ASTRO', 'BRUXO', 'MAGOS', 'PACTO', 'ALMAS', 'RUNAS', 'CETRO', 'VAPOR',
                'CALOR', 'FROTA', 'NAVIO', 'FARDO', 'TREZE', 'NORTE', 'LISTA', 'GOLPE'
            ];
            this.processWords(emergencyWords);
            this.isLoaded = true;
        })();

        return this.loadPromise;
    }

    private processWords(words: string[]): void {
        words.forEach((raw) => {
            const trimmed = raw.trim();
            if (trimmed.length === GAME_CONFIG.wordLength && !trimmed.includes(' ') && !trimmed.includes('-')) {
                const norm = normalizeWord(trimmed);
                this.dictionarySet.add(norm);
                if (!this.originalMap.has(norm)) {
                    this.originalMap.set(norm, trimmed.toUpperCase());
                }
                if (/^[a-zA-ZáàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]+$/.test(trimmed)) {
                    this.targets.push(trimmed.toUpperCase());
                }
            }
        });

        if (this.targets.length === 0) {
            this.targets = Array.from(this.originalMap.values());
        }
    }

    private loadFromStorage(): string[] | null {
        try {
            const raw = localStorage.getItem('verbomancer_lexicon_cache');
            if (raw) {
                return JSON.parse(raw);
            }
        } catch (err) {
            console.error(err);
            return null;
        }
        return null;
    }

    private saveToStorage(words: string[]): void {
        try {
            const fiveLetterOnly = words
                .map((w) => w.trim())
                .filter((w) => w.length === GAME_CONFIG.wordLength);
            localStorage.setItem('verbomancer_lexicon_cache', JSON.stringify(fiveLetterOnly));
        } catch (err) {
            console.error(err);
        }
    }

    public isValid(word: string): boolean {
        return this.dictionarySet.has(normalizeWord(word));
    }

    public getOriginalSpelling(normalized: string): string {
        return this.originalMap.get(normalized) || normalized;
    }

    public getDailyWords(mode: GameMode, dayNumber: number): string[] {
        if (this.targets.length === 0) {
            return ['CARRO'];
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
                const prevSeed = (dayNumber - 1) * 73 + i * 29;
                const prevIndex = Math.floor(pseudoRandom(prevSeed) * totalTargets);
                previousDayIndices.add(prevIndex);
            }
        }

        const selected: string[] = [];
        let salt = 0;

        while (selected.length < wordsNeeded) {
            const seed = dayNumber * 73 + selected.length * 29 + salt;
            const index = Math.floor(pseudoRandom(seed) * totalTargets);

            if (!previousDayIndices.has(index) || salt > 200) {
                const candidate = this.targets[index];
                if (!selected.includes(candidate)) {
                    selected.push(candidate);
                }
            }
            salt++;
        }

        return selected;
    }
}

export const wordService = new WordService();