import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import Image from 'next/image';
import UserLink from "./UserLink"; // adjust path if needed
import Hamburger from "./Hamburger";
import Link from 'next/link';



export default async function NavBar() {

    const session = await getServerSession(authOptions)

    const profile = session ? await getUserProfile(session?.user.token) : null;

    return (
        <nav className="grid grid-cols-12 gap-[15px] w-[1065px] mx-auto py-10 bg-transitive">
            {/* Left section: Logo */}
            <div className="col-span-5 flex items-center">
                <a href="/" className="text-white text-md font-bold">
                    HOTELIO
                </a>
            </div>

            {/* <div className="col-span-1 flex justify-center">
            </div> */}

            {/* Right section: Nav items */}

            <div className="col-span-7 flex justify-end">
                <ul className="flex space-x-14 items-center">
                    <li>
                        <Link href="/#about" scroll={true}>
                            <span className="font-sans font-semibold text-white hover:text-blue-300">
                                About
                            </span>
                        </Link>
                    </li>
                    <li>
                        <a href="/booking" className="font-sans font-semibold text-white hover:text-blue-300">
                            Booking
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
                                href="/register"
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