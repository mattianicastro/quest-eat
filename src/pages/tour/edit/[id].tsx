import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { Loading } from "~/components/Loading";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "~/components/ui/dialog";
import { DialogHeader } from "~/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { CommandPopover } from "~/components/CommandPopover";

import { Login } from "~/components/Login";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Restaurant } from "@prisma/client";
import StepAccordion from "~/components/StepAccordion";

export const Tour: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { id } = router.query;

    const tourQuery = api.tours.getTour.useQuery({ id: id as string });
    const deleteMutation = api.tours.deleteTour.useMutation();
    const addStepMutation = api.tours.createStop.useMutation();
    const deleteStepMutation = api.tours.deleteStop.useMutation();

    const [selectedRestaurant, setSelectedRestaurant] = useState<
        Restaurant | undefined
    >(undefined);
    const [tourDescription, setTourDescription] = useState<string>("");
    const [stepDescription, setStepDescription] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    useEffect(() => {
        if (tourQuery.data?.description) {
            setTourDescription(tourQuery.data.description);
        }
    }, [tourQuery.data]);

    if (!id) return <Loading />;

    if (!session) return <Login />;
    if (tourQuery.isLoading) return <Loading />;
    if (!tourQuery.data) return <div>Tour non trovato</div>;

    function deleteStop(id: string) {
        void deleteStepMutation.mutateAsync({ id }).then(() => {
            void tourQuery.refetch();
        });
    }

    return (
        <div>
            <div className="p-4">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {tourQuery.data.name}
                        </h1>
                        <p className="font-light">
                            Creato da{" "}
                            <Link href={`/user/${tourQuery.data.createdBy.id}`}>
                                {tourQuery.data.createdBy.name}
                            </Link>
                        </p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Button variant={"default"}>Salva</Button>
                        <Dialog>
                            <DialogTrigger>
                                <Button variant={"destructive"}>Elimina</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Sei sicuro?</DialogTitle>
                                    <DialogDescription>
                                        Questa azione non può essere annullata!
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button
                                        disabled={deleteMutation.isLoading}
                                        onClick={() => {
                                            void deleteMutation
                                                .mutateAsync({
                                                    id: id as string,
                                                })
                                                .then(() => {
                                                    void router.push(
                                                        "/dashboard/tours"
                                                    );
                                                });
                                        }}
                                    >
                                        {deleteMutation.isLoading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            "Elimina"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Input
                    value={tourDescription}
                    onChange={(e) => setTourDescription(e.target.value)}
                />
                <div className="flex flex-col flex-wrap justify-center gap-6">
                    {tourQuery.data.TourStop.map((stop, i) => {
                        return (
                            <StepAccordion
                                key={stop.id}
                                position={i}
                                stop={stop}
                                editMode={true}
                                onDelete={deleteStop}
                            />
                        );
                    })}
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger>
                            <Button className="w-full">Aggiungi tappa</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Aggiungi tappa</DialogTitle>
                                <DialogDescription>
                                    Aggiungi una tappa al tour{" "}
                                    {tourQuery.data.name}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="">
                                <CommandPopover
                                    onCommand={setSelectedRestaurant}
                                />
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
                                    Descrizione
                                </Label>
                                <Input
                                    id="description"
                                    placeholder="Never gonna run around and desert you"
                                    className="col-span-3"
                                />
                            </div>
                            <DialogFooter>
                                <Button
                                    disabled={addStepMutation.isLoading}
                                    onClick={() => {
                                        void addStepMutation
                                            .mutateAsync({
                                                restaurantId:
                                                    selectedRestaurant?.id as string,
                                                tourId: id as string,
                                                description: stepDescription,
                                            })
                                            .then(() => {
                                                setSelectedRestaurant(
                                                    undefined
                                                );
                                                setStepDescription("");
                                                setDialogOpen(false);
                                                void tourQuery.refetch();
                                            });
                                    }}
                                >
                                    {deleteMutation.isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "Aggiungi"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Tour;
