import { useNavigate } from "react-router-dom"
import { UrlState } from '../context/context';
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

function RequireAuth({children}) {
    const navigate = useNavigate()

    const {loading, isAuthenticated} = UrlState();

    useEffect(() => {
        if(!isAuthenticated && !loading){
            navigate("/auth");
        }
    }, [isAuthenticated, loading])
    
    if(loading) return <BarLoader width={"100%"} color="grey" />
    if(isAuthenticated) return children
}

export default RequireAuth
