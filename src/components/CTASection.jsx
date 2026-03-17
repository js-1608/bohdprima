import { ArrowRight } from "lucide-react";
import ContactForm from "./ContactForm";
import Container from "../assets/container-image.png";
import react from "react";
const CTASection = () => {
    return (
        <section className="pb-20 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">

                <div className="relative bg-[#f3f5f7] backdrop-blur-sm rounded-[30px] shadow-lg px-10 py-16 md:px-16 grid md:grid-cols-2 items-center gap-10">

                    {/* LEFT CONTENT */}
                    <div>
                        <p className="text-sm tracking-widest text-blue-700 font-semibold uppercase mb-4">
                            Your Success, Our Commitment
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#1a2b3c] leading-tight mb-6">
                            Ready to Transform Your Trade?
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
                            At Bodh prima, we build global trade on trust and innovation.
                            Partner with us to enter a collaborative journey where your
                            success story is our guiding force. Transform challenges into
                            opportunities and unlock the potential of your local business on
                            the international stage. At Bodh prima, your success is our
                            commitment.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="border border-blue-500 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                                Explore Insights
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <div className="relative z-10">
                        <ContactForm />
                    </div>

                    {/* FLOATING CONTAINER IMAGE */}
                   

                </div>
            </div>
        </section>
    );
};

export default CTASection;



// import { Mail, Phone } from "lucide-react";
// import containerImg from "../assets/container-image.png";

// export default function CTASection() {
//   return (
//     <section className="relative min-h-screen bg-brand text-white overflow-hidden">

//       {/* container background */}
//       <img
//         src={containerImg}
//         className="absolute opacity-10 w-[1200px] top-[50px] pointer-events-none"
//         alt="container background"
//       />

//       {/* vertical stripes background */}
//       <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_2px,transparent_2px,transparent_40px)]"></div>

//       <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

//         {/* LEFT SIDE */}
//         <div>
//           <p className="text-sm text-gray-400 mb-4">Contact Us</p>

//           <h1 className="text-6xl font-bold leading-tight mb-12">
//             Count On Us <br /> For Answers
//           </h1>

//           <div className="flex gap-12 mt-10">

//             <div className="flex items-center gap-4">
//               <div className="bg-white/10 p-4 rounded-md">
//                 <Mail size={20} />
//               </div>

//               <div>
//                 <p className="text-gray-400 text-sm">E-mail Address</p>
//                 <p className="font-semibold">info@apexus.com</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="bg-white/10 p-4 rounded-md">
//                 <Phone size={20} />
//               </div>

//               <div>
//                 <p className="text-gray-400 text-sm">Phone Number</p>
//                 <p className="font-semibold">+123 - 456 - 789</p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* RIGHT FORM */}
//         <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl p-10 shadow-2xl">

//           {/* Tabs */}
//           <div className="flex mb-8 border-b border-white/10">
//             <button className="flex-1 pb-4 font-semibold text-white border-b-2 border-orange-500">
//               Request a Quote
//             </button>
//             <button className="flex-1 pb-4 text-gray-400">
//               Support Message
//             </button>
//           </div>

//           {/* FORM */}
//           <form className="space-y-5">

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 className="bg-black border border-white/10 rounded-lg p-4"
//                 placeholder="Enter your name"
//               />

//               <input
//                 className="bg-black border border-white/10 rounded-lg p-4"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 className="bg-black border border-white/10 rounded-lg p-4"
//                 placeholder="Enter weight in kg"
//               />

//               <select className="bg-black border border-white/10 rounded-lg p-4">
//                 <option>Choose type of service</option>
//                 <option>Air Freight</option>
//                 <option>Sea Freight</option>
//                 <option>Road Transport</option>
//               </select>
//             </div>

//             <select className="w-full bg-black border border-white/10 rounded-lg p-4">
//               <option>Choose pickup city</option>
//             </select>

//             <select className="w-full bg-black border border-white/10 rounded-lg p-4">
//               <option>Choose delivery city</option>
//             </select>

//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-lg font-semibold text-lg transition"
//             >
//               Send Request
//             </button>

//           </form>

//         </div>

//       </div>
//     </section>
//   );
// }