import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface AddRestaurantModalProps {
    onAdd: (restaurant: PartialRestaurant) => void;
}

interface PartialRestaurant {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lng: number;
    phone?: string;
    email?: string;
    website?: string;
}

const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({ onAdd }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-red-600 text-white">Aggiungi nuovo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const data = {
                            name: formData.get("name") as string,
                            address: formData.get("address") as string,
                            city: formData.get("city") as string,
                            state: formData.get("state") as string,
                            zip: formData.get("zip") as string,
                            lat: parseFloat(formData.get("lat") as string),
                            lng: parseFloat(formData.get("lng") as string),
                            phone: formData.get("phone") as string || undefined,
                            email: formData.get("email") as string || undefined,
                            website: formData.get("website") as string || undefined,
                        } satisfies PartialRestaurant;
                        onAdd(data);
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Aggiungi un nuovo ristorante</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input
                                required
                                id="name"
                                placeholder="Il mio ristorante"
                                name="name"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Indirizzo
                            </Label>
                            <Input
                                required
                                id="address"
                                placeholder="Via Roma, 1"
                                className="col-span-3"
                                name="address"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">
                                Città
                            </Label>
                            <Input
                                required
                                id="city"
                                placeholder="Brescia"
                                className="col-span-3"
                                name="city"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state" className="text-right">
                                Stato
                            </Label>
                            <Input
                                required
                                id="state"
                                placeholder="Italia"
                                className="col-span-3"
                                name="state"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="zip" className="text-right">
                                Stato
                            </Label>
                            <Input
                                required
                                id="zip"
                                placeholder="25100"
                                className="col-span-3"
                                name="zip"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lat" className="text-right">
                                Latitudine
                            </Label>
                            <Input
                                required
                                id="lat"
                                placeholder="45.55607615779726"
                                className="col-span-3"
                                name="lat"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lng" className="text-right">
                                Latitudine
                            </Label>
                            <Input
                                required
                                id="lng"
                                placeholder="10.215992510248862"
                                className="col-span-3"
                                name="lng"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Telefono
                            </Label>
                            <Input
                                id="phone"
                                placeholder="111 111 1111"
                                className="col-span-3"
                                name="phone"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="website" className="text-right">
                                Sito web
                            </Label>
                            <Input
                                id="website"
                                placeholder="https://example.com"
                                className="col-span-3"
                                name="website"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="example@example.com"
                                className="col-span-3"
                                name="email"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Aggiungi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export { AddRestaurantModal };

export type { PartialRestaurant };
