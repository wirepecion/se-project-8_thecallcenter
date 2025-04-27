import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/utils/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Outfit, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] });

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "HOTELIO",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const nextAuthSession = await getServerSession(authOptions)

  return (
    <html lang="en" className={`${outfit.variable} ${roboto.variable}`}>
      <body className="relative bg-white text-black font-roboto overflow-hidden">

        <div className="pointer-events-none absolute top-[-200px] left-[00px] w-[500px] h-[500px] bg-orange-200 rounded-full blur-[150px] z-0"></div>
        <div className="pointer-events-none absolute top-[200px] right-[-150px] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[130px] z-0"></div>


        <NextAuthProvider session={nextAuthSession}>
          <div className="relative z-20">
            <NavBar />
            <div className="p-4 pt-16"></div>
            {children}
          </div>
        </NextAuthProvider>
      </body>


    </html>
  );
}
