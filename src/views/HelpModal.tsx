import { Modal } from './Modal';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="COMO JOGAR">
            <p>
                Descubra a palavra certa no número limite de tentativas. A cada palpite, as runas revelam o quão próximo você está da solução do ritual.
            </p>

            <div className="space-y-2 py-2">
                <div className="flex gap-1.5 justify-center">
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-right border-2 border-arcane-right text-white shadow-[0_0_10px_rgba(4,136,83,0.5)]">
                        T
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        U
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        R
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        M
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        A
                    </span>
                </div>
                <p className="text-center text-[11px] sm:text-xs text-arcane-muted">
                    A runa <strong className="text-white">T</strong> faz parte da palavra e está na posição correta.
                </p>
            </div>

            <div className="space-y-2 py-2">
                <div className="flex gap-1.5 justify-center">
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        V
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        I
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-place border-2 border-arcane-place text-white shadow-[0_0_10px_rgba(212,154,21,0.5)]">
                        O
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        L
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        A
                    </span>
                </div>
                <p className="text-center text-[11px] sm:text-xs text-arcane-muted">
                    A runa <strong className="text-white">O</strong> faz parte da palavra, mas em outra posição.
                </p>
            </div>

            <div className="space-y-2 py-2">
                <div className="flex gap-1.5 justify-center">
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        P
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        U
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        L
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-wrong border-2 border-arcane-wrong text-arcane-wrong-fg opacity-70">
                        G
                    </span>
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center font-bold text-base sm:text-lg rounded bg-arcane-surface border-2 border-arcane-border text-white">
                        A
                    </span>
                </div>
                <p className="text-center text-[11px] sm:text-xs text-arcane-muted">
                    A runa <strong className="text-white">G</strong> não faz parte da palavra.
                </p>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 space-y-2 text-arcane-muted text-[11px] sm:text-xs">
                <p>
                    Os acentos são preenchidos automaticamente na revelação e não são considerados nas dicas.
                </p>
                <p>
                    As palavras podem conter runas repetidas na mesma linha.
                </p>
                <p className="text-white font-bold">
                    Um novo conjunto de rituais surge a cada meia-noite.
                </p>
            </div>
        </Modal>
    );
};