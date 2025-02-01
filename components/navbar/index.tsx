"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { UserMenu } from "./user-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const pathname = usePathname();

  const user = useUser();

  return (
    <nav className="border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 
                         hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset 
                         focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <IoMdClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <Image
                width={100}
                height={100}
                className="h-10 w-auto"
                src="/images/logo-white.png"
                alt="PropertyPulse"
              />
              <span className="hidden md:block ml-2 text-2xl font-bold text-white">
                PropertyPulse
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`rounded-md px-3 py-2 text-white ${
                    pathname === "/" ? "bg-blue-500" : "hover:bg-blue-500"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`rounded-md px-3 py-2 text-white ${
                    pathname === "/properties" ? "bg-blue-500" : "hover:bg-blue-500"
                  }`}
                >
                  Properties
                </Link>
                {user.isSignedIn && (
                  <Link
                    href="/properties/add-property"
                    className={`rounded-md px-3 py-2 text-white ${
                      pathname === "/properties/add-property"
                        ? "bg-blue-500"
                        : "hover:bg-blue-500"
                    }`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Clerk Auth and User Menu */}
          <div className="hidden md:ml-6 md:block">
            <div className="flex gap-2 items-center">
            <Link href='/messages' className='relative group'>
                <button
                  type='button'
                  className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='absolute -inset-1.5'></span>
                  <span className='sr-only'>View notifications</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </button>
                {/* <UnreadMessageCount /> */}
              </Link>
              <SignedOut>
                <button className="rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-gray-900 hover:text-white">
                  <SignInButton />
                </button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>

              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
        }`}
      >
        <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col">
          <Link
            href="/"
            className={`rounded-md px-3 py-2 text-white ${
              pathname === "/" ? "bg-gray-900" : "hover:bg-gray-800"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className={`rounded-md px-3 py-2 text-white ${
              pathname === "/properties" ? "bg-gray-900" : "hover:bg-gray-800"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Properties
          </Link>
          {user.isSignedIn && (
            <Link
              href="/properties/add-property"
              className={`rounded-md px-3 py-2 text-white ${
                pathname === "/properties/add-property"
                  ? "bg-gray-900"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Property
            </Link>
          )}

          {/* Clerk Auth (Mobile) */}
          <SignedOut>
            <button className="rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-gray-900 hover:text-white">
              <SignInButton />
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <UserMenu />
      </div>
    </nav>
  );
}
