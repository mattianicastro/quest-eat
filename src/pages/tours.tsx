import type { NextPage } from "next";
import { api } from "~/utils/api";
import TourCard from "~/components/TourCard";
import { Loading } from "~/components/Loading";

export const Tours: NextPage = () => {
    const toursQuery = api.tours.getTours.useQuery();

    if (toursQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col p-4">
            <div className="mb-5 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Tours</h1>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-6">
                {toursQuery.data ? (
                    toursQuery.data.map((tour) => {
                        return <TourCard key={tour.id} tour={tour} />;
                    })
                ) : (
                    <p>No data</p>
                )}
            </div>
        </div>
    );
};

export default Tours;
