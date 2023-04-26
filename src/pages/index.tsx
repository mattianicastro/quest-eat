import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "react-daisyui";

const Index: NextPage = () => {
    return (
        <div className="h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center p-5 gap-y-4 bg-gradient-to-r from-yellow-400 to-orange-500">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">Quest eat</h1>
            <Image src={"/content-crop-logo.png"} alt={"Logo"} width={400} height={400}></Image>
            <Button className="bg-gradient-to-r from-indigo-400 to-teal-500 text-black" href={"/tours"}>Esplora</Button>
        </div>

    
    )
    ;
};

export default Index;
