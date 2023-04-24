import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
    const ok = api.restaurants.createRestaurant.useMutation();
    const getAllQuery = api.restaurants.getAll.useQuery();
    const deleteMutation = api.restaurants.delete.useMutation();

    const session = useSession();
    return (
        <>
            <Head>
                <title>Quest Eat</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    Aggiungi{" "}
                    <span className="text-[hsl(280,100%,70%)]">Ristorante</span>
                </h1>
                <h1>Ciao {session.data?.user.name}</h1>
                {session.data ? (
                    <button onClick={() => void signOut()}>Logout</button>
                ) : (
                    <button onClick={() => void signIn()}>Login</button>
                )}
                <button
                    onClick={() => {
                        ok.mutate({
                            name: "test",
                            address: "test",
                            phone: "test",
                            email: "a@a.com",
                            website: "https://test.com",
                            city: "test",
                            state: "test",
                            zip: 123,
                            lat: 0,
                            lng: 0,
                        });
                        void getAllQuery.refetch();
                    }}
                >
                    Aggiungi ristorante
                </button>
            </div>
            {getAllQuery.data
                ? getAllQuery.data.map((item) => {
                      return (
                          <div key={item.id}>
                              <p className="text-white">
                                  {item.name} {item.id} {item.email}
                              </p>
                              <button
                                  onClick={() => {
                                      void deleteMutation
                                          .mutateAsync({ id: item.id })
                                          .then(
                                              () => void getAllQuery.refetch()
                                          );
                                  }}
                              >
                                  Elimina
                              </button>
                          </div>
                      );
                  })
                : null}
        </>
    );
};

export default Home;
