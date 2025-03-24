"use client";
import React from "react";

export default function InteractiveCard({ children, contentName }: { children: React.ReactNode; contentName: string }) {
    return (
        <div
            className="flex flex-wrap w-[250px] h-[300px] rounded-lg shadow-lg bg-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-neutral-200"
        >
            {children}
        </div>
    );
}
