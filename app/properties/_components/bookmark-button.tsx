"use client";

import { useState, useTransition } from "react";
import { bookmarkProperty } from "@/actions/property";
import { toast } from "@/hooks/use-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface BookmarkButtonProps {
  propertyId: string;
  initialBookmarked: boolean; // new prop
}

export function BookmarkPropertyButton({
  propertyId,
  initialBookmarked,
}: BookmarkButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  async function handleClick() {
    startTransition(async () => {
      const result = await bookmarkProperty(propertyId);
      if (!result.success) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      // Toggle the local state
      setIsBookmarked((prev) => !prev);

      toast({
        title: isBookmarked ? "Bookmark removed" : "Property saved",
        description: isBookmarked
          ? "You have unbookmarked this property."
          : "You have bookmarked this property.",
      });
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-4 py-2 flex items-center justify-center text-sm gap-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      {isPending ? (
        "Saving..."
      ) : isBookmarked ? (
        <>
          <FaBookmark />
          Bookmarked
        </>
      ) : (
        <>
          <FaRegBookmark />
          Bookmark
        </>
      )}
    </button>
  );
}
