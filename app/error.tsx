"use client";
import { FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* Icon */}
        <FaExclamationCircle className="mx-auto h-16 w-16 text-red-500" />

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold">Something Went Wrong</h1>

        {/* Error Description */}
        <p className="mt-2 mb-8 max-w-md text-gray-400 sm:mx-auto">
          {error?.message || "An unknown error occurred."}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-block rounded-md bg-gray-800 px-5 py-3 text-sm font-semibold 
                       text-white shadow-md transition hover:bg-gray-700"
          >
            Go Home
          </Link>

          <button
            onClick={reset}
            className="inline-block rounded-md border border-gray-600 bg-transparent px-5 py-3 
                       text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}
