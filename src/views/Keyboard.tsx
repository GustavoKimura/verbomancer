import type { KeyBoardStatusMulti, LetterStatus } from '../types/game';
import { Delete } from 'lucide-react';

interface KeyboardProps {
    statusesMulti: KeyBoardStatusMulti;
    boardsCount: number;
    onKeyPress: (key: string) => void;
}

const KEYBOARD_ROW_1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const KEYBOARD_ROW_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const KEYBOARD_ROW_3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'];

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
        <div className="w-full max-w-[640px] flex flex-col gap-1.5 px-1 py-2 select-none shrink-0">
            <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
                {KEYBOARD_ROW_1.map((key) => {
                    const boardStatuses = statusesMulti[key] || Array(boardsCount).fill('empty');
                    return (
                        <button
                            key={key}
                            type="button"
                            tabIndex={-1}
                            onClick={(e) => handleButtonClick(key, e)}
                            className="relative overflow-hidden flex-1 flex items-center justify-center font-normal text-[10px] sm:text-xs border border-arcane-border rounded h-11 sm:h-13 transition-transform active:scale-95 cursor-pointer shadow-md"
                        >
                            <div className="absolute inset-0 flex pointer-events-none">
                                {boardStatuses.map((st, i) => (
                                    <div
                                        key={i}
                                        className={`h-full flex-1 transition-colors ${getSliceColorClass(st)}`}
                                    />
                                ))}
                            </div>
                            <span className="relative z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                {key}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-center gap-1 sm:gap-1.5 w-full px-3 sm:px-4">
                {KEYBOARD_ROW_2.map((key) => {
                    const boardStatuses = statusesMulti[key] || Array(boardsCount).fill('empty');
                    return (
                        <button
                            key={key}
                            type="button"
                            tabIndex={-1}
                            onClick={(e) => handleButtonClick(key, e)}
                            className="relative overflow-hidden flex-1 flex items-center justify-center font-normal text-[10px] sm:text-xs border border-arcane-border rounded h-11 sm:h-13 transition-transform active:scale-95 cursor-pointer shadow-md"
                        >
                            <div className="absolute inset-0 flex pointer-events-none">
                                {boardStatuses.map((st, i) => (
                                    <div
                                        key={i}
                                        className={`h-full flex-1 transition-colors ${getSliceColorClass(st)}`}
                                    />
                                ))}
                            </div>
                            <span className="relative z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                {key}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-center gap-1 sm:gap-1.5 w-full">
                {KEYBOARD_ROW_3.map((key) => {
                    const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
                    const boardStatuses = statusesMulti[key] || Array(boardsCount).fill('empty');
                    return (
                        <button
                            key={key}
                            type="button"
                            tabIndex={-1}
                            onClick={(e) => handleButtonClick(key, e)}
                            className={`relative overflow-hidden flex items-center justify-center font-normal text-[9px] sm:text-[11px] border border-arcane-border rounded h-11 sm:h-13 transition-transform active:scale-95 cursor-pointer shadow-md ${isSpecial ? 'flex-[1.5] px-1' : 'flex-1'
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
                            <span className="relative z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                {key === 'BACKSPACE' ? <Delete className="w-4 h-4 sm:w-5 sm:h-5" /> : key}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};