export interface Booking {
  id: number
  event_id: number
  user_id: string
  created_at: Date
}

export interface Event {
  id: number
  name: string
  total_seats: number
  created_at: Date
}

export interface EventWithAvailability extends Event {
  booked_seats: number
  available_seats: number
}

export interface BookingWithEvent extends Booking {
  event_name: string
  event_total_seats: number
}
