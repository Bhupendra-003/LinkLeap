import supabase from "./supabase";
import { UAParser } from "ua-parser-js";
export async function getCLick(urlId) {
    const { data, error } = await supabase.from('clicks').select('*').eq('url_id', urlId);
    if (error) {
        console.error("Error fetching clicks:", error);
        throw new Error("Unable to Load Clicks");
    }
    return data;
}

const parser = new UAParser();
export const storeClicks = async ({ id, original_url }) => {
    try {
        const res = parser.getResult()
        const device = res.type || "desktop"

        const response = await fetch('https://ipapi.co/json')
        const { city, country_name: country } = await response.json()

        await supabase.from("clicks").insert({
            url_id: id,
            city,
            country,
            device
        })

        window.location.href = original_url
    } catch (error) {
        console.log('Error Recording Click: ', error);
    }
}

export async function getClicksForUrl(url_id) {
    const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .eq("url_id", url_id);

    if (error) {
        console.error(error);
        throw new Error("Unable to load Stats");
    }

    return data;
}