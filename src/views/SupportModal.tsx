import { useState } from 'react';
import { Modal } from './Modal';
import { GAME_CONFIG } from '../config/game.config';
import { Coffee, Copy, Check, GitFork, ExternalLink, Key } from 'lucide-react';

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopyPix = async () => {
        try {
            await navigator.clipboard.writeText(GAME_CONFIG.pixKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="ME COMPRA UM CAFÉ?">
            <div className="flex flex-col items-center text-center space-y-3 py-2">
                <Coffee className="w-12 h-12 text-arcane-place" />
                <h3 className="text-base sm:text-lg font-bold tracking-widest text-white uppercase">
                    APOIE O VERBOMANCER
                </h3>
                <p className="text-xs sm:text-sm text-arcane-muted">
                    Este projeto é gratuito, sem anúncios e mantido com dedicação por <strong className="text-white">{GAME_CONFIG.company}</strong>. Considere apoiar com um café via PIX!
                </p>
            </div>

            <div className="border-t border-arcane-border/60 pt-4 space-y-3">
                <div className="flex items-center justify-center gap-2 text-white font-bold uppercase tracking-wider text-xs sm:text-sm text-center">
                    <Key className="w-4 h-4 text-arcane-place" />
                    <h4>CHAVE PIX ALEATÓRIA</h4>
                </div>

                <div className="flex items-center justify-between p-2.5 sm:p-3 bg-arcane-abyss border-2 border-arcane-border rounded-lg">
                    <span className="font-mono text-xs sm:text-sm text-white select-all break-all pr-2">
                        {GAME_CONFIG.pixKey}
                    </span>
                    <button
                        type="button"
                        onClick={handleCopyPix}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${copied
                            ? 'bg-arcane-right text-white shadow-[0_0_10px_rgba(4,136,83,0.6)]'
                            : 'bg-arcane-accent text-white hover:brightness-110 shadow-[0_0_10px_rgba(199,125,255,0.4)]'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>COPIADO!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                <span>COPIAR</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="border-t border-arcane-border/60 pt-4 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs sm:text-sm">
                    <GitFork className="w-5 h-5 text-arcane-accent" />
                    <h4>CÓDIGO ABERTO E FORK</h4>
                </div>
                <p className="text-xs sm:text-sm text-arcane-muted">
                    O código-fonte do VERBOMANCER é aberto para a comunidade. Você tem total liberdade para clonar, estudar, modificar como quiser e criar o seu próprio fork no GitHub.
                </p>
                <a
                    href={GAME_CONFIG.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-arcane-card border border-arcane-border hover:border-arcane-accent text-white font-bold text-xs sm:text-sm rounded transition-colors cursor-pointer"
                >
                    <span>VER REPOSITÓRIO / FORK NO GITHUB</span>
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </Modal>
    );
};