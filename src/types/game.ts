export type GameMode = 'sigilo' | 'dualidade' | 'cataclisma';

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