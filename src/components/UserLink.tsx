"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function UserLink({ profile }: { profile: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/api/auth/signout"
      className="border p-2 rounded-lg items-center text-xs text-white font-sans font-semibold hover:bg-white hover:text-black whitespace-nowrap flex flex-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={hovered ? "/img/userDark.png" : "/img/user.png"}
        alt="user"
        width={20}
        height={20}
        className="mr-2"
      />
      <span>
        {profile.name}
        <br />
        {profile.email}
      </span>
    </a>
  );
}
