import PropertyAddForm from '@/components/property-add-form'
import React from 'react'

const AddProperty = () => {
  return (
    <section className="relative min-h-screen bg-black/90">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay to make form more visible */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Form Container */}
      <div className="relative z-10 container mx-auto max-w-2xl min-h-screen flex items-center px-4">
        <div className="w-full bg-white/20 backdrop-blur-md px-8 py-10 my-4 rounded-2xl border border-gray-700/50 shadow-2xl ">
        
          <PropertyAddForm />
        </div>
      </div>
    </section>
  )
}

export default AddProperty