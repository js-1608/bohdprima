import React from "react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
    return (

        <>

            {/* Header */}
            <div className="text-center mb-12 h-[400px] align-center justify-center bg-gradient-hero ">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold text-white">Contact Us</h1>
                    <p className="text-white mt-4 max-w-2xl mx-auto">
                        We would love to hear from you. Whether you are looking to import,
                        export, or collaborate with us, our team is ready to assist you.
                    </p>
                </div>
            </div>
            <section className="bg-gray-50 py-16 px-6 lg:px-20">
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Get in Touch
                            </h2>
                            <p className="text-gray-600">
                                Our export-import specialists are available to assist with product
                                inquiries, logistics, pricing, and partnerships.
                            </p>
                        </div>

                        <div className="space-y-6">

                            <div>
                                <h3 className="font-semibold text-gray-700">Office Address</h3>
                                <p className="text-gray-600">
                                    123 Trade Avenue
                                    <br />
                                    Dehradun, Uttarakhand, India
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700">Phone</h3>
                                <a href="tel:+919718667757" className="text-gray-600 hover:text-brand transition-colors">97186 67757</a>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700">Email</h3>
                                <a href="mailto:hello@bodhprima.com" className="text-gray-600 hover:text-brand transition-colors">hello@bodhprima.com</a>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700">Business Hours</h3>
                                <p className="text-gray-600">
                                    Monday – Friday : 9:00 AM – 6:00 PM
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white shadow-lg rounded-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Send Us a Message
                        </h2>

                       <ContactForm />
                    </div>

                </div>
            </section>
        </>
    );
};

export default Contact;