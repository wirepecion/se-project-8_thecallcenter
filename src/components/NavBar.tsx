import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import Image from 'next/image';
import UserLink from "./UserLink"; // adjust path if needed
import Hamburger from "./Hamburger";


export default async function NavBar() {

    const session = await getServerSession(authOptions)

    const profile = session ? await getUserProfile(session?.user.token) : null;

    return (
        <nav className="grid grid-cols-12 max-w-[75%] mx-auto py-10 bg-transparent items-center text-Outfit">
            {/* Left section: Logo */}
            <div className="col-span-4">
                <a href="/" className="text-white text-md font-bold">
                    HotelBooking
                </a>
            </div>

            {/* Right section: Nav items */}
            <div className="col-span-8 flex justify-end">
                <ul className="flex space-x-6 items-center">
                    <li>
                        <a href="#" className="font-sans font-semibold text-white hover:text-blue-300">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="font-sans font-semibold text-white hover:text-blue-300">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="/hotel" className="font-sans font-semibold text-white hover:text-blue-300">
                            Explore Stay
                        </a>
                    </li>
                    <li>
                        {session ? (
                            <UserLink profile={profile.data} />
                        ) : (
                            <a
                                href="/signin"
                                className="border p-2 rounded-lg text-white font-sans font-semibold hover:bg-blue-300 hover:text-black whitespace-nowrap"
                            >
                                Sign-In / Register
                            </a>
                        )}
                    </li>
                    <li>{session ? <Hamburger profile={profile.data} /> : null}</li>
                </ul>
            </div>
        </nav>
    );
}