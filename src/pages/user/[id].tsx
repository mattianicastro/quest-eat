import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";
import { Loading } from "~/components/Loading";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getInitials } from "~/lib/utils";

const RestaurantDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const userQuery = api.users.getUser.useQuery({ id: id as string });

    if (userQuery.isLoading) return <Loading />;
    if (!userQuery.data) return <div>Utente non trovato</div>;

    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-y-5 bg-primary-foreground p-5 md:items-start">
                <div className="flex flex-row justify-center items-center gap-x-5">
                <Avatar>
                    <AvatarImage src={userQuery.data.image||""} />
                    <AvatarFallback>{getInitials(userQuery.data.name||"No Name")}</AvatarFallback>
                </Avatar>
                <h1 className="scroll-m-20 font-sans text-4xl font-bold tracking-tight text-primary lg:text-5xl">
                    {userQuery.data.name}
                </h1>
                </div>


                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Informazioni utente
                </h2>
                <p className="leading-7 ">ID: {userQuery.data.id}</p>
                <p className="leading-7 ">Nome: {userQuery.data.name}</p>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            Tour creati: {userQuery.data.Tour.length}
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul>
                                {userQuery.data.Tour.map((tour) => (
                                    <li key={tour.id}>
                                        <Link
                                            className="underline"
                                            href={`/tour/${tour.id}`}
                                        >
                                            {tour.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            Ristoranti aggiunti:{" "}
                            {userQuery.data.Restaurant.length}
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc">
                                {userQuery.data.Restaurant.map((restaurant) => (
                                    <li key={restaurant.id}>
                                        <Link
                                            className="underline"
                                            href={`/restaurant/${restaurant.id}`}
                                        >
                                            {restaurant.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </main>
        </>
    );
};

export default RestaurantDetails;
