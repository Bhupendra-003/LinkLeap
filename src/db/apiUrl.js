import supabase from "./supabase";

export async function getUrls(user_id) {
    const { data, error } = await supabase.from("urls").select('*').eq("user_id", user_id);
    if (error) {
        console.error("Error fetching URLs:", error);
        throw new Error("Unable to Load URL");
    }
    console.log("URls from apiUrl", data)
    return data;
}

export async function deleteUrl(id) {
    const { data, error } = await supabase.from("urls").delete().eq("id", id);
    if (error) {
        console.error("Error deleting URL:", error);
        throw new Error("Unable to Delete URL");
    }
    console.log("Url Deleted", data)
    return data;
}

export async function createUrl({ title, origianlUrl, customUrl, id }, qrcode) {
    const short_url = Math.random().toString(36).substring(2, 8)
    const fileName = `qr-${s}`
    const { error: stroageError } = await supabase.storage
        .from('qrs')
        .upload(fileName, qrcode)

    if (stroageError) {
        throw new Error(`Storage Error: ${stroageError.message}`)
    }
    const qr = `${supabase}/storage/v1/object/public/qrs/${filename}`
    const { data, error } = await supabase.from('urls').insert([
        {
            id,
            title, 
            original_url: origianlUrl, 
            custom_url: customUrl || null, 
            short_url,
            qr
        }
    ]).select(); 

    if(error) {
        console.error(error.message);
        throw new Error("Error creating short URL")
    }
    return data
    u
}