import React from "react";
import SearchForm from "./search-form";

export default function HeroSection() {
  return (
    <section className=" py-20 mb-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find The Perfect Rental
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <SearchForm />
      </div>
    </section>
  );
}
