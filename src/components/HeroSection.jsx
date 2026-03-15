import React from "react";

const HeroSection = ({
  image,
  heading,
  subheading,
  buttonText,
  buttonLink = "#",
}) => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {heading}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
          {subheading}
        </p>

        {buttonText && (
          <a
            href={buttonLink}
            className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg text-lg font-semibold shadow-lg"
          >
            {buttonText}
          </a>
        )}

      </div>
    </section>
  );
};

export default HeroSection;