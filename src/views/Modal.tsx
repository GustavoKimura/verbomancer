import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-tile-pop"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[560px] max-h-[85dvh] flex flex-col bg-arcane-surface border-2 border-arcane-border rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden"
            >
                <header className="flex items-center justify-between px-4 py-3 border-b border-arcane-border bg-arcane-card/60 shrink-0">
                    <h2 className="text-sm sm:text-base font-bold tracking-widest text-arcane-text uppercase">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar"
                        className="p-1 rounded text-arcane-muted hover:text-white hover:bg-arcane-border/50 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-arcane-text text-xs sm:text-sm leading-relaxed space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
};