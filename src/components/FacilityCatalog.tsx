"use client"

import { useEffect, useState } from "react";
import FacilityCard from "./FacilityCard";
import getUserProfile from "@/libs/Auth/getUserProfile";
import { useSession } from "next-auth/react";

export default function FacilityCatalog({ facilities }: { facilities?: FacilityItem[] }) {

    const { data: session } = useSession();
    const [onFilter , setOnFilter] = useState(false);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);

    useEffect(() => {
        async function fetchData() {
          if (!session?.user?.token) return;
          const profile = await getUserProfile(session.user.token);
          setUserProfile(profile.data);
        }
        fetchData();
    }, [session]);

    const getRankValue = (rank: string) => {
        switch (rank) {
            case 'bronze':
                return 1;
            case 'silver':
                return 2;
            case 'gold':
                return 3;
            case 'platinum':
                return 4;
            case 'diamond':
                return 5;
            default:
                return 0;
        }
    }

    const sortedFacilities = (facilities: FacilityItem[]) => {
        return facilities.sort((a, b) => getRankValue(a.rank) - getRankValue(b.rank))
    };
    
    const filteredFacilities = (facilities: FacilityItem[]) => {
        return sortedFacilities(facilities).filter(facility => {
            if (onFilter && facility.rank === 'bronze' && userProfile?.membershipTier === 'none' ) {
                return false;
            }
            if (onFilter && facility.rank === 'silver' && userProfile?.membershipTier === 'bronze') {
                return false;
            }
            if (onFilter && facility.rank === 'gold' && (userProfile?.membershipTier === 'bronze' || userProfile?.membershipTier === 'silver')) {
                return false;
            }
            if (onFilter && facility.rank === 'platinum' && (userProfile?.membershipTier === 'bronze' || userProfile?.membershipTier === 'silver' || userProfile?.membershipTier === 'gold')) {
                return false;
            }
            if (onFilter && facility.rank === 'diamond' && (userProfile?.membershipTier === 'bronze' || userProfile?.membershipTier === 'silver' || userProfile?.membershipTier === 'gold' || userProfile?.membershipTier === 'platinum')) {
                return false;
            }
            return true;
        }
    )}

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div className="flex items-center justify-between col-span-full mb-4">
                <button
                    onClick={() => setOnFilter(!onFilter)}
                    className={`px-4 py-2 rounded-lg ${onFilter ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    {onFilter ? 'Show All' : 'Show Allowed Facilities Only'}
                </button>
            </div>
            {filteredFacilities.length > 0 ? (
                filteredFacilities(facilities || []).map((facilityItem: FacilityItem) => (
                    facilityItem.rank === 'unavailable' ? null : (
                        <FacilityCard key={facilityItem.name} facilityItem={facilityItem} />
                    )
                ))
            ) : (
                <p className="text-gray-500 text-center w-full py-4 col-span-full">
                    No facilities available.
                </p>
            )}
        </div>
    );
}
