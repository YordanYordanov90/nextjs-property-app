import { DeletePropertyButton } from "@/app/properties/_components/delete-button";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined, FaMapMarker } from "react-icons/fa";

 export type PropertyProps = {
  property: {
    id: string;
    name: string;
    type: string;
    description: string | null;

    street: string;
    city: string;
    state: string;
    zipcode: string;

    images: string[];
    beds: number;
    baths: number;
    squareFeet: number;
    amenities: string[];

    monthlyRate?: number | null;
    weeklyRate?: number | null;
    nightlyRate?: number | null;

    sellerName?: string | null;
    sellerEmail?: string | null;
    sellerPhone?: string | null;
  };

};

const PropertyCard = async ({ property }: PropertyProps) => {
  const getRateDisplay = () => {
    if (property.monthlyRate) {
      return `$${property.monthlyRate.toLocaleString()}/mo`;
    } else if (property.weeklyRate) {
      return `$${property.weeklyRate.toLocaleString()}/wk`;
    } else if (property.nightlyRate) {
      return `$${property.nightlyRate.toLocaleString()}/night`;
    }
    return "N/A";
  };

  // const user = await auth();

  return (
    <>
      <div className="bg-[#1B1B1B] rounded-xl shadow-lg overflow-hidden relative transition-transform transform hover:scale-110  hover:shadow-xl">
        {/* Property Image */}
        <Link href={`/properties/${property.id}`}>
          <Image
            src={property.images[0]}
            alt={property.name}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-48 object-cover"
          />
        </Link>

        {/* Card Content */}
        <div className="p-6">
          {/* Property Type and Name */}
          <div className="mb-2 flex items-center space-x-3">
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              {property.type}
            </p>
          </div>
          <h3 className="text-2xl font-bold text-white">{property.name}</h3>

          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            {getRateDisplay()}
          </div>

          {/* Property Details */}
          <div className="flex justify-between text-gray-400 text-sm my-4">
            <p className="flex items-center gap-1">
              <FaBed className="text-gray-500" /> {property.beds} Beds
            </p>
            <p className="flex items-center gap-1">
              <FaBath className="text-gray-500" /> {property.baths} Baths
            </p>
            <p className="flex items-center gap-1">
              <FaRulerCombined className="text-gray-500" />{" "}
              {property.squareFeet} sqft
            </p>
          </div>

          {/* Divider */}
          <hr className="border-t border-gray-700 my-4" />

          {/* Location and Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-400">
              <FaMapMarker className="text-red-500 " />
              <span>
                {property.city}, {property.state}
              </span>
            </div>
            {/* Details Button */}
            <div className="space-x-2">
              <Link
                href={`/properties/${property.id}`}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                View Details
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
