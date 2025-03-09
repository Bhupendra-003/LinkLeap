import supabase from "./supabase";

export async function getUrls(user_id){
    const {data, error} = await supabase.from("urls").select('*').eq("user_id", user_id);
    if (error) {
        console.error("Error fetching URLs:", error);
        throw new Error("Unable to Load URL");
    }
    console.log("URls from apiUrl", data)
    return data;
}

export async function deleteUrl(id){
    const {data, error} = await supabase.from("urls").delete().eq("id", id);
    if (error) {
        console.error("Error deleting URL:", error);
        throw new Error("Unable to Delete URL");
    }
    console.log("Url Deleted", data)
    return data;
}