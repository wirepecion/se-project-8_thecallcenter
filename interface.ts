interface HotelItem {
    _id: string,
    name: string,
    address: string,
    tel: string,
    id: string
  }
  
  interface VenueJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
  }