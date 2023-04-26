import type { NextPage } from "next";
import { api } from "~/utils/api";
import { Loading } from "~/components/Loading";
import { useRouter } from "next/router";

import RestaurantCard from "~/components/RestaurantCard";
import { AddRestaurantModal } from "~/components/AddRestaurantModal";
import type { PartialRestaurant } from "~/components/AddRestaurantModal";

export const Restaurants: NextPage = () => {
    const restaurantsQuery = api.restaurants.getAll.useQuery();
    const addRestaurantMutation =
        api.restaurants.createRestaurant.useMutation();
    const router = useRouter();

    if (restaurantsQuery.isLoading) {
        return <Loading />;
    }

    function handleAddRestaurant(restaurant: PartialRestaurant) {
        void addRestaurantMutation
            .mutateAsync(restaurant)
            .then((res) => {
                void router.push(`/restaurant/${res.id}`);
            })
            .catch(() => {
                alert(addRestaurantMutation.failureReason);
            });
    }

    return (
        <div className="flex flex-col p-4">
            <div className="mb-5 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-red-500">Ristoranti</h1>
                <AddRestaurantModal onAdd={handleAddRestaurant} />
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-6">
                {restaurantsQuery.data ? (
                    restaurantsQuery.data.map((restaurant) => {
                        return (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                            />
                        );
                    })
                ) : (
                    <p>No data</p>
                )}
            </div>
        </div>
    );
};

export default Restaurants;
