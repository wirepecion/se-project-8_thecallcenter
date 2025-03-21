interface BookingItem {
  _id: string,
  checkInDate: string,
  checkOutDate: string,
  hotel: string
}
  
interface BookingJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: BookingItem[]
}

interface UnavailablePeriod {
  startDate: string,
  endDate: string,
  _id: string
}

interface RoomItem {
  _id: string,
  hotel: string,
  type: string,
  number: number,
  price: number,
  unavailablePeriod: UnavailablePeriod[]
}
  
interface RoomJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: RoomItem[]
}

interface HotelItem {
  _id: string,
  name: string,
  address: string,
  tel: string,
  id: string
}
  
interface HotelJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: HotelItem[]
}
