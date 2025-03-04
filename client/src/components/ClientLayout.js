"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar/navbar";

export default function ClientLayout({ user, children }) {
  const pathname = usePathname();

  const hideNavBarPaths = ["/", "/login", "/signup"];

  return (
    <>
      {!hideNavBarPaths.includes(pathname) && <NavBar user={user} />}
      {children}
    </>
  );
}
