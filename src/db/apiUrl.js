import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

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
    try {
        console.log("Starting deleteUrl function for ID:", id);

        // 1. Fetch file name (short_url) before deleting the URL entry
        const { data: fileData, error: fileError } = await supabase
            .from('urls')  // Assuming 'urls' table stores short_url
            .select('short_url')
            .eq('id', id)
            .single();

        if (fileError) {
            console.error("Error fetching short_url:", fileError);
            throw fileError;
        }

        if (!fileData || !fileData.short_url) {
            console.warn("Short URL not found for ID:", id);
            throw new Error("Short URL not found");
        }

        console.log("Fetched short_url:", fileData.short_url);

        // 2. Delete the URL entry from 'urls' table
        console.log("Deleting URL entry from database...");
        const { data, error } = await supabase.from("urls").delete().eq("id", id);

        if (error) {
            console.error("Error deleting URL entry:", error);
            throw error;
        }

        console.log("URL entry deleted successfully:", data);

        // 3. Delete the corresponding QR file from Supabase Storage
        const filePath = `qr/qr-${fileData.short_url}`;
        console.log("Attempting to delete file from storage:", filePath);

        const { error: deleteError } = await supabase
            .storage
            .from('qr')  // Bucket name
            .remove([filePath]);

        if (deleteError) {
            console.error("Error deleting file from storage:", deleteError);
            throw deleteError;
        }

        console.log("File deleted successfully from storage:", filePath);
        console.log("URL and associated QR file deleted successfully");

        return data;
    } catch (err) {
        console.error("Error in deleteUrl function:", err.message);
        throw new Error("Unable to delete URL and file");
    }
}


export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
    const short_url = Math.random().toString(36).substring(2, 8)
    const fileName = `qr-${short_url}`
    const { error: stroageError } = await supabase.storage
        .from('qr')
        .upload(fileName, qrcode)

    if (stroageError) {
        throw new Error(`Storage Error: ${stroageError.message}`)
    }
    const qr = `${supabaseUrl}/storage/v1/object/public//qr/${fileName}`
    console.log('longUrl:', longUrl);
    const { data, error } = await supabase.from('urls').insert([
        {
            user_id,
            title,
            original_url: longUrl,
            custom_url: customUrl || null,
            short_url,
            qr
        }
    ]).select();

    if (error) {
        console.error(error.message);
        throw new Error("Error creating short URL")
    }
    return data
}

export async function getLongUrl(id) {
    let { data: shortLinkData, error: shortLinkError } = await supabase
        .from("urls")
        .select("id, original_url")
        .or(`short_url.eq.${id},custom_url.eq.${id}`)
        .single();

    if (shortLinkError && shortLinkError.code !== "PGRST116") {
        console.error("Error fetching short link:", shortLinkError);
        return;
    }

    return shortLinkData;
}

export async function getUrl({ id, user_id }) {
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("id", id)
        .eq("user_id", user_id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Short Url not found");
    }

    return data;
}