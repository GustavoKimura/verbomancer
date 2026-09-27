interface NotificationProps {
    message: string | null;
}

export const Notification = ({ message }: NotificationProps) => {
    return (
        <div
            className={`fixed top-32 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 bg-arcane-surface text-arcane-text font-bold text-sm sm:text-base rounded-md border border-arcane-accent shadow-[0_4px_24px_rgba(199,125,255,0.35)] transition-all duration-300 pointer-events-none ${message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
        >
            {message}
        </div>
    );
};