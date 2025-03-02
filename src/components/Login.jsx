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
import {getCurrentUser, login} from "@/db/apiAuth";
import { useNavigate } from "react-router-dom";
import { UrlState } from "@/context/context";

function Login() {
    const [errors, setErrors] = React.useState([]);
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    const {data, error: fetchError, loading, fn: fnLogin} = useFetch(login, formData)
    const {fetchUser} = UrlState()
    const navigate = useNavigate();

    React.useEffect(() => {
        console.log("fetch data:", data);
        console.log("fetch error:", fetchError);
        if (fetchError) {
            setErrors({login: fetchError.message || "Login failed"});
        } else if (data && data.error) {
            setErrors({login: data.error.message || "Login failed"});
        }
        if(data && fetchError===null){ // if data is not null and fetchError is null, then login was successful
            console.log("data:", data);
            fetchUser();
            navigate("/dashboard");
            console.log("Login successful");
        }
    }, [data, fetchError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        console.log("Login button clicked");
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
            });
            await schema.validate(formData, { abortEarly: false });
            await fnLogin();
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
                console.log(err);
            });

            setErrors(newErrors);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Access your account securely.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
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
                <Button onClick={() => (handleLogin())} className='w-full'>
                    {loading ? <HashLoader size={20} color="#111" /> : "Sign In"}
                </Button>
                {errors.login ? <Error message={errors.login} /> : null}
                <Button className='w-full' variant="outline">Cancel</Button>
            </CardFooter>
        </Card>
    );
}


export default Login;
