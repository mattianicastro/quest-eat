import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const RestaurantDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const restaurantsQuery = api.restaurants.get.useQuery({ id: id as string });
    if (!restaurantsQuery.data) return <p>No data</p>;
    return (
        <>
            <div className="flex flex-row flex-wrap justify-center">
                <h1>{restaurantsQuery.data.name}</h1>
            </div>
        </>
    );
};

export default RestaurantDetails;
