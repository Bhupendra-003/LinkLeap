import { useState } from "react";

const useFetch = (cb, options = {}) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setloading] = useState(null)

    const fn = async (...args) => {
        try {
            setloading(true)
            setError(null)
            const res = await cb(options, ...args)
            setData(res)
        } catch (e) {
            setError(e)
        } finally {
            setloading(false)
        }
    };
    return {data,error,loading,fn}
}
export default useFetch;
