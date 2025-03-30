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
import { HashLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { signup} from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

function Signup() {
    const [errors, setErrors] = React.useState([]);
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    const {data, error: fetchError, loading, fn: fnSignup} = useFetch(signup, formData)
    const {fetchUser} = UrlState();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const longlink = searchParams.get('createNew')

    React.useEffect(() => {
        
        
        if (fetchError) {
            setErrors({signup: fetchError.message || "Signup failed"});
        } else if (data && data.error) {
            setErrors({signup: data.error.message || "Signup failed"});
        }
        if(data && fetchError===null){ // if data is not null and fetchError is null, then Signup was successful
            
            
            navigate(`/dashboard?${longlink?`createNew=${longlink}` : ""}`);
            fetchUser()
            
        }
    }, [data, fetchError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async () => {
        
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
            });
            await schema.validate(formData, { abortEarly: false });
            await fnSignup();
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
                
            });

            setErrors(newErrors);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Sign up to Shortly.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input name='name' id="name" type="text" placeholder="Enter your Name"
                                onChange={handleInputChange}
                            />
                            {errors.name ? <Error message={errors.name} /> : null}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input name='email' id="email" type="email" placeholder="Enter your email"
                                onChange={handleInputChange}
                            />
                            {errors.email ? <Error message={errors.email} /> : null}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input name='password' id="password" type="password" placeholder="Enter your password"
                                onChange={handleInputChange}
                            />
                            {errors.password ? <Error message={errors.password} /> : null}
                        </div>
                        <div className="text-sm text-right">
                            <a href="#" className="text-white hover:underline">
                                Forgot password?
                            </a>  
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button onClick={() => (handleSignup())} className='w-full'>
                    {loading ? <HashLoader size={20} color="#111" /> : "Sign Up"}
                </Button>
                {errors.signup ? <Error message={errors.signup} /> : null}
                <Button className='w-full' variant="outline">Cancel</Button>
            </CardFooter>
        </Card>
    );
}


export default Signup;
