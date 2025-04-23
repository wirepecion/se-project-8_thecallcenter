"use client"
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function FacilityCard ( { facilityItem } : { facilityItem: FacilityItem } ) {

    const getFacilityImage = (name: string) => {
      switch (name) { 
        case "Swimming Pool":
          return "https://drive.google.com/uc?id=1pspLQUKFAGQv6d8yGoPIM1IGoBaM5EsS";
        case "Car Park":
          return "https://drive.google.com/uc?id=18ccqOsMYP6T1ox5qvi_z4d7J1ICAJPRh";
        case "Gym":
          return "https://drive.google.com/uc?id=1GC8SXKEMvT2f9DBfm0FPrYpguf_59C-W";
        case "Breakfast":
          return "https://drive.google.com/uc?id=1ZJcfM5Gn5LHSecZTCM_2HFa5-_0QzukJ";
        case "Spa":
          return "https://drive.google.com/uc?id=1LFZpdtEZHUvYzl0EKysD9tCYHAr8U0m5";
        case "Wi-Fi":
          return "https://drive.google.com/uc?id=16vEZj_5vr38v_-FBsDu2JgFCxaFQ_aYG";
        case "Room Service":
          return "https://drive.google.com/uc?id=1LVb-L-zNpxxHrBADf_t6gSTQiO2UM4-7";
        case "Airport Shuttle":
          return "https://drive.google.com/uc?id=1kiPXBMShvkXGkyG0ajp6rjmsGkWw7B-Z";
        case "Restaurant":
          return "https://drive.google.com/uc?id=1c_AZ4eziDXvAJ1opw06ZqfuRcuzqsk4T";
        case "Bar":
          return "https://drive.google.com/uc?id=1_XxtqB5EEjFmmevP1KhLn2TEJVfUmT2J";
        case "Laundry":
          return "https://drive.google.com/uc?id=1mjx_Q28Zh6ZM3WGvpkPP5CQPpklzxgli";
        case "Kids Club":
          return "https://drive.google.com/uc?id=1YapCTyp6ILa9EfH3xy_mV7kDqRFoHpp7";
        case "Pet Friendly":
          return "https://drive.google.com/uc?id=1wwl_nBgGsv0JwAEWi5onORLhSyTCdSkO";
        case "Business Center":
          return "https://drive.google.com/uc?id=1IRVyq4BbOCxNWvJp3cU-FBXEv95EkcVl";
        case "Meeting Rooms":
          return "https://drive.google.com/uc?id=10QH-E7V9m3AHErwK-6LEGcjQgUEgz6fE";
        case "Beach Access":
          return "https://drive.google.com/uc?id=1m7Nr9xcoZSrdsLphDxTrSkDUvd8P8pJG";
        case "Valet Parking":
          return "https://drive.google.com/uc?id=1Cg-T5rwKbh76Wfs4DV9WDcRoRnzY_FVJ";
        case "Rooftop Lounge":
          return "https://drive.google.com/uc?id=1EIvJe-KHz7wnKZ9l82ZpIduIIxtRyZPK";
        default:
          return "https://drive.google.com/uc?id=1pspLQUKFAGQv6d8yGoPIM1IGoBaM5EsS";
      }
    }

    const getRankStyle = (rank: string | undefined) => {
        switch (rank) {
          case "bronze":
            return "text-orange-800 bg-orange-100";
          case "silver":
            return "text-gray-800 bg-gray-200";
          case "gold":
            return "text-yellow-500 bg-yellow-100";
          case "platinum":  
            return "text-blue-500 bg-blue-100";
          case "diamond":
            return "text-purple-500 bg-purple-100";
          case "unavailable":
            return "text-red-500 bg-red-100";
          default:
            return "text-white bg-gray-500";
        }
      };

    return (
        <InteractiveCard className={ facilityItem.name }>
            { <div className='w-full h-[180px] relative rounded-t-lg'>
                <Image src={getFacilityImage(facilityItem.name)}
                alt='Card'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div> }
            <div className='w-full h-[100px] text-center text-black bg-white rounded-b-lg p-3 shadow-md'>
                <div className='font-bold'>{facilityItem.name}</div>
                <div className={`rounded-xl p-1 px-2 mt-3 inline-block ${getRankStyle(facilityItem.rank)}`}>{facilityItem.rank} {facilityItem.rank === "none" || facilityItem.rank === "unavailable" ? "" : "+"}</div>
            </div>
        </InteractiveCard>
    );
}