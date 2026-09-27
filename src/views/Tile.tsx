import type { LetterStatus } from '../types/game';

interface TileProps {
    letter: string;
    status: LetterStatus;
    mode: 'sigilo' | 'dualidade' | 'cataclisma';
    isRevealing?: boolean;
    revealIndex?: number;
}

export const Tile = ({
    letter,
    status,
    mode,
    isRevealing = false,
    revealIndex = 0,
}: TileProps) => {
    const getStatusClasses = () => {
        switch (status) {
            case 'right':
                return 'bg-arcane-right border-arcane-right text-arcane-text shadow-[0_0_12px_rgba(0,230,118,0.45)]';
            case 'place':
                return 'bg-arcane-place border-arcane-place text-arcane-text shadow-[0_0_12px_rgba(255,183,3,0.45)]';
            case 'wrong':
                return 'bg-arcane-wrong border-arcane-wrong text-arcane-wrong-fg opacity-75';
            case 'tbd':
                return 'bg-arcane-card border-arcane-accent text-arcane-text scale-105 animate-tile-pop';
            default:
                return 'bg-arcane-surface border-arcane-border text-arcane-text';
        }
    };

    const getDimensionClasses = () => {
        switch (mode) {
            case 'cataclisma':
                return 'w-6 h-6 text-xs sm:w-8 sm:h-8 sm:text-sm md:w-9 md:h-9 md:text-base border';
            case 'dualidade':
                return 'w-9 h-9 text-base sm:w-12 sm:h-12 sm:text-xl border-2';
            default:
                return 'w-12 h-12 text-xl sm:w-15 sm:h-15 sm:text-2xl border-2';
        }
    };

    const animationStyle = isRevealing
        ? {
            animation: `tile-flip 0.5s ease forwards`,
            animationDelay: `${revealIndex * 0.1}s`,
        }
        : undefined;

    return (
        <div
            style={animationStyle}
            className={`flex items-center justify-center font-bold uppercase rounded select-none transition-colors ${getDimensionClasses()} ${getStatusClasses()}`}
        >
            {letter}
        </div>
    );
};