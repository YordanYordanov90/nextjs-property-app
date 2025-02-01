import { getSingleProperty } from "@/actions/property";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaMapMarker,
  FaTimes,
  FaCheck,
  FaBed,
  FaBath,
  FaRulerCombined,
} from "react-icons/fa";
import Gallery from "@/components/carousel";
import { DeletePropertyButton } from "../_components/delete-button";
import { auth } from "@clerk/nextjs/server";
import { BookmarkPropertyButton } from "../_components/bookmark-button";
import { prisma } from "@/lib/prisma";
import ContactForm from '@/components/contact-form.tsx';

type Props = {
  params: { id: string };
};

export default async function PropertyPage({ params }: Props) {
  const property = await getSingleProperty(params.id);

  const { userId: clerkId } = await auth();

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10 text-white">
        Property Not Found
      </h1>
    );
  }

  const isOwner = property.owner?.clerkId === clerkId;

  let isBookmarked = false;

  if (clerkId) {
    const userWithBookmarks = await prisma.user.findUnique({
      where: { clerkId: clerkId },
      select: {
        bookmarks: {
          where: { id: property.id },
          select: { id: true },
        },
      },
    });

    
    if (userWithBookmarks && userWithBookmarks.bookmarks.length > 0) {
      isBookmarked = true;
    }
  }

  const mainImage = property.images?.[0] || "/placeholder.jpg";

  const getRate = (rate?: number | null) => {
    if (!rate) return <FaTimes className="text-red-400 inline-block" />;
    return `$${rate.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/** HERO SECTION */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <Image
          src={mainImage}
          alt={property.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
          <h1 className="text-4xl font-bold mb-2">{property.name}</h1>
          <div className="flex items-center text-gray-200">
            <FaMapMarker className="text-blue-500 mr-2" />
            <p>
              {property.street}, {property.city}, {property.state}
            </p>
          </div>
        </div>
      </section>

      {/** BACK LINK */}
      <div className="container justify-between flex mx-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Properties
        </Link>
        <div className="flex items-center space-x-2">
          {!isOwner && (
            <BookmarkPropertyButton
              propertyId={property.id}
              initialBookmarked={isBookmarked}
            />
          )}

          
          {isOwner && (
            <div className="space-x-4">
              <Link
                href={`/properties/${property.id}/edit`}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                Edit Property
              </Link>
              <DeletePropertyButton propertyId={property.id} />
            </div>
          )}
        </div>
      </div>

      {/** MAIN CONTENT */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          {/** Left Column */}
          <div className="space-y-8">
            {/** Property Stats */}
            <div className="flex justify-center md:justify-start gap-8 p-6 bg-gray-900 rounded-xl">
              <div className="text-center">
                <div className="flex items-center text-2xl text-blue-500 mb-2">
                  <FaBed className="mr-2" />
                  {property.beds}
                </div>
                <p className="text-gray-400">Beds</p>
              </div>
              <div className="text-center">
                <div className="flex items-center text-2xl text-blue-500 mb-2">
                  <FaBath className="mr-2" />
                  {property.baths}
                </div>
                <p className="text-gray-400">Baths</p>
              </div>
              <div className="text-center">
                <div className="flex items-center text-2xl text-blue-500 mb-2">
                  <FaRulerCombined className="mr-2" />
                  {property.squareFeet}
                </div>
                <p className="text-gray-400">sq ft</p>
              </div>
            </div>

            {/** Rates */}
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-blue-500">Pricing</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400 mb-2">Nightly</p>
                  <p className="text-2xl font-bold">
                    {getRate(property.nightlyRate)}
                  </p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400 mb-2">Weekly</p>
                  <p className="text-2xl font-bold">
                    {getRate(property.weeklyRate)}
                  </p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400 mb-2">Monthly</p>
                  <p className="text-2xl font-bold">
                    {getRate(property.monthlyRate)}
                  </p>
                </div>
              </div>
            </div>

            {/** Description */}
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-blue-500">
                About this property
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {property.description || "No description provided."}
              </p>
            </div>

            {/** Amenities */}
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-blue-500">
                Amenities
              </h3>
              {property.amenities && property.amenities.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <FaCheck className="text-green-400" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No amenities listed</p>
              )}
            </div>

            {/* GALLERY SECTION */}
            {property.images && property.images.length > 1 && (
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6 text-blue-500">
                  Gallery
                </h3>
                {/* Use the client component */}
                <Gallery
                  images={property.images.slice(1)}
                  propertyName={property.name}
                />
              </div>
            )}
          </div>

          {/** Right Column */}
          <ContactForm property={property} />
        </div>
      </div>
    </div>
  );
}
