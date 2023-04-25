import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserAccountNav } from "./user-account-nav";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "./ui/dropdown-menu";

export interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const { data: sessionData } = useSession();
    return (
        <>
            <div className="flex h-14 items-center justify-between border-b border-b-slate-200 bg-yellow-200 px-2 py-4">
                <div className="flex gap-3 md:gap-10">
                    <Link className="" href="/">
                        <Button
                            className="hidden items-center justify-center md:flex md:text-2xl"
                            variant={"link"}
                        >
                            <Image
                                className="mr-2"
                                src={"/content-crop-logo.png"}
                                alt={"Logo"}
                                width={50}
                                height={50}
                            ></Image>
                            Quest Eat
                        </Button>
                    </Link>
                    <div className="visible md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Image
                                    src={"/Cibo_guerriero.png"}
                                    alt={"Logo"}
                                    width={80}
                                    height={80}
                                ></Image>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="mx-2">
                                <DropdownMenuItem asChild>
                                    <Link href="/">Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/tours">Tours</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/restaurants">Ristoranti</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/near-me">Vicino a me</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="hidden md:block">
                        <Button className="" variant={"ghost"}>
                            <Link className="" href="/tours">
                                Tours
                            </Link>
                        </Button>
                        <Button className="" variant={"ghost"}>
                            <Link className="" href="/restaurants">
                                Ristoranti
                            </Link>
                        </Button>
                        <Button className="" variant={"ghost"}>
                            <Link className="" href="/near-me">
                                Vicino a me
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="">
                    {sessionData ? (
                        <UserAccountNav user={sessionData.user} />
                    ) : (
                        <Button
                            onClick={() => {
                                void signIn();
                            }}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
            {children}
        </>
    );
};

export { Layout };
