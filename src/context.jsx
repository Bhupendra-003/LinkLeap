import { getCurrentUser } from "@/db/apiAuth"
import useFetch from "@/hooks/use-fetch"
import { createContext, useContext, useEffect } from "react"

const UrlContext = createContext()

const UrlProvider = ({ children }) => {
    const {data: user, loading, fn: fetchUser } = useFetch(getCurrentUser)

    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        fetchUser()
    }, [])

    return <UrlContext.Provider value={{ isAuthenticated, user, loading, fetchUser }}>
        {children}
    </UrlContext.Provider>
}

export const UrlState = () => {
    return useContext(UrlContext);
}

export default UrlProvider