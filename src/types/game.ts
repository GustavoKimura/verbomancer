export type GameMode = 'espectro' | 'sombras' | 'catacumba';

export type LetterStatus = 'empty' | 'tbd' | 'wrong' | 'place' | 'right';

export interface EvaluatedLetter {
    letter: string;
    status: LetterStatus;
}

export interface BoardState {
    id: string;
    targetWord: string;
    targetNormalized: string;
    guesses: string[];
    maxRows: number;
    wordLength: number;
    isSolved: boolean;
    isFailed: boolean;
}

export interface KeyBoardStatusMulti {
    [key: string]: LetterStatus[];
}

export interface GameStats {
    played: number;
    wins: number;
    currentStreak: number;
    maxStreak: number;
    distribution: Record<number, number>;
    lastRecordedDay?: number;
}