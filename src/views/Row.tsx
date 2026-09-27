import { Tile } from './Tile';
import type { EvaluatedLetter } from '../types/game';
import type { GameMode } from '../types/game';

interface RowProps {
    evaluation?: EvaluatedLetter[];
    currentLetters?: string;
    mode: GameMode;
}

export const Row = ({ evaluation, currentLetters, mode }: RowProps) => {
    const letters = Array.from({ length: 5 }, (_, i) => {
        if (evaluation) {
            return evaluation[i] || { letter: '', status: 'empty' };
        }

        if (currentLetters) {
            const letter = currentLetters[i] || '';
            return {
                letter,
                status: letter ? ('tbd' as const) : ('empty' as const),
            };
        }

        return { letter: '', status: 'empty' as const };
    });

    return (
        <div className="flex gap-1 justify-center">
            {letters.map((tileData, index) => (
                <Tile
                    key={index}
                    letter={tileData.letter}
                    status={tileData.status}
                    mode={mode}
                />
            ))}
        </div>
    );
};