import type { EvaluatedLetter, LetterStatus } from '../types/game';
import { getOriginalSpelling, normalizeWord } from './wordList';

export const evaluateGuess = (
    guessNormalized: string,
    targetNormalized: string,
    targetOriginal: string
): EvaluatedLetter[] => {
    const result: EvaluatedLetter[] = Array.from({ length: 5 }, (_, i) => ({
        letter: guessNormalized[i] || '',
        status: 'wrong' as LetterStatus,
    }));

    const targetChars = targetNormalized.split('');
    const guessChars = guessNormalized.split('');
    const availableTargetChars: Record<string, number> = {};

    for (let i = 0; i < 5; i++) {
        if (guessChars[i] === targetChars[i]) {
            result[i].status = 'right';
            targetChars[i] = '#';
        }
    }

    for (let i = 0; i < 5; i++) {
        const char = targetChars[i];
        if (char !== '#') {
            availableTargetChars[char] = (availableTargetChars[char] || 0) + 1;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i].status === 'right') {
            continue;
        }

        const char = guessChars[i];
        if (availableTargetChars[char] && availableTargetChars[char] > 0) {
            result[i].status = 'place';
            availableTargetChars[char]--;
        } else {
            result[i].status = 'wrong';
        }
    }

    if (guessNormalized === targetNormalized) {
        for (let i = 0; i < 5; i++) {
            result[i].letter = targetOriginal[i];
        }
    } else {
        const originalGuess = getOriginalSpelling(guessNormalized);
        for (let i = 0; i < 5; i++) {
            result[i].letter = originalGuess[i] || guessNormalized[i];
        }
    }

    return result;
};