import { getAllProperties } from '@/actions/property';
import PropertyCard from "@/components/property-card";

import Link from "next/link";

const HomePromerties = async () => {

  const property = await getAllProperties();
  
  return (
    <>
      <section className="px-4 py-6 ">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-4xl font-bold text-center px-4 py-6">
            Home Promerties
          </h2>
          {property.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {property.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 mt-2 rounded-lg"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomePromerties;
