import supabase from "@/db/supabase";

export async function login({email, password}){
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })
    
    
    if (error) {
        throw new Error(error.message);
    }
    else{
        return { data: data };
    }

}
export async function getCurrentUser() {
    const { data: session, err } = await supabase.auth.getSession();
    if(!session.session) return null;
    if(err) throw new Error(err.message);
    return session.session?.user;
}

export async function signup({name, email, password}){

    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name
            }
        }
    });
    if(error) throw new Error(error.message);
    return { data: data };
}

export async function logout(){
    const {error} = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
}
