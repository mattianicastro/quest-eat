import type { NextPage } from "next";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";

import { Login } from "~/components/Login";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import TourCard from "~/components/TourCard";
import { Loader2 } from "lucide-react";
import { Loading } from "~/components/Loading";
import { useState } from "react";
import { useRouter } from "next/router";

export const Tours: NextPage = () => {
    const { data: session } = useSession();
    const addTourMutation = api.tours.createTour.useMutation();
    const toursQuery = api.tours.getTours.useQuery();
    const [tourName, setTourName] = useState("");
    const [tourDescription, setTourDescription] = useState("");
    const router = useRouter();

    if (!session) {
        return <Login></Login>;
    }

    if (toursQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col p-4">
            <div className="mb-5 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-red-500">Tours</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-red-600 text-white">Crea</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Crea nuovo tour</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nome
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Il mio tour"
                                    value={tourName}
                                    onChange={(e) =>
                                        setTourName(e.target.value)
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
                                    Descrizione
                                </Label>
                                <Input
                                    id="description"
                                    placeholder="Never gonna let you down"
                                    className="col-span-3"
                                    value={tourDescription}
                                    onChange={(e) =>
                                        setTourDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                disabled={addTourMutation.isLoading}
                                onClick={() => {
                                    void addTourMutation
                                        .mutateAsync({
                                            name: tourName,
                                            description: tourDescription,
                                        })
                                        .then((res) => {
                                            void router.push(
                                                `/tour/${res.tourId}`
                                            );
                                        });
                                }}
                            >
                                {addTourMutation.isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Aggiungi"
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-6">
                {toursQuery.data ? (
                    toursQuery.data.map((tour) => {
                        return <TourCard key={tour.id} tour={tour} />;
                    })
                ) : (
                    <p>No data</p>
                )}
            </div>
        </div>
    );
};

export default Tours;
