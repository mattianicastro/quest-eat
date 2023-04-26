import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "react-daisyui";

const Index: NextPage = () => {
    return (
        <div className="min-h-[calc(100vh-3.5rem)] h-max flex flex-col justify-center items-center p-5 gap-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 text-red-500">Quest eat</h1>
            <Image src={"/content-crop-logo.png"} alt={"Logo"} width={400} height={400}></Image>
            <Button className="bg-gradient-to-r bg-red-600 text-white" href={"/tours"}>Esplora</Button>
        </div>

    
    )
    ;
};

export default Index;
