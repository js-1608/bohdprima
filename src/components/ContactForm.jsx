import { useState } from "react";
import { createLead } from "../lib/api";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFeedback({ type: "", message: "" });

        try {
            await createLead({
                ...formData,
                source: "website-contact-form",
            });

            setFeedback({
                type: "success",
                message: "Your enquiry has been sent. We will contact you shortly.",
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            setFeedback({
                type: "error",
                message: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-accent outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                </label>
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                </label>
                <textarea
                    name="message"
                    rows="4"
                    placeholder="Write your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            {feedback.message ? (
                <p className={`rounded-lg px-4 py-3 text-sm ${feedback.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                    {feedback.message}
                </p>
            ) : null}

            <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 lg:px-7 lg:py-3 text-sm bg-linear-to-r from-[#0f6b80] to-[#918d3e] hover:to-[#0f6b80] hover:from-[#918d3e] text-white rounded-full font-semibold flex items-center gap-2 transition cursor-pointer shadow-lg disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>

        </form>
    )
}

export default ContactForm;