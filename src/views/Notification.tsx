interface NotificationProps {
    message: string | null;
}

export const Notification = ({ message }: NotificationProps) => {
    if (!message) return null;

    return (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-arcane-text text-arcane-abyss font-bold text-sm rounded shadow-2xl border-2 border-arcane-border animate-bounce">
            {message}
        </div>
    );
};