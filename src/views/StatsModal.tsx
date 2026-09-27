import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { GAME_CONFIG } from '../config/game.config';
import type { BoardState, GameMode, GameStats } from '../types/game';
import { evaluateGuess } from '../services/evaluator';
import { Share2, Check, Clock, Trophy, Flame, Skull } from 'lucide-react';

interface StatsModalProps {
    isOpen: boolean;
    onClose: () => void;
    stats: GameStats;
    mode: GameMode;
    dayNumber: number;
    boards: BoardState[];
    guesses: string[];
    isGameOver: boolean;
    isGameWon: boolean;
}

export const StatsModal = ({
    isOpen,
    onClose,
    stats,
    mode,
    dayNumber,
    boards,
    guesses,
    isGameOver,
    isGameWon,
}: StatsModalProps) => {
    const [copied, setCopied] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const diff = Math.max(0, tomorrow.getTime() - now.getTime());

            const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

            setTimeLeft(`${hours}:${minutes}:${seconds}`);
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, []);

    const config = GAME_CONFIG.modes[mode];
    const winPercentage = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
    const losses = Math.max(0, stats.played - stats.wins);
    const maxDistributionCount = Math.max(1, ...Object.values(stats.distribution), losses);

    const handleShare = async () => {
        const title = `VERBOMANCER v${GAME_CONFIG.version} (${config.name}) #${dayNumber} ${isGameWon ? guesses.length : 'X'
            }/${config.maxRows}\n`;

        const statusMap = {
            right: '🟩',
            place: '🟨',
            wrong: '⬛',
            empty: '⬛',
            tbd: '⬛',
        };

        let body = '';

        if (boards.length === 1) {
            body = guesses
                .map((guess) => {
                    const evalRes = evaluateGuess(guess, boards[0].targetNormalized, boards[0].targetWord);
                    return evalRes.map((item) => statusMap[item.status]).join('');
                })
                .join('\n');
        } else {
            body = guesses
                .map((guess) => {
                    return boards
                        .map((b) => {
                            const evalRes = evaluateGuess(guess, b.targetNormalized, b.targetWord);
                            return evalRes.map((item) => statusMap[item.status]).join('');
                        })
                        .join(' ');
                })
                .join('\n');
        }

        const shareText = `${title}\n${body}\n\n${window.location.origin}`;

        try {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`ESTATÍSTICAS — ${config.name}`}>
            {isGameOver && (
                <div className="py-2 flex flex-col items-center text-center space-y-2">
                    {isGameWon ? (
                        <div className="flex items-center gap-2 text-arcane-right font-bold text-sm sm:text-base">
                            <Trophy className="w-6 h-6 animate-pulse" />
                            <span>RITUAL CONCLUÍDO COM SUCESSO!</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-1.5 p-3 rounded bg-arcane-card border border-red-500/40 w-full">
                            <span className="text-red-400 font-bold text-xs uppercase tracking-wider">
                                O RITUAL FALHOU. PALAVRA(S) DO DIA:
                            </span>
                            <div className="flex flex-wrap justify-center gap-2">
                                {boards.map((b, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2.5 py-1 bg-arcane-surface border border-arcane-border text-white font-bold text-sm sm:text-base rounded"
                                    >
                                        {b.targetWord}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-4 gap-2 text-center py-2">
                <div className="flex flex-col items-center justify-center p-2 rounded bg-arcane-card border border-arcane-border">
                    <span className="text-lg sm:text-2xl font-bold text-white">{stats.played}</span>
                    <span className="text-[10px] sm:text-xs text-arcane-muted uppercase tracking-wider">
                        Jogos
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded bg-arcane-card border border-arcane-border">
                    <span className="text-lg sm:text-2xl font-bold text-white">{winPercentage}%</span>
                    <span className="text-[10px] sm:text-xs text-arcane-muted uppercase tracking-wider">
                        Vitórias
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded bg-arcane-card border border-arcane-border">
                    <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-arcane-place" />
                        <span className="text-lg sm:text-2xl font-bold text-white">{stats.currentStreak}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-arcane-muted uppercase tracking-wider">
                        Sequência
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded bg-arcane-card border border-arcane-border">
                    <span className="text-lg sm:text-2xl font-bold text-white">{stats.maxStreak}</span>
                    <span className="text-[10px] sm:text-xs text-arcane-muted uppercase tracking-wider">
                        Melhor
                    </span>
                </div>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider text-center">
                    DISTRIBUIÇÃO DE TENTATIVAS
                </h4>
                <div className="space-y-1.5 pt-1">
                    {Array.from({ length: config.maxRows }, (_, i) => i + 1).map((row) => {
                        const count = stats.distribution[row] || 0;
                        const percentage = Math.max(8, Math.round((count / maxDistributionCount) * 100));
                        const isCurrentWinRow = isGameOver && isGameWon && guesses.length === row;

                        return (
                            <div key={row} className="flex items-center gap-2 text-xs font-mono">
                                <span className="w-4 text-right text-arcane-muted font-bold">{row}</span>
                                <div className="flex-1 bg-arcane-abyss rounded overflow-hidden h-5 flex items-center">
                                    <div
                                        style={{ width: `${percentage}%` }}
                                        className={`h-full flex items-center justify-end px-2 font-bold text-white transition-all ${isCurrentWinRow ? 'bg-arcane-right shadow-[0_0_10px_rgba(4,136,83,0.5)]' : 'bg-arcane-border'
                                            }`}
                                    >
                                        {count}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex items-center gap-2 text-xs font-mono">
                        <div className="w-4 flex justify-end items-center">
                            <Skull className="w-3.5 h-3.5 text-arcane-muted" />
                        </div>
                        <div className="flex-1 bg-arcane-abyss rounded overflow-hidden h-5 flex items-center">
                            <div
                                style={{ width: `${Math.max(8, Math.round((losses / maxDistributionCount) * 100))}%` }}
                                className={`h-full flex items-center justify-end px-2 font-bold text-white transition-all ${isGameOver && !isGameWon ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-arcane-border'
                                    }`}
                            >
                                {losses}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-col items-center sm:items-start">
                    <span className="text-[10px] sm:text-xs text-arcane-muted uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-arcane-accent" />
                        <span>PRÓXIMO RITUAL EM:</span>
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white">{timeLeft}</span>
                </div>

                {isGameOver && (
                    <button
                        type="button"
                        onClick={handleShare}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded font-bold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer ${copied
                                ? 'bg-arcane-right text-white shadow-[0_0_12px_rgba(4,136,83,0.7)]'
                                : 'bg-arcane-accent hover:brightness-110 text-white shadow-[0_0_15px_rgba(199,125,255,0.5)]'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>COPIADO!</span>
                            </>
                        ) : (
                            <>
                                <Share2 className="w-4 h-4" />
                                <span>COMPARTILHAR</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </Modal>
    );
};