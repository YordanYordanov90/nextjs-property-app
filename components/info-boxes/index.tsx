"use client";

import Link from "next/link";
import React from "react";
import InfoBox from "../info-box";

export default function InfoBoxes() {
  return (
    <section>
      <div className="container m-auto lg:container-xl">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
         
          <InfoBox
            background="bg-[#0B1215]"
            name="For Renters"
            description="Find the perfect rental property that suits your needs."
            link="Find Properties"
            href="/properties"
          />
          <InfoBox
            background="bg-[#0B1215]"
            name="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an
              airbnb or long term.."
            link="Add Property"
            href="/properties/add-property"
          />
        </div>
      </div>
    </section>
  );
}
