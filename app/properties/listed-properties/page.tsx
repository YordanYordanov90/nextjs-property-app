import { findUserProperties } from "@/actions/property";
import PropertyCard from "@/components/property-card";
import React from "react";


const SavedProperties = async () => {
  const properties = await findUserProperties();

  return (
    <section className=" px-4 py-6">
      <h2 className="text-4xl font-bold text-center px-4 py-6">
        Listed Properties
      </h2>
      <div className="container-xl lg:container m-auto px-6 py-6">
        {properties.length === 0 ? (
          <p className="text-center">No properties found</p>
        ) : (
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.name} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
