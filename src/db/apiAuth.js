import supabase from "@/db/supabase";

export async function login({email, password}){
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
export async function getCurrentUser() {
    const { data: session, err } = await supabase.auth.getSession();
    if(!session.session) return null;
    if(err) return { error: err };
    return session.session?.user;
}
