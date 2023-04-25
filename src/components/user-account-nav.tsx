import Link from "next/link";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "~/lib/utils";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: User;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback>
                        {getInitials(user.name || "No Name")}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && (
                            <p className="font-medium">{user.name}</p>
                        )}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-slate-600">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
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
    );
}
