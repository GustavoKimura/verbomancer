import { useState } from 'react';
import type { GameMode } from './types/game';
import { Sparkles, HelpCircle, BarChart2 } from 'lucide-react';
import { useGame } from './viewmodels/useGame';
import { Board } from './views/Board';
import { Keyboard } from './views/Keyboard';
import { Notification } from './views/Notification';

export const App = () => {
  const [currentMode, setCurrentMode] = useState<GameMode>('termo');
  const game = useGame(currentMode);

  const getBoardsGridClasses = () => {
    switch (currentMode) {
      case 'quarteto':
        return 'grid grid-cols-2 gap-2 max-w-[680px]';
      case 'dueto':
        return 'grid grid-cols-2 gap-2 max-w-[620px]';
      default:
        return 'flex justify-center max-w-[320px]';
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-[720px] mx-auto desktop:max-w-[1440px] px-2 py-1 justify-between items-center box-border overflow-hidden">
      <Notification message={game.notification} />

      <header className="w-full flex items-center justify-between border-b border-arcane-border py-2 px-4 max-w-[720px] shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-arcane-accent animate-pulse" />
          <h1 className="text-2xl font-bold tracking-wider text-arcane-text uppercase">
            Verbomancer
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Estatísticas"
            className="p-1 rounded text-arcane-muted hover:text-arcane-text hover:bg-arcane-surface transition-colors"
          >
            <BarChart2 className="w-6 h-6" />
          </button>
          <button
            type="button"
            aria-label="Ajuda"
            className="p-1 rounded text-arcane-muted hover:text-arcane-text hover:bg-arcane-surface transition-colors"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </header>

      <nav className="w-full max-w-[720px] flex justify-center gap-2 my-1 shrink-0">
        {(['termo', 'dueto', 'quarteto'] as GameMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setCurrentMode(mode)}
            className={`px-4 py-1.5 rounded text-sm uppercase tracking-wide border transition-all ${currentMode === mode
              ? 'bg-arcane-accent border-arcane-accent text-white shadow-lg shadow-arcane-accent/30'
              : 'bg-arcane-surface border-arcane-border text-arcane-muted hover:text-arcane-text'
              }`}
          >
            {mode}
          </button>
        ))}
      </nav>

      <main className="flex-1 w-full flex items-center justify-center overflow-y-auto overflow-x-hidden p-1">
        <div className={`w-full ${getBoardsGridClasses()}`}>
          {game.boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              currentGuess={game.currentGuess}
              totalGuesses={game.guesses.length}
              mode={currentMode}
            />
          ))}
        </div>
      </main>

      <footer className="w-full flex flex-col items-center shrink-0">
        <Keyboard
          statuses={game.keyboardStatuses}
          onKeyPress={game.handleKeyPress}
        />
        <div className="w-full max-w-[720px] py-1 text-center text-[10px] text-arcane-muted border-t border-arcane-border/50">
          Verbomancer — Dia #{game.dayIndex}
        </div>
      </footer>
    </div>
  );
};

export default App;