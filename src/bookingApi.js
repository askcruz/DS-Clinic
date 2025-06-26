import { supabase } from './supabaseClient';

export async function createBooking(bookingData) {
    const { data, error } = await supabase
        .from('booking') // your Supabase table name
        .insert([bookingData])
        .select();

    return { data, error };
}
