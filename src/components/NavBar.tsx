import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import Image from 'next/image';

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
                    session? <a href="/api/auth/signout" className="border p-2 rounded-lg items-center text-xs text-white font-sans font-semibold hover:bg-blue-300 hover:text-black whitespace-nowrap flex flex-row">
                            <Image src="/img/user.png" alt="user" width={0} height={0} className="user-img w-[20px] h-[20px] mr-2"></Image>
                            <span>
                                {profile.data.name}
                                <br/>
                                {profile.data.email}
                            </span>
                        </a>
                    : <a href="/api/auth/signin" className="border p-2 rounded-lg text-white font-sans font-semibold hover:bg-blue-300 hover:text-black whitespace-nowrap">
                        Sign-In / Register</a>
                }
            </li>
            </ul>
        </div>
        </nav>
    );
}