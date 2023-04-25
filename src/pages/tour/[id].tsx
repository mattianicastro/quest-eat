import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { Loading } from "~/components/Loading";
import { api } from "~/utils/api";
import { Card, CardHeader } from "~/components/ui/card";
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("~/components/Map"), { ssr: false });

export const Tour: NextPage = () => {
    const { id } = useRouter().query;
    const tourQuery = api.tours.getTour.useQuery({ id: id as string });
    const router = useRouter();
    const { data: session } = useSession();
    const deleteMutation = api.tours.deleteTour.useMutation();
    if (tourQuery.isLoading) return <Loading />;
    if (!tourQuery.data) return <div>Tour non trovato</div>;

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
                            <Link
                                href={`/users/${tourQuery.data.createdBy.id}`}
                            >
                                {tourQuery.data.createdBy.name}
                            </Link>
                        </p>
                    </div>
                    {id === session?.user.id && (
                        <div className="flex flex-col gap-y-2">
                            <Dialog>
                                <DialogTrigger>
                                    <Button variant={"destructive"}>
                                        Elimina
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Sei sicuro?</DialogTitle>
                                        <DialogDescription>
                                            Questa azione non può essere
                                            annullata!
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
                    )}
                </div>

                {tourQuery.data.description}
                <div className="flex flex-col flex-wrap justify-center gap-6">
                    {tourQuery.data.TourStop.map((stop, i) => {
                        return (
                            <>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <h1 className="text-xl font-bold">
                                                {i + 1}) {stop.restaurant.name}
                                            </h1>{" "}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <Card key={stop.id}>
                                                <CardHeader>
                                                    <p>
                                                        <p className="font-bold">
                                                            Indirizzo:
                                                        </p>
                                                        {
                                                            stop.restaurant
                                                                .address
                                                        }
                                                        , {stop.restaurant.city}{" "}
                                                        ({stop.restaurant.zip})
                                                        <div className="h-[180px] w-full py-3 md:w-[360px]">
                                                            <Map
                                                                position={[
                                                                    stop
                                                                        .restaurant
                                                                        .lat,
                                                                    stop
                                                                        .restaurant
                                                                        .lng,
                                                                ]}
                                                                popupText={
                                                                    stop
                                                                        .restaurant
                                                                        .name
                                                                }
                                                            />
                                                        </div>
                                                    </p>
                                                    <p>
                                                        <p className="font-bold">
                                                            Contatti:
                                                        </p>
                                                        <p>
                                                            Telefono:{" "}
                                                            {
                                                                stop.restaurant
                                                                    .phone
                                                            }
                                                        </p>
                                                        {stop.restaurant
                                                            .email && (
                                                            <p>
                                                                Email:
                                                                stop.restaurant.email{" "}
                                                            </p>
                                                        )}

                                                        {stop.restaurant
                                                            .website && (
                                                            <p>
                                                                Website:{" "}
                                                                <Link
                                                                    href={
                                                                        stop
                                                                            .restaurant
                                                                            .website
                                                                    }
                                                                >
                                                                    {
                                                                        stop
                                                                            .restaurant
                                                                            .website
                                                                    }
                                                                </Link>
                                                            </p>
                                                        )}
                                                    </p>
                                                    <p></p>
                                                </CardHeader>
                                            </Card>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Tour;
