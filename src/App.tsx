import { useState } from 'react';
import type { GameMode } from './types/game';
import { GAME_CONFIG } from './config/game.config';
import { Skull, HelpCircle, BarChart2 } from 'lucide-react';
import { useGameViewModel } from './viewmodels/useGameViewModel';
import { Board } from './views/Board';
import { Keyboard } from './views/Keyboard';
import { Notification } from './views/Notification';

export const App = () => {
  const [currentMode, setCurrentMode] = useState<GameMode>('espectro');
  const game = useGameViewModel(currentMode);

  const getBoardsContainerClasses = () => {
    switch (currentMode) {
      case 'catacumba':
        return 'grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full max-w-[960px] justify-center items-center';
      case 'sombras':
        return 'grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-[640px] justify-center items-center';
      default:
        return 'flex justify-center w-full max-w-[360px] items-center';
    }
  };

  const activeModeName = GAME_CONFIG.modes[currentMode].name;

  return (
    <div className="flex flex-col h-full w-full max-w-[1024px] mx-auto px-2 py-2 justify-between items-center box-border overflow-hidden">
      <Notification message={game.notification} />

      <header className="w-full flex items-center justify-between border-b border-arcane-border pb-3 px-4 max-w-[840px] shrink-0">
        <div className="flex items-center gap-3">
          <Skull className="w-7 h-7 text-arcane-accent" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-widest text-arcane-text uppercase drop-shadow-[0_0_8px_rgba(199,125,255,0.4)]">
            VERBOMANCER — {activeModeName}
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

      <nav className="w-full max-w-[840px] flex justify-center gap-4 sm:gap-6 my-3 shrink-0">
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
              className={`px-6 py-2.5 rounded font-bold text-sm uppercase tracking-widest border transition-all cursor-pointer ${currentMode === modeKey
                ? 'bg-arcane-accent border-arcane-accent text-white shadow-[0_0_15px_rgba(199,125,255,0.5)] scale-105'
                : 'bg-arcane-surface border-arcane-border text-white hover:border-arcane-accent/60'
                }`}
            >
              {modeItem.name}
            </button>
          );
        })}
      </nav>

      <main className="flex-1 w-full flex items-center justify-center overflow-y-auto sm:overflow-hidden p-2">
        <div className={getBoardsContainerClasses()}>
          {game.boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              currentLetters={game.currentLetters}
              cursorIndex={game.cursorIndex}
              totalGuesses={game.guesses.length}
              mode={currentMode}
              isShaking={game.isShaking}
              animatingRowIndex={game.animatingRowIndex}
              onTileClick={game.handleTileClick}
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
        <div className="w-full max-w-[840px] py-2 text-center text-xs sm:text-sm font-bold tracking-widest text-arcane-muted border-t border-arcane-border/50 uppercase">
          Verbomancer — Ritual do Dia #{game.dayNumber}
        </div>
      </footer>
    </div>
  );
};

export default App;