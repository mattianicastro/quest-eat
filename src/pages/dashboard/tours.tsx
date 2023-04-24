import type { NextPage } from "next";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";

import { Login } from "~/components/Login";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useSession } from "next-auth/react";

export const Tours: NextPage = () => {
    const { data: session } = useSession();

    if (!session) {
        return <Login></Login>;
    }

    return (
        <div className="flex flex-col p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Tours</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Crea</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Crea un tour</DialogTitle>
                            <DialogDescription asChild>
                                <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
                                    <Label htmlFor="email"></Label>
                                    <Input placeholder="Nome" />
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Tours;
