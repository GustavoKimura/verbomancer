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
          <Skull className="w-12 h-12 text-arcane-accent animate-pulse" />
          <h1 className="text-xl sm:text-2xl font-normal tracking-widest uppercase text-arcane-text">
            VERBOMANCER
          </h1>
          <div className="flex items-center gap-3 text-xs sm:text-sm text-arcane-muted tracking-widest uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-arcane-accent animate-ping" />
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
    <div className="flex flex-col h-[100dvh] w-full max-w-[960px] mx-auto px-2 pt-5 sm:pt-7 pb-2 justify-between items-center box-border overflow-hidden">
      <header className="w-full grid grid-cols-[auto_1fr_auto] items-center border-b border-arcane-border pb-3 px-3 sm:px-4 max-w-[840px] shrink-0">
        <div className="flex items-center">
          <Skull className="w-5 h-5 sm:w-6 sm:h-6 text-arcane-accent" />
        </div>
        <h1 className="text-center text-xs sm:text-sm md:text-base font-normal tracking-widest text-arcane-text uppercase truncate px-2 drop-shadow-[0_0_8px_rgba(199,125,255,0.4)]">
          VERBOMANCER — {activeModeName}
        </h1>
        <div className="flex items-center gap-2 sm:gap-3 justify-end">
          <button
            type="button"
            aria-label="Estatísticas"
            onClick={(e) => e.currentTarget.blur()}
            className="p-1 sm:p-1.5 rounded text-arcane-muted hover:text-arcane-text hover:bg-arcane-surface transition-colors cursor-pointer"
          >
            <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            aria-label="Ajuda"
            onClick={(e) => e.currentTarget.blur()}
            className="p-1 sm:p-1.5 rounded text-arcane-muted hover:text-arcane-text hover:bg-arcane-surface transition-colors cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      <nav className="w-full max-w-[840px] px-2 flex justify-center gap-1.5 sm:gap-4 mt-2 mb-1 shrink-0">
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
              className={`flex-1 sm:flex-initial text-center px-2.5 sm:px-5 py-1.5 sm:py-2 rounded font-normal text-[10px] sm:text-xs tracking-wider sm:tracking-widest border transition-all cursor-pointer ${currentMode === modeKey
                ? 'bg-arcane-accent border-arcane-accent text-white shadow-[0_0_15px_rgba(199,125,255,0.5)] scale-105'
                : 'bg-arcane-surface border-arcane-border text-white hover:border-arcane-accent/60'
                }`}
            >
              {modeItem.name}
            </button>
          );
        })}
      </nav>

      <div className="relative w-full max-w-[840px] h-10 flex items-center justify-center my-2 shrink-0 px-2 pointer-events-none">
        <Notification message={game.notification} />
      </div>

      <main className="flex-1 min-h-0 w-full flex items-center justify-center overflow-y-auto px-2 py-1">
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
        <div className="w-full max-w-[840px] py-1 text-center text-[10px] sm:text-xs font-normal tracking-widest text-arcane-muted border-t border-arcane-border/50 uppercase">
          Verbomancer — Ritual do Dia #{game.dayNumber}
        </div>
      </footer>
    </div>
  );
};

export default App;