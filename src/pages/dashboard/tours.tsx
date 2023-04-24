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
import { api } from "~/utils/api";

export const Tours: NextPage = () => {
    const { data: session } = useSession();
    const addTourMutation = api.tours.createTour.useMutation();
    const addStop = api.tours.createStop.useMutation();
    const toursQuery = api.tours.getTours.useQuery();

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
                                    <Button onClick={
                                        () => {
                                            void addTourMutation.mutateAsync({
                                                name: "test",
                                            }).then((res)=>{
                                                void addStop.mutateAsync({
                                                    tourId: res.tourId,
                                                    restaurantId: 'clgv8qohy0004x0hc7rt0abc2'
                                                })
                                                console.log(res);
                                            })
                                        }
                                    }>Invia</Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col flex-wrap justify-center">
                {
                    toursQuery.data ? toursQuery.data.map((tour) => {
                        return (
                            <div key={tour.id} className="flex flex-col items-center justify-center gap-5 p-4">
                                <h1>{tour.name}</h1>
                                {tour.TourStop.map((stop) => {
                                    return (
                                        <div key={stop.id}>
                                            <p>- {stop.restaurant.name}</p>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        )
                    }
                    ) : <p>No data</p>
                }
            </div>
        </div>
    );
};

export default Tours;
