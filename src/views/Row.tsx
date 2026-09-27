import { Tile } from './Tile';
import type { EvaluatedLetter, GameMode } from '../types/game';

interface RowProps {
    evaluation?: EvaluatedLetter[];
    currentLetters?: string[];
    cursorIndex?: number | null;
    mode: GameMode;
    isShaking?: boolean;
    isRevealing?: boolean;
    onTileClick?: (index: number) => void;
}

export const Row = ({
    evaluation,
    currentLetters,
    cursorIndex,
    mode,
    isShaking = false,
    isRevealing = false,
    onTileClick,
}: RowProps) => {
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
        <div className={`flex gap-1.5 sm:gap-2 justify-center ${isShaking ? 'animate-row-shake' : ''}`}>
            {letters.map((tileData, index) => (
                <Tile
                    key={index}
                    letter={tileData.letter}
                    status={tileData.status}
                    mode={mode}
                    isRevealing={isRevealing}
                    revealIndex={index}
                    hasCursor={cursorIndex === index}
                    onClick={onTileClick ? () => onTileClick(index) : undefined}
                />
            ))}
        </div>
    );
};