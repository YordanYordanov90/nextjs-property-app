import PropertyCard from "@/components/property-card";
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client";

import Link from 'next/link';

type Props = {
  searchParams: {
    location: string;
    propertyType: string;
  };
};

export default async function SearchResults({
  searchParams: { location = "", propertyType = "" },
}: Props) {
  
  const locationFilter = location
    ? {
        OR: [
          { city: { contains: location, mode: "insensitive" as Prisma.QueryMode } },
          { state: { contains: location, mode: "insensitive" as Prisma.QueryMode } },
          { street: { contains: location, mode: "insensitive" as Prisma.QueryMode } },
          { zipcode: { contains: location, mode: "insensitive" as Prisma.QueryMode } },
        ],
      }
    : {};

  
  const typeFilter =
    propertyType && propertyType !== "All" ? { type: propertyType } : {};

  // 2) Query the DB
  const results = await prisma.property.findMany({
    where: {
    AND: [
      locationFilter,
      typeFilter
    ]
    },
  });

  // 3) Render the results
  return (
    <section className="py-6 px-4">
      <h1 className="text-3xl text-center font-bold mb-6">Search Results</h1>
      {results.length === 0 ? (<>
        <p className='text-center'>No properties found for your search criteria.</p>
        <Link className='block text-center mt-4 border rounded-md border-gray-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-gray-700 w-fit mx-auto' href="/">Go back to home</Link>
      </>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
