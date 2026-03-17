import React from "react";

const TradeSection = ({
  title,
  image,
  content,
  highlights = [],
  imageLeft = true,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-green-700 to-yellow-500 bg-clip-text text-transparent">
          {title}
        </h2>

        {/* CONTENT */}
        <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-12">
          {content}
        </p>

        {/* GRID */}
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            imageLeft ? "" : "md:flex-row-reverse"
          }`}
        >

          {/* IMAGE */}
          <div className={`${imageLeft ? "" : "md:order-2"}`}>
            <img
              src={image}
              alt={title}
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          {/* TEXT */}
          <div className={`${imageLeft ? "" : "md:order-1"}`}>

            <h3 className="text-2xl font-bold mb-4">
              Key Trade Statistics
            </h3>

            <ul className="space-y-3">
              {highlights.map((item, index) => (
                <li key={index} className="text-gray-700 leading-relaxed">
                  <span className="font-semibold text-black">
                    {item.label}:
                  </span>{" "}
                  {item.value}
                </li>
              ))}
            </ul>

          </div>

        </div>
      </div>
    </section>
  );
};

export default TradeSection;