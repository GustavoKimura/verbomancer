import { Modal } from './Modal';
import { GAME_CONFIG } from '../config/game.config';
import { Skull, ShieldCheck, GitFork, Coffee, ExternalLink, Building2 } from 'lucide-react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenSupport: () => void;
}

export const AboutModal = ({ isOpen, onClose, onOpenSupport }: AboutModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="SOBRE O VERBOMANCER">
            <div className="flex flex-col items-center text-center space-y-3 py-2">
                <Skull className="w-12 h-12 text-arcane-accent" />
                <h3 className="text-base sm:text-lg font-bold tracking-widest text-white uppercase">
                    VERBOMANCER v{GAME_CONFIG.version}
                </h3>
                <p className="text-xs sm:text-sm text-arcane-muted">
                    Jogo de dedução lexical com atmosfera dark fantasy e necromancia, construído sobre os fundamentos do Termo e do Wordle.
                </p>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
                    <Building2 className="w-5 h-5 text-arcane-place" />
                    <h4>DESENVOLVIMENTO & AUTORIA</h4>
                </div>
                <p className="text-arcane-muted">
                    Criado e mantido por <strong className="text-white">{GAME_CONFIG.company}</strong>.
                </p>
                <a
                    href={GAME_CONFIG.authorGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-arcane-accent hover:underline font-bold"
                >
                    <span>Perfil de Gustavo Kimura no GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
                    <GitFork className="w-5 h-5 text-arcane-accent" />
                    <h4>CÓDIGO ABERTO & FORK</h4>
                </div>
                <p className="text-arcane-muted">
                    O VERBOMANCER é um software livre de código aberto. Qualquer pessoa tem total liberdade para inspecionar, estudar, modificar as mecânicas como desejar e forkar o projeto no GitHub.
                </p>
                <a
                    href={GAME_CONFIG.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-arcane-accent hover:underline font-bold"
                >
                    <span>Repositório oficial no GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-5 h-5 text-arcane-right" />
                    <h4>TERMOS DE PRIVACIDADE</h4>
                </div>
                <p className="text-arcane-muted">
                    O VERBOMANCER não coleta nenhum dado pessoal ou identificador do usuário.
                </p>
                <p className="text-arcane-muted">
                    O jogo não utiliza cookies de rastreamento, não executa telemetria e armazena o progresso dos rituais exclusivamente no navegador local do seu dispositivo.
                </p>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <button
                    type="button"
                    onClick={() => {
                        onClose();
                        onOpenSupport();
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-arcane-card border border-arcane-place/60 text-white rounded hover:bg-arcane-border/40 transition-colors cursor-pointer"
                >
                    <Coffee className="w-4 h-4 text-arcane-place" />
                    <span>ME COMPRA UM CAFÉ? (PIX)</span>
                </button>

                <span className="text-arcane-muted text-[10px] sm:text-xs">
                    VERBOMANCER v{GAME_CONFIG.version} &copy; {new Date().getFullYear()}
                </span>
            </div>
        </Modal>
    );
};