import { Progress } from "@radix-ui/react-progress";
import { NextPage } from "next";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
    const getAllQuery = api.restaurants.getOwn.useQuery({});
    const deleteMutation = api.restaurants.delete.useMutation();
    const value = useState(0)

    setInterval(() => {
        value[1](value[0] + 1)
    }, 1000)

    return (
        <>
        <main className="bg-primary-foreground min-h-screen flex flex-col items-center gap-y-5">
            <h1 className="font-sans text-primary p-5 scroll-m-20 text-4xl font-bold tracking-tight place-self-start lg:text-5xl">Dashboard</h1>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Ristoranti</h2>
            <div className="flex flex-row flex-wrap justify-center">
            <Progress value={73} className="w-[60%]"/>
                {getAllQuery.data ? getAllQuery.data.map((item) => {
                    return <Card key={item.id} className="w-80 m-5">
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{item.email}</p>
                            <p>{item.phone}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant={"destructive"} onClick={()=>{
                                deleteMutation.mutateAsync({id: item.id}).then(() => void getAllQuery.refetch())
                            }}>Elimina</Button>
                        </CardFooter>
                    </Card>
                }) : null
                }
            </div>
        </main>
        </>            
    )
}
export default Dashboard