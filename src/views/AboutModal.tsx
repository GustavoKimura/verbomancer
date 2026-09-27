import { Modal } from './Modal';
import { Skull, ShieldCheck } from 'lucide-react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="SOBRE O VERBOMANCER">
            <div className="flex flex-col items-center text-center space-y-3 py-2">
                <Skull className="w-12 h-12 text-arcane-accent" />
                <h3 className="text-base sm:text-lg font-bold tracking-widest text-white uppercase">
                    VERBOMANCER
                </h3>
                <p className="text-xs sm:text-sm text-arcane-muted">
                    Jogo de dedução lexical com atmosfera dark fantasy e necromancia, construído sobre os fundamentos do Termo e do Wordle.
                </p>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                <h4 className="font-bold text-white uppercase tracking-wider">
                    LÉXICO E VOCABULÁRIO
                </h4>
                <p className="text-arcane-muted">
                    O vocabulário e a validação de palavras derivam da base aberta do léxico da língua portuguesa (pt-br), operando de forma autônoma e determinística.
                </p>
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
                    O jogo não utiliza cookies de rastreamento, não executa serviços de telemetria e armazena o progresso dos rituais exclusivamente no navegador local do seu dispositivo.
                </p>
            </div>

            <div className="border-t border-arcane-border/60 pt-3 text-center text-[10px] sm:text-xs text-arcane-muted">
                VERBOMANCER &copy; {new Date().getFullYear()} — Todos os rituais reservados.
            </div>
        </Modal>
    );
};