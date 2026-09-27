import type { KeyBoardStatusMulti, LetterStatus } from '../types/game';
import { Delete } from 'lucide-react';

interface KeyboardProps {
    statusesMulti: KeyBoardStatusMulti;
    boardsCount: number;
    onKeyPress: (key: string) => void;
}

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export const Keyboard = ({ statusesMulti, boardsCount, onKeyPress }: KeyboardProps) => {
    const getSliceColorClass = (status?: LetterStatus) => {
        switch (status) {
            case 'right':
                return 'bg-arcane-right';
            case 'place':
                return 'bg-arcane-place';
            case 'wrong':
                return 'bg-arcane-wrong';
            default:
                return 'bg-arcane-surface';
        }
    };

    const handleButtonClick = (key: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();
        onKeyPress(key);
    };

    return (
        <div className="w-full max-w-[580px] flex flex-col gap-1.5 px-1 py-2 select-none shrink-0">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 w-full">
                    {row.map((key) => {
                        const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
                        const boardStatuses = statusesMulti[key] || Array(boardsCount).fill('empty');

                        return (
                            <button
                                key={key}
                                type="button"
                                tabIndex={-1}
                                onClick={(e) => handleButtonClick(key, e)}
                                className={`relative overflow-hidden flex items-center justify-center font-bold text-sm sm:text-base border border-arcane-border rounded h-12 sm:h-14 transition-transform active:scale-95 cursor-pointer shadow-md ${isSpecial ? 'flex-[1.5] text-xs sm:text-sm px-1' : 'flex-1'
                                    }`}
                            >
                                <div className="absolute inset-0 flex pointer-events-none">
                                    {boardStatuses.map((st, i) => (
                                        <div
                                            key={i}
                                            className={`h-full flex-1 transition-colors ${getSliceColorClass(st)}`}
                                        />
                                    ))}
                                </div>
                                <span className="relative z-10 text-arcane-text drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                    {key === 'BACKSPACE' ? <Delete className="w-5 h-5 sm:w-6 sm:h-6" /> : key}
                                </span>
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};