import React from "react";

const TradeSection = ({
  title,
  image,
  content,
  highlights = [],
  imageLeft = true,
}) => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 color-brand-heading">
          {title}
        </h2>

        {/* CONTENT */}
        <p className="text-gray-600 text-center max-w-5xl mx-auto leading-relaxed mb-12">
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

            <h3 className="text-3xl font-bold mb-4 color-brand-heading">
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