import type { Restaurant, Tour, TourStop, User } from "@prisma/client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

interface TourCardProps {
    tour: Tour & {
        TourStop: (TourStop & {
            restaurant: Restaurant;
        })[];
        createdBy: User;
    };
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    return (
        <Card className="w-[380px]">
            <CardHeader>
                <CardTitle>{tour.name}</CardTitle>
                <CardDescription>
                    Creato da{" "}
                    <Link href={`/user/${tour.createdBy.id}`}>
                        {tour.createdBy.name}
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{tour.description}</p>

                {tour.TourStop.length > 0 ? (
                    <>
                        {" "}
                        <p className="font-semibold">Tappe</p>
                        <ul>
                            {tour.TourStop.map((stop) => {
                                return (
                                    <li key={stop.id} className="list-decimal">
                                        <div className="font-light">
                                            <Link
                                                href={`/restaurant/${stop.restaurantId}`}
                                            >
                                                <p className="underline">
                                                    {stop.restaurant.name}
                                                </p>
                                            </Link>
                                            {stop.description ? (
                                                <p>{stop.description}</p>
                                            ) : null}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                ) : (
                    <p className="font-light">Nessuna tappa</p>
                )}
            </CardContent>
            <CardFooter className="">
                <Link href={`/tour/${tour.id}`}>
                    <Button className="w-full">Visita</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default TourCard;
