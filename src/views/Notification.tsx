interface NotificationProps {
    message: string | null;
}

export const Notification = ({ message }: NotificationProps) => {
    if (!message) return null;

    return (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 bg-arcane-surface text-arcane-text font-bold text-xs sm:text-sm md:text-base rounded border border-arcane-accent shadow-[0_0_20px_rgba(199,125,255,0.5)] animate-tile-pop text-center tracking-widest uppercase whitespace-nowrap pointer-events-none">
            {message}
        </div>
    );
};