import * as React from "react";

import { Button } from "~/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import type { Restaurant } from "@prisma/client";
import { api } from "~/utils/api";
import { CommandLoading } from "cmdk";

interface CommandPopoverProps {
    onCommand: (command: Restaurant | undefined) => void;
}

const CommandPopover: React.FC<CommandPopoverProps> = ({ onCommand }) => {
    const [open, setOpen] = React.useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = React.useState<
        Restaurant | undefined
    >(undefined);
    const [restaurantName, setRestaurantName] = React.useState<string>("");
    const restaurantsQuery = api.restaurants.getRelevant.useQuery(
        { name: restaurantName },
        { enabled: false }
    );

    React.useEffect(() => {
        if (restaurantName) {
            void restaurantsQuery.refetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantName]);

    return (
        <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Ristorante:</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-[150px] justify-start"
                    >
                        {selectedRestaurant ? (
                            <>{selectedRestaurant.name}</>
                        ) : (
                            <>Scegli un ristorante</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="bottom" align="start">
                    <Command>
                        <CommandInput
                            placeholder="Cerca un ristorante..."
                            value={restaurantName}
                            onValueChange={setRestaurantName}
                        />
                        <CommandList>
                            <CommandEmpty>
                                Nessun risultato trovato
                            </CommandEmpty>
                            <CommandGroup>
                                {restaurantsQuery.data?.map((restaurant) => (
                                    <CommandItem
                                        key={restaurant.id}
                                        onSelect={(value) => {
                                            console.log(value);
                                            setOpen(false);
                                            const r =
                                                restaurantsQuery.data.find(
                                                    (restaurant) =>
                                                        restaurant.name.toLowerCase() ===
                                                        value
                                                );
                                            console.log(restaurantsQuery.data)
                                            console.log(r)
                                            setSelectedRestaurant(r);
                                            onCommand(r);
                                        }}
                                    >
                                        <span>{restaurant.name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export { CommandPopover };
