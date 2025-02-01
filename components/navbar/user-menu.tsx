"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // If you have a utility for merging classNames

export function UserMenu() {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
         inline-flex items-center 
         px-3 py-2 
         text-sm font-medium 
         text-white
         hover:bg-blue-500
        
         rounded-md
       "
      >
        My Account
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#11181C] text-white">
        <DropdownMenuLabel className="text-gray-300">
          Dashboard
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />

        {/* Add Property */}

        {/* Listed Properties */}
        <DropdownMenuItem asChild>
          <Link
            href="/properties/listed-properties"
            className={cn(
              "block w-full px-3 py-2 rounded-md text-sm hover:bg-blue-600",
              pathname === "/properties/listed-properties"
                ? "bg-blue-500   text-white"
                : " "
            )}
          >
            Listed Properties
          </Link>
        </DropdownMenuItem>

        {/* Bookmarked Properties */}
        <DropdownMenuItem asChild>
          <Link
            href="/properties/bookmarked"
            className={cn(
              "block w-full px-3 py-2 rounded-md text-sm hover:bg-blue-600",
              pathname === "/properties/bookmarked"
                ? "bg-blue-500  text-white"
                : ""
            )}
          >
            Bookmarked Properties
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
