"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-blue-500 py-4 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        {/* Logo */}
        <div className="mb-4 md:mb-0">
         
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation */}
        <div className="mb-4 flex flex-wrap justify-center md:mb-0 md:justify-start">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties" className=" hover:underline">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/terms" className=" hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div>
          <p className="mt-2 text-sm  md:mt-0">
            &copy; {new Date().getFullYear()} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
