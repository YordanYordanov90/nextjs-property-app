"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProperty } from "@/actions/property";
import { toast } from "@/hooks/use-toast";

export function DeletePropertyButton({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDelete() {
   
    setShowConfirm(true);
  }

  function closeModal() {
    setShowConfirm(false);
  }

  async function confirmDelete() {
    
    startTransition(async () => {
      const result = await deleteProperty(propertyId);

      if (!result.success) {
        toast({
          title: "You are not authorized to delete this property.",
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.refresh();
        router.push("/properties");
        toast({
          title: "Property deleted successfully",
          description: "You have removed the property.",
        });
      }

      
      setShowConfirm(false);
    });
  }

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-500 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-red-600"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>

     
      {showConfirm && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal content container */}
          <div className="bg-white/80 text-black p-6 rounded-md shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
