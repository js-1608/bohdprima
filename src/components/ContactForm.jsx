import React from "react";

const ContactForm = () => {
    return (
        <form className="space-y-5">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-accent outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                </label>
                <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                </label>
                <textarea
                    rows="4"
                    placeholder="Write your message"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
            </div>

            <button
                type="submit"
                className="py-3 px-6 lg:px-7 lg:py-3 text-sm bg-linear-to-r from-[#0f6b80] to-[#918d3e] hover:to-[#0f6b80] hover:from-[#918d3e] text-white rounded-full font-semibold flex items-center gap-2 transition cursor-pointer shadow-lg  ">
                Send Message
            </button>

        </form>
    )
}

export default ContactForm;