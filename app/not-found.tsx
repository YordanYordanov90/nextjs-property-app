import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center border rounded-lg border-gray-600 p-8">
        {/* Icon */}
        <FaExclamationTriangle className="mx-auto h-16 w-16 text-yellow-400" />

        {/* Title */}
        <h1 className="mt-6 text-4xl font-bold">Page Not Found</h1>

        {/* Description */}
        <p className="mt-2 mb-8 max-w-md text-gray-400 sm:mx-auto">
          The page you are looking for does not exist.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="rounded-md bg-gray-800 px-5 py-3 text-sm font-semibold 
                     text-white shadow-md transition hover:bg-gray-700"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
