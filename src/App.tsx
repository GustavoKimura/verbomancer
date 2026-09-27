import { useState } from 'react';
import type { GameMode } from './types/game';
import { GAME_CONFIG } from './config/game.config';
import { Skull, HelpCircle, BarChart2 } from 'lucide-react';
import { useGameViewModel } from './viewmodels/useGameViewModel';
import { Board } from './views/Board';
import { Keyboard } from './views/Keyboard';
import { Notification } from './views/Notification';

export const App = () => {
  const [currentMode, setCurrentMode] = useState<GameMode>('sigilo');
  const game = useGameViewModel(currentMode);

  const getBoardsContainerClasses = () => {
    switch (currentMode) {
      case 'cataclisma':
        return 'grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-[800px] justify-center items-center';
      case 'dualidade':
        return 'grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[560px] justify-center items-center';
      default:
        return 'flex justify-center w-full max-w-[280px] items-center';
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-[860px] mx-auto desktop:max-w-[1440px] px-2 py-2 justify-between items-center box-border overflow-hidden">
      <Notification message={game.notification} />

      <header className="w-full flex items-center justify-between border-b border-arcane-border pb-3 px-4 max-w-[760px] shrink-0">
        <div className="flex items-center gap-3">
          <Skull className="w-7 h-7 text-arcane-accent" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-widest text-arcane-text uppercase drop-shadow-[0_0_8px_rgba(199,125,255,0.4)]">
            Verbomancer
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Estatísticas"
            onClick={(e) => e.currentTarget.blur()}
            className="p-1.5 rounded text-arcane-muted hover:text-arcane-text hover:bg-arcane-surface transition-colors cursor-pointer"
          >
            <BarChart2 className="w-6 h-6" />
          </button>
          <button
            type="button"
            aria-label="Ajuda"
            onClick={(e) => e.currentTarget.blur()}
            className="p-1.5 rounded text-arcane-muted hover:text-arcane-text hover:bg-arcane-surface transition-colors cursor-pointer"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </header>

      <nav className="w-full max-w-[760px] flex justify-center gap-4 sm:gap-6 my-3 shrink-0">
        {(Object.keys(GAME_CONFIG.modes) as GameMode[]).map((modeKey) => {
          const modeItem = GAME_CONFIG.modes[modeKey];
          return (
            <button
              key={modeKey}
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                setCurrentMode(modeKey);
              }}
              className={`px-5 py-2 rounded font-bold text-sm uppercase tracking-widest border transition-all cursor-pointer ${currentMode === modeKey
                ? 'bg-arcane-accent border-arcane-accent text-arcane-abyss shadow-[0_0_15px_rgba(199,125,255,0.5)] scale-105'
                : 'bg-arcane-surface border-arcane-border text-arcane-muted hover:text-arcane-text hover:border-arcane-accent/50'
                }`}
            >
              {modeItem.name}
            </button>
          );
        })}
      </nav>

      <main className="flex-1 w-full flex items-center justify-center overflow-hidden p-1">
        <div className={getBoardsContainerClasses()}>
          {game.boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              currentGuess={game.currentGuess}
              totalGuesses={game.guesses.length}
              mode={currentMode}
              isShaking={game.isShaking}
            />
          ))}
        </div>
      </main>

      <footer className="w-full flex flex-col items-center shrink-0 mt-1">
        <Keyboard
          statusesMulti={game.keyboardMultiStatuses}
          boardsCount={GAME_CONFIG.modes[currentMode].boardsCount}
          onKeyPress={game.handleKeyPress}
        />
        <div className="w-full max-w-[760px] py-2 text-center text-xs sm:text-sm font-bold tracking-widest text-arcane-muted border-t border-arcane-border/50 uppercase">
          Verbomancer — Grimório do Dia #{game.dayNumber}
        </div>
      </footer>
    </div>
  );
};

export default App;