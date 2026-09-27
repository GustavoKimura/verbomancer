export interface ModeConfiguration {
    id: 'espectro' | 'sombras' | 'catacumba';
    name: string;
    boardsCount: number;
    maxRows: number;
}

export const GAME_CONFIG = {
    version: '1.0.0',
    startDate: '2026-09-27T00:00:00',
    wordLength: 5,
    lexiconCdnUrl: 'https://cdn.jsdelivr.net/gh/fserb/pt-br@master/lexico',
    lexiconFallbackUrl: 'https://raw.githubusercontent.com/fserb/pt-br/master/lexico',
    githubUrl: 'https://github.com/GustavoKimura/verbomancer',
    authorGithubUrl: 'https://github.com/GustavoKimura',
    company: 'Kimura Dev, uma microagência de Gustavo Kimura',
    pixKey: '28c1ee5c-e637-4349-b90e-378852716505',
    messages: {
        insufficientLetters: 'o encanto exige 5 runas',
        wordNotFound: 'o abismo rejeita este vocábulo',
        victory: 'as almas foram subjugadas.',
        defeat: 'seu poder esvaiu-se nas sombras.',
    },
    modes: {
        espectro: {
            id: 'espectro',
            name: 'ESPECTRO',
            boardsCount: 1,
            maxRows: 6,
        },
        sombras: {
            id: 'sombras',
            name: 'SOMBRAS',
            boardsCount: 2,
            maxRows: 7,
        },
        catacumba: {
            id: 'catacumba',
            name: 'CATACUMBA',
            boardsCount: 4,
            maxRows: 9,
        },
    } as Record<string, ModeConfiguration>,
};