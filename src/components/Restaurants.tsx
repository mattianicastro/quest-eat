import { Loader2 } from "lucide-react";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "./ui/card";

const Restaurants: React.FC = () => {
    const getAllQuery = api.restaurants.getOwn.useQuery({});
    const deleteMutation = api.restaurants.delete.useMutation();
    return (
        <>
            <div className="flex flex-row flex-wrap justify-center">
                {getAllQuery.data
                    ? getAllQuery.data.map((item) => {
                          return (
                              <Card key={item.id} className="m-5 w-80">
                                  <CardHeader>
                                      <CardTitle>{item.name}</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                      <p>{item.email}</p>
                                      <p>{item.phone}</p>
                                      <p>{item.id}</p>
                                  </CardContent>
                                  <CardFooter>
                                      {deleteMutation.isLoading &&
                                      deleteMutation.variables?.id ===
                                          item.id ? (
                                          <Loader2 className="animate-spin" />
                                      ) : (
                                          <Button
                                              variant={"destructive"}
                                              onClick={() => {
                                                  void deleteMutation
                                                      .mutateAsync({
                                                          id: item.id,
                                                      })
                                                      .then(() =>
                                                          getAllQuery.data?.splice(
                                                              getAllQuery.data.indexOf(
                                                                  item
                                                              ),
                                                              1
                                                          )
                                                      );
                                              }}
                                          >
                                              Elimina
                                          </Button>
                                      )}
                                  </CardFooter>
                              </Card>
                          );
                      })
                    : null}
            </div>
        </>
    );
};

export { Restaurants };
