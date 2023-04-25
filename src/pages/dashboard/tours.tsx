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
import { CardHeader, CardDescription, CardContent, CardFooter, Card, CardTitle } from "~/components/ui/card";
import Link from "next/link";
import TourCard from "~/components/TourCard";
import { Loader, Loader2 } from "lucide-react";
import { Loading } from "~/components/Loading";

export const Tours: NextPage = () => {
    const { data: session } = useSession();
    const addTourMutation = api.tours.createTour.useMutation();
    const addStop = api.tours.createStop.useMutation();
    const toursQuery = api.tours.getTours.useQuery();

    if (!session) {
        return <Login></Login>;
    }

    if(toursQuery.isLoading){
        return (
            <Loading />
        )
    }

    return (
        <div className="flex flex-col p-4">
            <div className="flex items-center justify-between mb-5">
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
                                    <Button>Invia</Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-row gap-6 flex-wrap justify-center">
                {toursQuery.data ? (
                    toursQuery.data.map((tour) => {
                        return ( 
                            <TourCard key={tour.id} tour={tour} />
                        );
                    })
                ) : (
                    <p>No data</p>
                )}
            </div>
        </div>
    );
};

export default Tours;

// onClick={
//     () => {
//         void restaurantMutation.mutateAsync({
//             name: "test",
//             address: "test",
//             city: "test",
//             zip: "test",
//             state: "test",
//             lat: 0,
//             lng: 0,
//             phone: "test",
//             website: "https://www.lorenzo.it",
//             email: "lorenzo@cacca.com",
//         }).then((res1)=>{
//             void addTourMutation.mutateAsync({
//                 name: "test",
//             }).then((res)=>{
//                 void addStop.mutateAsync({
//                     tourId: res.tourId,
//                     restaurantId: res1.id
//                 })
//                 console.log(res);
//                 alert('ok')
//             })
//     })

//     }
// }
