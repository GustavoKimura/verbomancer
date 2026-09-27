import type { GameMode, LetterStatus } from '../types/game';

interface TileProps {
    letter: string;
    status: LetterStatus;
    mode: GameMode;
    isRevealing?: boolean;
    revealIndex?: number;
    hasCursor?: boolean;
    onClick?: () => void;
}

export const Tile = ({
    letter,
    status,
    mode,
    isRevealing = false,
    revealIndex = 0,
    hasCursor = false,
    onClick,
}: TileProps) => {
    const getStatusClasses = () => {
        switch (status) {
            case 'right':
                return 'bg-arcane-right border-arcane-right text-arcane-text shadow-[0_0_12px_rgba(4,136,83,0.6)]';
            case 'place':
                return 'bg-arcane-place border-arcane-place text-arcane-abyss font-bold shadow-[0_0_12px_rgba(234,179,8,0.6)]';
            case 'wrong':
                return 'bg-arcane-wrong border-arcane-wrong text-arcane-wrong-fg opacity-70';
            case 'tbd':
                return 'bg-arcane-card border-arcane-border text-arcane-text animate-tile-pop';
            default:
                return 'bg-arcane-surface border-arcane-border text-arcane-text';
        }
    };

    const getDimensionClasses = () => {
        switch (mode) {
            case 'catacumba':
                return 'w-6 h-6 text-sm sm:w-7 sm:h-7 sm:text-base md:w-9 md:h-9 md:text-lg border';
            case 'sombras':
                return 'w-9 h-9 text-xl sm:w-11 sm:h-11 sm:text-2xl md:w-13 md:h-13 md:text-3xl border-2';
            default:
                return 'w-12 h-12 text-2xl sm:w-14 sm:h-14 sm:text-3xl md:w-16 md:h-16 md:text-4xl border-2';
        }
    };

    const cursorClass = hasCursor
        ? 'ring-2 ring-arcane-accent border-arcane-accent shadow-[0_0_14px_rgba(199,125,255,0.9)]'
        : '';

    const animationStyle = isRevealing
        ? {
            animation: `tile-flip 0.45s ease forwards`,
            animationDelay: `${revealIndex * 0.08}s`,
        }
        : undefined;

    return (
        <div
            onClick={onClick}
            style={animationStyle}
            className={`relative flex items-center justify-center font-bold uppercase rounded select-none cursor-pointer leading-none transition-colors ${getDimensionClasses()} ${getStatusClasses()} ${cursorClass}`}
        >
            <span className="translate-y-px">{letter}</span>
            {hasCursor && (
                <span className="absolute bottom-0.5 inset-x-1 h-0.5 sm:h-1 bg-arcane-accent rounded-full animate-pulse shadow-[0_0_8px_#c77dff] pointer-events-none" />
            )}
        </div>
    );
};