import type { Restaurant, TourStop } from "@prisma/client";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "./ui/accordion";
import Link from "next/link";
import { Card } from "./ui/card";
import { CardHeader } from "./ui/card";
import dynamic from "next/dynamic";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";

const Map = dynamic(() => import("~/components/Map"), { ssr: false });

interface StepAccordionProps {
    stop: TourStop & {
        restaurant: Restaurant;
    };
    position: number;
    editMode: boolean;
    onDelete?: (id: string) => void;
}

const StepAccordion: React.FC<StepAccordionProps> = ({
    stop,
    position,
    editMode,
    onDelete,
}) => {
    return (
        <Accordion key={stop.id} type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-xl font-bold">
                        {position + 1}) {stop.restaurant.name}
                    </h1>{" "}
                </AccordionTrigger>
                <AccordionContent asChild>
                    <Card>
                        <CardHeader>
                            <p>
                                <p>{stop.description}</p>
                                <p className="font-bold">Indirizzo:</p>
                                {stop.restaurant.address},{" "}
                                {stop.restaurant.city} ({stop.restaurant.zip})
                                <div className="h-[180px] w-full py-3 md:w-[360px]">
                                    <Map
                                        position={[
                                            stop.restaurant.lat,
                                            stop.restaurant.lng,
                                        ]}
                                        popupText={stop.restaurant.name}
                                    />
                                </div>
                            </p>
                            <p>
                                <p className="font-bold">Contatti:</p>
                                <p>Telefono: {stop.restaurant.phone}</p>
                                {stop.restaurant.email && (
                                    <p>Email: stop.restaurant.email </p>
                                )}

                                {stop.restaurant.website && (
                                    <p>
                                        Website:{" "}
                                        <Link href={stop.restaurant.website}>
                                            {stop.restaurant.website}
                                        </Link>
                                    </p>
                                )}
                            </p>
                            <p></p>
                        </CardHeader>
                        {editMode && onDelete ? (
                            <CardFooter>
                                <Button
                                    variant={"destructive"}
                                    onClick={() => onDelete(stop.id)}
                                >
                                    Elimina
                                </Button>
                            </CardFooter>
                        ) : null}
                    </Card>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default StepAccordion;
