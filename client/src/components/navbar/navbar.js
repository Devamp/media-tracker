import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  HomeIcon,
  MusicalNoteIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./search";

const navigation = [
  {
    name: "Home",
    href: "/home",
    icon: <HomeIcon />,
  },
  {
    name: "My Log",
    href: "/mylog",
    icon: <MusicalNoteIcon />,
  },
];

export default function NavBar({ user }) {
  return (
    <nav className="bg-stone-300 p-4 pl-10 pr-10 flex items-center justify-between rounded-xl top-0 left-0 w-full z-50 shadow-md fixed">
      {/* Navigation Links */}
      <div className="flex items-center space-x-12">
        <Link href="/home">
          <Image alt="Logo" src="/TrackifyLogo.PNG" width={50} height={50} />
        </Link>
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className="size-6">
            {item.icon}
          </Link>
        ))}
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Profile & + Log Button */}
      <div className="flex items-center space-x-12">
        <Link href="/log">
          <button className="bg-[#2d5c7c] text-white px-4 py-2 rounded-xl font-bold">
            + Log
          </button>
        </Link>

        <Menu as="div" className="relative ml-3">
          {/* Profile Dropdown */}
          <div>
            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
              <Image
                alt="Profile Picture"
                src="/TemporaryPFP.PNG"
                width={40}
                height={40}
                className="size-10 rounded-full"
              />
            </MenuButton>
          </div>

          {/* Dropdown Items */}
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <MenuItem>
              <span className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                <p className="font-bold">{user ? user.id : "Undefined"}</p>
              </span>
            </MenuItem>
            <MenuItem>
              <span className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                <Link href="/login">Logout</Link>
              </span>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </nav>
  );
}
