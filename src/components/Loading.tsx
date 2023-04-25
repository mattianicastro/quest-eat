import { Loader2 } from "lucide-react";
 
const Loading: React.FC = () => {
    return ( 
        <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)]">
        <Loader2 className="animate-spin" size={100} />
        </div>
     );
}
 
export {
    Loading
};