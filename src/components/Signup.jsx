import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HashLoader, PacmanLoader } from "react-spinners";

function Signup() {
    return (
        <Card className="w-full">
            
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create your account quickly and securely.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Create a password" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" placeholder="Confirm your password" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className='w-full'>
                    {true?<HashLoader size={20} color="#111" />:"Sign Up"}
                </Button>
                <Button className='w-full' variant="outline">Cancel</Button>
            </CardFooter>
        </Card>
    );
}

export default Signup;
