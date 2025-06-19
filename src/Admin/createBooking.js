import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createBooking = async (bookingData) => {
  try {
    const { data, error } = await supabase
      .from('appointments') // Make sure this matches your table name
      .insert([bookingData])
      .select()

    if (error) {
      throw error
    }

    return { data: data[0], error: null }
  } catch (error) {
    console.error('Error creating booking:', error)
    return { data: null, error: error.message }
  }
}

// Helper function to get all bookings
export const getAllBookings = async () => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return { data: null, error: error.message }
  }
}