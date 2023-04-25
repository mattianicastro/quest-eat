import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
    return (
        <div className="flex h-[calc(100vh-56px)] flex-col items-center justify-center">
            <Loader2 className="animate-spin" size={100} />
        </div>
    );
};

export { Loading };
