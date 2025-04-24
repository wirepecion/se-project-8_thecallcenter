// Hotel --------------------------------------------------------------------------
interface HotelItem {
  _id: string,
  name: string,
  address: string,
  tel: string,
  bookings: BookingItem[],
  rooms: RoomItem[],
  picture: string,
  id: string
}
  
interface HotelJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: HotelItem[]
}

interface HotelResponse {
  success: boolean,
  data: HotelItem
}
//---------------------------------------------------------------------------------

// Room ---------------------------------------------------------------------------
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
//---------------------------------------------------------------------------------

// Booking ------------------------------------------------------------------------
interface BookingItem {
  _id: string,
  checkInDate: string,
  checkOutDate: string,
  room: RoomItem,
  hotel: HotelItem,
  payments: PaymentItem[],
  user: UserItem,
  status: string,
  tierAtBooking: string
}
  
interface BookingJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: BookingItem[]
}

interface BookingJsonwithPopulate {
  success: boolean,
  count: number,
  pagination: Object,
  data: BookingWithPopulate
}

interface BookingWithPopulate {
  _id: string,
  checkInDate: string,
  checkOutDate: string,
  room: RoomItem,
  hotel: HotelItem,
  user: UserItem,
  status: string,
  payments: PaymentItemPopulate[],
}

interface BookingItemforPayment {
  _id: string,
  checkInDate: string,
  checkOutDate: string,
  room: RoomItem,
  hotel: HotelItem, 
  user: UserItem
}
//---------------------------------------------------------------------------------

// Payment ------------------------------------------------------------------------
interface PaymentItem {
  _id: string,
  booking: BookingItemforPayment, 
  user: UserItem, 
  // @ts-ignore
  amount: number,
  status: string,
  method: string,
  paymentDate?: Date,
  canceledAt?: Date | null,
}

interface PaymentJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: PaymentItem[]
}

interface PaymentJsonOne {
  success: boolean,
  count: number,
  pagination: Object,
  data: PaymentItem
}

interface PaymentCurrencyAmount {
  amount: number,  
  currency: string
}

interface PaymentItemPopulate {
  _id: string,
  booking: string, 
  amount: number,
  status: string,
  paymentDate?: Date,
}
//---------------------------------------------------------------------------------

// User ---------------------------------------------------------------------------
interface UserItem {
  _id: string,
  name: string,
  tel: string,
  email: string,
  role: string,
  credit?: number,
  membershipTier?: string,
  membershipPoints?: number,
  responsibleHotel?: string,
  createdAt: string
}

interface StatisticItem {
  _id: string,
  totalUsers: number
}

interface UsersJson {
  success: boolean,
  count: number,
  statistic: StatisticItem[]
  data: UserItem[]
}

interface UserJson {
  success: boolean,
  data: UserItem
}

interface FacilityItem {
  name: string,
  rank: string
}
//---------------------------------------------------------------------------------
