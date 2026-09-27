interface NotificationProps {
    message: string | null;
}

export const Notification = ({ message }: NotificationProps) => {
    if (!message) return null;

    return (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-arcane-text text-arcane-abyss font-bold text-sm rounded shadow-[0_0_20px_rgba(199,125,255,0.5)] border-2 border-arcane-accent animate-bounce">
            {message}
        </div>
    );
};