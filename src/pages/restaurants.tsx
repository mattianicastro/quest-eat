import type { NextPage } from "next";
import { api } from "~/utils/api";
import { Loading } from "~/components/Loading";
import RestaurantCard from "~/components/RestaurantCard";

export const Restaurants: NextPage = () => {
    const restaurantsQuery = api.restaurants.getAll.useQuery();

    if (restaurantsQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col p-4">
            <div className="mb-5 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Ristoranti</h1>
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
