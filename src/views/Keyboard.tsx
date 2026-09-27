import type { KeyStatusMap, LetterStatus } from '../types/game';
import { Delete } from 'lucide-react';

interface KeyboardProps {
    statuses: KeyStatusMap;
    onKeyPress: (key: string) => void;
}

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'BACKSPACE'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'],
];

export const Keyboard = ({ statuses, onKeyPress }: KeyboardProps) => {
    const getKeyClasses = (status?: LetterStatus) => {
        switch (status) {
            case 'right':
                return 'bg-arcane-right text-white border-arcane-right';
            case 'place':
                return 'bg-arcane-place text-white border-arcane-place';
            case 'wrong':
                return 'bg-arcane-wrong text-arcane-wrong-fg border-transparent opacity-60';
            default:
                return 'bg-arcane-surface text-arcane-text border-arcane-border hover:bg-arcane-card';
        }
    };

    return (
        <div className="w-full max-w-[500px] flex flex-col gap-1.5 px-1 py-2 select-none">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1 w-full">
                    {row.map((key) => {
                        const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
                        const status = statuses[key];

                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => onKeyPress(key)}
                                className={`flex items-center justify-center font-bold text-sm sm:text-base border rounded h-11 sm:h-12 active:scale-95 transition-all ${isSpecial ? 'flex-[1.5] text-xs sm:text-sm px-2' : 'flex-1'
                                    } ${getKeyClasses(status)}`}
                            >
                                {key === 'BACKSPACE' ? <Delete className="w-5 h-5" /> : key}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};