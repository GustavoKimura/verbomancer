export type GameMode = 'termo' | 'dueto' | 'quarteto';

export type LetterStatus = 'empty' | 'tbd' | 'wrong' | 'place' | 'right';

export interface TileData {
    letter: string;
    status: LetterStatus;
}

export interface BoardState {
    id: string;
    targetWord: string;
    guesses: string[];
    maxRows: number;
    wordLength: number;
    isSolved: boolean;
    isFailed: boolean;
}

export interface DailyChallenge {
    dayIndex: number;
    dateKey: string;
    modes: {
        termo: string[];
        dueto: string[];
        quarteto: string[];
    };
}