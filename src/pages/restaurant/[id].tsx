import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Rating } from "react-daisyui";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Map = dynamic(() => import("~/components/Map"), { ssr: false });

const RestaurantDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const restaurantsQuery = api.restaurants.get.useQuery({ id: id as string });
    const reviewsQuery = api.restaurants.getReviews.useQuery({
        id: id as string,
    });
    const setReviewMutation = api.restaurants.setReview.useMutation();
    const session = useSession();

    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        if (reviewsQuery.data && reviewsQuery.data._avg.rating)
            setRating(reviewsQuery.data._avg.rating);
    }, [reviewsQuery.data]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!restaurantsQuery.data) return <p>No data</p>;
    if (!reviewsQuery.data) return <p>No data</p>;

    function submitReview(ratingValue: number) {
        console.log("submitting review", ratingValue);
        void setReviewMutation
            .mutateAsync({ id: id as string, rating: ratingValue })
            .then(() => {
                void reviewsQuery.refetch();
            });
    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-y-5 bg-primary-foreground p-5 md:items-start">
                <h1 className="scroll-m-20 font-sans text-4xl font-bold tracking-tight text-primary lg:text-5xl">
                    {restaurantsQuery.data.name}
                </h1>
                {reviewsQuery.data._avg.rating ? (
                    <Rating value={rating} onChange={submitReview}>
                        <Rating.Item
                            name="rating-1"
                            disabled={session.status === "unauthenticated"}
                            className="mask mask-star bg-orange-400"
                        />
                        <Rating.Item
                            name="rating-1"
                            disabled={session.status === "unauthenticated"}
                            className="mask mask-star bg-orange-400"
                        />
                        <Rating.Item
                            name="rating-1"
                            disabled={session.status === "unauthenticated"}
                            className="mask mask-star bg-orange-400"
                        />
                        <Rating.Item
                            name="rating-1"
                            disabled={session.status === "unauthenticated"}
                            className="mask mask-star bg-orange-400"
                        />
                        <Rating.Item
                            name="rating-1"
                            disabled={session.status === "unauthenticated"}
                            className="mask mask-star bg-orange-400"
                        />
                    </Rating>
                ) : null}

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Dove
                </h2>
                <p className="leading-7 ">
                    Indirizzo: {restaurantsQuery.data.address},{" "}
                    {restaurantsQuery.data.city}, {restaurantsQuery.data.state}{" "}
                    ({restaurantsQuery.data.zip})
                </p>
                <div className="h-[360px] w-full">
                    <Map
                        position={[
                            restaurantsQuery.data.lat,
                            restaurantsQuery.data.lng,
                        ]}
                        popupText={restaurantsQuery.data.name}
                    />
                </div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Contatti
                </h2>
                <p className="leading-7 ">
                    Telefono: {restaurantsQuery.data.phone}
                </p>
                <p className="leading-7 ">
                    Email: {restaurantsQuery.data.email}
                </p>
                {restaurantsQuery.data.website ? (
                    <p>
                        Sito web:{" "}
                        <Link
                            className="underline"
                            href={restaurantsQuery.data.website}
                        >
                            {restaurantsQuery.data.website}
                        </Link>
                    </p>
                ) : null}
            </main>
        </>
    );
};

export default RestaurantDetails;
