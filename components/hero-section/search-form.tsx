"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const existingLocation = searchParams.get("location") || "";
  const existingPropertyType = searchParams.get("propertyType") || "All";

  const [location, setLocation] = React.useState(existingLocation);
  const [propertyType, setPropertyType] = React.useState(existingPropertyType);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams({
      location: location,
      propertyType: propertyType,
    });
    console.log(params.toString());

    router.push(`/properties/search-results?${params.toString()}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-3 flex w-full max-w-2xl flex-col items-center md:flex-row"
    >
      <div className="mb-4 w-full md:mb-0 md:w-3/5 md:pr-2">
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location (City, State, Zip, etc)"
          className="w-full rounded-lg bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="w-full md:w-2/5 md:pl-2">
        <select
          id="property-type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full rounded-lg bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 md:mt-0 md:ml-4 md:w-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
