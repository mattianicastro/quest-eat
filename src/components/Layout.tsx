import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserAccountNav } from "./user-account-nav";
import { GitFork } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
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
                    <Button
                        className="hidden md:flex md:text-2xl"
                        variant={"ghost"}
                    >
                        <Link className="" href="/">
                            Quest Eat
                        </Link>
                    </Button>
                    <div className="visible px-2 md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <GitFork />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="mx-2">
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/billing">
                                        Billing
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/settings">
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onSelect={(event: Event) => {
                                        event.preventDefault();
                                        void signOut({
                                            callbackUrl: `${window.location.origin}/`,
                                        });
                                    }}
                                >
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="hidden md:block">
                        <Button className="" variant={"ghost"}>
                            <Link className="" href="/">
                                Quest Eat
                            </Link>
                        </Button>
                        <Button className="" variant={"ghost"}>
                            <Link className="" href="/">
                                Quest Eat
                            </Link>
                        </Button>
                        <Button className="" variant={"ghost"}>
                            <Link className="" href="/">
                                Quest Eat
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
