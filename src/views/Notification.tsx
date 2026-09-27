interface NotificationProps {
    message: string | null;
}

export const Notification = ({ message }: NotificationProps) => {
    if (!message) return null;

    return (
        <div className="fixed top-24 sm:top-28 left-1/2 -translate-x-1/2 z-50 px-5 py-2 bg-arcane-surface text-arcane-text font-bold text-xs sm:text-sm rounded border border-arcane-accent shadow-[0_0_20px_rgba(199,125,255,0.4)] pointer-events-none animate-tile-pop">
            {message}
        </div>
    );
};