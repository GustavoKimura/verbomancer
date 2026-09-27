import { Row } from './Row';
import type { BoardState, GameMode } from '../types/game';
import { evaluateGuess } from '../services/evaluator';

interface BoardProps {
    board: BoardState;
    currentGuess: string;
    totalGuesses: number;
    mode: GameMode;
    isShaking: boolean;
}

export const Board = ({ board, currentGuess, totalGuesses, mode, isShaking }: BoardProps) => {
    const isLocked = board.isSolved;
    const rows = [];

    for (let r = 0; r < board.maxRows; r++) {
        if (r < board.guesses.length) {
            const evaluation = evaluateGuess(
                board.guesses[r],
                board.targetNormalized,
                board.targetWord
            );
            rows.push(<Row key={r} evaluation={evaluation} mode={mode} />);
        } else if (r === board.guesses.length && !isLocked && totalGuesses === board.guesses.length) {
            rows.push(
                <Row
                    key={r}
                    currentLetters={currentGuess}
                    mode={mode}
                    isShaking={isShaking}
                />
            );
        } else {
            rows.push(<Row key={r} mode={mode} />);
        }
    }

    return (
        <div
            className={`flex flex-col gap-1 p-1.5 sm:p-2 rounded-lg border transition-all ${isLocked
                ? 'border-arcane-right/60 bg-arcane-card/40 shadow-[0_0_15px_rgba(0,230,118,0.15)]'
                : 'border-arcane-border bg-arcane-surface/60'
                }`}
        >
            {rows}
        </div>
    );
};