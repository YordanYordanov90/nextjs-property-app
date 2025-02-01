"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface GalleryProps {
  images: string[];
  propertyName: string;
}

export default function Gallery({ images, propertyName }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Opens the modal/lightbox at a specific image index
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // Closes the modal
  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentIndex(null);
  };

  // Show the previous image
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  // Show the next image
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev! + 1) % images.length);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((imgUrl, idx) => (
        <div
          key={idx}
          className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
          onClick={() => openLightbox(idx)}
        >
          <Image
            src={imgUrl}
            alt={`Image ${idx + 1} of ${propertyName}`}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      ))}

      {/* Lightbox / Modal */}
      {isOpen && currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-blue-500 text-2xl"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>

          <div className="relative w-full max-w-3xl h-auto flex items-center justify-center px-4">
            {/* Prev button */}
            <button
              className="absolute left-4 text-blue-500 text-3xl p-2 z-50"
              onClick={showPrev}
            >
              <FaChevronLeft />
            </button>

            {/* The image itself */}
            <div className="relative w-full h-[60vh]">
              <Image
                src={images[currentIndex]}
                alt={`Modal Image ${currentIndex + 1} of ${propertyName}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Next button */}
            <button
              className="absolute right-4 text-blue-500 text-3xl p-2"
              onClick={showNext}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
