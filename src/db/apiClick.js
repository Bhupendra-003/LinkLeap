import supabase from "./supabase";

export async function getCLick(urlId){
    const {data, error} = await supabase.from('clicks').select('*').eq('url_id', urlId);
    if(error){
        console.error("Error fetching clicks:", error);
        throw new Error("Unable to Load Clicks"); 
    }
    return data;
}