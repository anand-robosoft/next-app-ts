import React from "react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Link href={"/"}>Home</Link>
            {children}
        </>
    );
};