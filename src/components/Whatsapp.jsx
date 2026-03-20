import React from "react";
import { BsWhatsapp } from "react-icons/bs";
const Whatsapp = () => {

  const phoneNumber = "919718667757";
  const message = "Hello, I am looking for Import & Export services.";
  
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition z-50"
    >
      <BsWhatsapp size={24} />
    </a>
  );
};

export default Whatsapp;