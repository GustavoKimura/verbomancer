import { Row } from './Row';
import type { BoardState, GameMode } from '../types/game';
import { evaluateGuess } from '../services/evaluator';

interface BoardProps {
    board: BoardState;
    currentLetters: string[];
    cursorIndex: number | null;
    totalGuesses: number;
    mode: GameMode;
    isShaking: boolean;
    animatingRowIndex: number | null;
    onTileClick: (index: number) => void;
}

export const Board = ({
    board,
    currentLetters,
    cursorIndex,
    totalGuesses,
    mode,
    isShaking,
    animatingRowIndex,
    onTileClick,
}: BoardProps) => {
    const isLocked = board.isSolved;
    const rows = [];

    for (let r = 0; r < board.maxRows; r++) {
        if (r < board.guesses.length) {
            const evaluation = evaluateGuess(
                board.guesses[r],
                board.targetNormalized,
                board.targetWord
            );
            const isCurrentlyRevealing = animatingRowIndex === r;
            rows.push(
                <Row
                    key={r}
                    evaluation={evaluation}
                    mode={mode}
                    isRevealing={isCurrentlyRevealing}
                />
            );
        } else if (r === board.guesses.length && !isLocked && totalGuesses === board.guesses.length) {
            rows.push(
                <Row
                    key={r}
                    currentLetters={currentLetters}
                    cursorIndex={cursorIndex}
                    mode={mode}
                    isShaking={isShaking}
                    onTileClick={onTileClick}
                />
            );
        } else {
            rows.push(<Row key={r} mode={mode} />);
        }
    }

    return (
        <div
            className={`flex flex-col gap-1 p-2 sm:p-2.5 rounded-lg border transition-all ${isLocked
                ? 'border-arcane-right/60 bg-arcane-card/40 shadow-[0_0_15px_rgba(0,230,118,0.15)]'
                : 'border-arcane-border bg-arcane-surface/60'
                }`}
        >
            {rows}
        </div>
    );
};