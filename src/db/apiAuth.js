import supabase from "@/db/supabase";

async function login({email, password}){
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })
    console.log("supabase response data:", data);
    console.log("supabase response error:", error);
    if (error) {
        return { error: error };
    }
    else{
        return { data: data };
    }

}

export default login;