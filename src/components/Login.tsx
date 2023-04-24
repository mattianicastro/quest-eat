import { signIn } from "next-auth/react";
import {
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
    Card,
    CardContent,
} from "./ui/card";
import { Button } from "./ui/button";

const Login: React.FC = () => {
    return (
        <>
            <div className="min-w-screen flex min-h-[calc(100vh-56px)] items-center justify-center">
                <Card className="w-[380px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">Bentornato</CardTitle>
                        <CardDescription className="text-xl">
                            Accedi per continuare
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button
                            className=""
                            onClick={() => {
                                void signIn("google");
                            }}
                        >
                            Continua con Google
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export { Login };
