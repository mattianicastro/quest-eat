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
                    <Link href={`/users/${tour.createdBy.id}`}>
                        {tour.createdBy.name}
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {tour.TourStop.length > 0 ? (
                    <>
                        <p className="font-semibold">Tappe:</p>
                        <ul>
                        {tour.TourStop.map((stop) => {
                            return (
                                <li key={stop.id} className="list-decimal">
                                    <div className="font-light">
                                        <Link href={`/restaurant/${stop.restaurantId}`}><p className="underline">{stop.restaurant.name}</p></Link>
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
            <CardFooter>
                <Button><Link href={`/tour/${tour.id}`}>Visita</Link></Button>
            </CardFooter>
        </Card>
    );
};

export default TourCard;
