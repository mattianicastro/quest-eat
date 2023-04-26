import type { NextPage } from "next";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { useSession } from "next-auth/react";
import { Login } from "~/components/Login";
import { Map } from "lucide-react";

const Dashboard: NextPage = () => {
    const { data: session } = useSession();

    if (!session) {
        // Handle unauthenticated state, redirect to login page
        return <Login></Login>;
    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-y-5">
                <h1 className="scroll-m-20 p-5 font-sans text-4xl font-bold tracking-tight text-primary md:place-self-start lg:text-5xl">
                    Dashboard
                </h1>
                <div className="flex flex-row flex-wrap items-center justify-center gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tour</CardTitle>
                            <CardDescription>
                                Gestisci i tuoi tour o creane uno nuovo
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Link href={"/dashboard/tours"}>
                                <Button>
                                    <Map className="mr-2 h-4 w-4"></Map>I tuoi
                                    tour
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
               
                </div>
            </main>
        </>
    );
};
export default Dashboard;
