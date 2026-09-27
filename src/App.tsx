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

  if (!game.isReady) {
    return (
      <div className="flex flex-col h-[100dvh] w-full items-center justify-center bg-arcane-abyss text-arcane-text select-none px-4">
        <div className="flex flex-col items-center gap-4">
          <Skull className="w-16 h-16 sm:w-20 sm:h-20 text-arcane-accent animate-pulse" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-widest uppercase text-arcane-text">
            VERBOMANCER
          </h1>
          <div className="flex items-center gap-3 text-sm sm:text-base text-arcane-muted tracking-widest uppercase">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-arcane-accent animate-ping" />
            <span>DESPERTANDO O RITUAL...</span>
          </div>
        </div>
      </div>
    );
  }

  const getBoardsContainerClasses = () => {
    switch (currentMode) {
      case 'catacumba':
        return 'grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-[880px] justify-center items-center';
      case 'sombras':
        return 'grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-[580px] justify-center items-center';
      default:
        return 'flex justify-center w-full max-w-[320px] items-center';
    }
  };

  const activeModeName = GAME_CONFIG.modes[currentMode].name;

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-[960px] mx-auto px-2 pt-4 sm:pt-6 pb-2 justify-between items-center box-border overflow-hidden">
      <header className="w-full grid grid-cols-[auto_1fr_auto] items-center border-b border-arcane-border pb-3 px-3 sm:px-4 max-w-[840px] shrink-0">
        <div className="flex items-center">
          <Skull className="w-8 h-8 sm:w-9 sm:h-9 text-arcane-accent" />
        </div>
        <h1 className="text-center text-base sm:text-lg md:text-xl font-bold tracking-widest text-arcane-text uppercase truncate px-2 drop-shadow-[0_0_8px_rgba(199,125,255,0.4)]">
          VERBOMANCER — {activeModeName}
        </h1>
        <div className="flex items-center gap-2 sm:gap-3 justify-end">
          <button
            type="button"
            aria-label="Estatísticas"
            onClick={(e) => e.currentTarget.blur()}
            className="p-1 sm:p-1.5 rounded text-arcane-muted hover:text-arcane-text hover:bg-arcane-surface transition-colors cursor-pointer"
          >
            <BarChart2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <button
            type="button"
            aria-label="Ajuda"
            onClick={(e) => e.currentTarget.blur()}
            className="p-1 sm:p-1.5 rounded text-arcane-muted hover:text-arcane-text hover:bg-arcane-surface transition-colors cursor-pointer"
          >
            <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      </header>

      <nav className="w-full max-w-[840px] px-2 flex justify-center gap-2 sm:gap-4 mt-2 mb-2 shrink-0">
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
              className={`flex-1 sm:flex-initial text-center px-3 sm:px-6 py-2 sm:py-2.5 rounded font-bold text-xs sm:text-sm md:text-base tracking-wider sm:tracking-widest border transition-all cursor-pointer ${currentMode === modeKey
                ? 'bg-arcane-accent border-arcane-accent text-white shadow-[0_0_15px_rgba(199,125,255,0.5)] scale-105'
                : 'bg-arcane-surface border-arcane-border text-white hover:border-arcane-accent/60'
                }`}
            >
              {modeItem.name}
            </button>
          );
        })}
      </nav>

      <main className="relative flex-1 min-h-0 w-full flex items-center justify-center overflow-y-auto px-2 py-2 sm:py-3">
        <Notification message={game.notification} />
        <div key={currentMode} className={getBoardsContainerClasses()}>
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
        <div className="w-full max-w-[840px] py-2 text-center text-xs sm:text-sm md:text-base font-bold tracking-widest text-arcane-muted border-t border-arcane-border/50 uppercase">
          VERBOMANCER — Ritual do Dia #{game.dayNumber}
        </div>
      </footer>
    </div>
  );
};

export default App;