import type { LetterStatus } from '../types/game';

interface TileProps {
    letter: string;
    status: LetterStatus;
    mode: 'termo' | 'dueto' | 'quarteto';
}

export const Tile = ({ letter, status, mode }: TileProps) => {
    const getStatusClasses = () => {
        switch (status) {
            case 'right':
                return 'bg-arcane-right border-arcane-right text-white shadow-md shadow-arcane-right/20';
            case 'place':
                return 'bg-arcane-place border-arcane-place text-white shadow-md shadow-arcane-place/20';
            case 'wrong':
                return 'bg-arcane-wrong border-arcane-wrong text-arcane-wrong-fg';
            case 'tbd':
                return 'bg-arcane-card border-arcane-accent text-arcane-text scale-105';
            default:
                return 'bg-arcane-surface border-arcane-border text-arcane-text';
        }
    };

    const getDimensionClasses = () => {
        switch (mode) {
            case 'quarteto':
                return 'w-6 h-6 text-xs sm:w-8 sm:h-8 sm:text-base border';
            case 'dueto':
                return 'w-8 h-8 text-sm sm:w-11 sm:h-11 sm:text-xl border-2';
            default:
                return 'w-11 h-11 text-xl sm:w-14 sm:h-14 sm:text-2xl border-2';
        }
    };

    return (
        <div
            className={`flex items-center justify-center font-bold uppercase rounded transition-transform select-none ${getDimensionClasses()} ${getStatusClasses()}`}
        >
            {letter}
        </div>
    );
};