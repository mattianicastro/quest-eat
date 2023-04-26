import type { Restaurant, User } from "@prisma/client";
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
import { Map, Phone } from "lucide-react";

interface RestaurantCardProps {
    restaurant: Restaurant & {
        createdBy: User;
    };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
    return (
        <Card className="w-[380px]">
            <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardDescription>
                    <div className="flex flex-row gap-2">
                        <Map></Map>
                        <p>
                            {restaurant.city}, {restaurant.state}
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Phone /> {restaurant.phone}
                    </div>
                    Aggiunto da{" "}
                    <Link href={`/user/${restaurant.createdBy.id}`}>
                        {restaurant.createdBy.name} il{" "}
                        {new Date(restaurant.createdAt).toLocaleDateString()}
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="">
                <Link href={`/restaurant/${restaurant.id}`}>
                    <Button className="w-full">Visita</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default RestaurantCard;
