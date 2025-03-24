import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import Image from 'next/image';
import UserLink from "./UserLink"; // adjust path if needed
import Hamburger from "./Hamburger";


export default async function NavBar() {

    const session = await getServerSession(authOptions)
    
    const profile = session? await getUserProfile(session?.user.token) : null;

    return (
        <nav className="bg-black p-4">
        <div className="max-w-screen flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="mr-8">
                <div className="text-white text-2xl font-bold">STGP</div> 
                <div className="text-white text-md">HotelBooking</div>
            </a>

            <ul className="flex space-x-8 items-center">
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
                {
                    session ? <UserLink profile={profile.data} /> : (
                        <a href="/api/auth/signin" className="border p-2 rounded-lg text-white font-sans font-semibold hover:bg-blue-300 hover:text-black whitespace-nowrap">
                          Sign-In / Register
                        </a>
                      )      
                }
            </li>
            <li> 
                
                {
                    session ? <Hamburger profile={profile.data} /> : ''
                }
            </li>
            </ul>
        </div>
        </nav>
    );
}