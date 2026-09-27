export interface ModeConfiguration {
    id: 'sigilo' | 'dualidade' | 'cataclisma';
    name: string;
    boardsCount: number;
    maxRows: number;
}

export const GAME_CONFIG = {
    startDate: '2026-09-27T00:00:00',
    wordLength: 5,
    wordDataSourceUrl: '/data/words.json',
    messages: {
        insufficientLetters: 'só palavras com 5 letras',
        wordNotFound: 'essa palavra não é aceita',
        victory: 'vitória extraordinária!',
        defeat: 'o grimório foi selado.',
    },
    modes: {
        sigilo: {
            id: 'sigilo',
            name: 'SIGILO',
            boardsCount: 1,
            maxRows: 6,
        },
        dualidade: {
            id: 'dualidade',
            name: 'DUALIDADE',
            boardsCount: 2,
            maxRows: 7,
        },
        cataclisma: {
            id: 'cataclisma',
            name: 'CATACLISMA',
            boardsCount: 4,
            maxRows: 9,
        },
    } as Record<string, ModeConfiguration>,
};