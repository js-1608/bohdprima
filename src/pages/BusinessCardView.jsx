import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Facebook,
  Download,
  Share2,
  AlertCircle,
} from "lucide-react";
import { getCardBySlug, resolveMediaUrl } from "../lib/api";

// ─── SVG Logo of Bodh Prima (Teal 'B' intertwined with Gold '1') ───────────────
const BPLogo = ({
  className = "w-20 h-20",
  tealColor = "#003b46",
  goldColor = "#c59b27",
}) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Teal B with transparent holes via evenodd fill rule */}
    <path
      d="M 28 25 H 68 C 79 25, 87 32, 87 43 C 87 51, 80 57, 72 59 C 81 61, 89 68, 89 80 C 89 91, 80 98, 68 98 H 28 V 66 H 15 V 56 H 28 Z M 40 34 H 60 C 65 34, 69 38, 69 43 C 69 48, 65 51, 60 51 H 40 Z M 40 60 H 60 C 65 60, 71 64, 71 70 C 71 76, 65 89, 60 89 H 40 Z"
      fill={tealColor}
      fillRule="evenodd"
    />
    {/* Gold Intertwined '1' */}
    <path
      d="M 52 18 C 44 21, 38 26, 38 32 H 52 V 93 H 44 V 102 H 72 V 93 H 64 V 18 Z"
      fill={goldColor}
    />
  </svg>
);

// ─── Font Styles + 3D Flip CSS ──────────────────────────────────────────────────
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  
  .font-cinzel {
    font-family: 'Cinzel', serif;
  }
  .font-jakarta {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  
  .card-perspective {
    perspective: 1800px;
  }
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
  }
  .card-inner.flipped {
    transform: rotateY(180deg);
  }
  .card-face {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .card-face-back {
    transform: rotateY(180deg);
  }
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("card-fonts-and-texture")
) {
  const style = document.createElement("style");
  style.id = "card-fonts-and-texture";
  style.innerHTML = fontStyles;
  document.head.appendChild(style);
}

// ─── Helper: resolve logo source from backend ────────────────────────────────
const getLogoSrc = (card) => {
  if (card.logoUrl) return card.logoUrl;
  if (card.logo) return resolveMediaUrl(card.logo);
  return null;
};

// ─── Reusable Logo renderer (image from backend or SVG fallback) ──────────────
const CardLogo = ({ card, className = "w-[72px] h-[72px]", tealColor = "#003b46", goldColor = "#c59b27" }) => {
  const logoSrc = getLogoSrc(card);
  if (logoSrc) {
    return <img src={logoSrc} alt={card.company || "Logo"} className={`${className} object-contain`} />;
  }
  return <BPLogo className={className} tealColor={tealColor} goldColor={goldColor} />;
};

// ─── Front Side Component ─────────────────────────────────────────────────────
const CardFront = ({ card }) => {
  const name = card.name || "ISHTIAQ AHMAD";
  const title = card.title || "Partner & CMO";
  const phone = card.phone || "+91 - 97186 67757";
  const company = card.company || "EXPORTS & IMPORTS";
  const logoSrc = getLogoSrc(card);

  return (
    <div className="card-face relative h-full w-full overflow-hidden rounded-[16px] bg-white shadow-2xl">
      {/* Large watermark logo faded on right */}
      <div className="absolute right-[-20px] top-[10px] opacity-[0.06] pointer-events-none">
        {logoSrc ? (
          <img src={logoSrc} alt="" className="w-[280px] h-[280px] object-contain" />
        ) : (
          <BPLogo
            className="w-[280px] h-[280px]"
            tealColor="#003b46"
            goldColor="#003b46"
          />
        )}
      </div>

      {/* Bottom decorative curves */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 600 110"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Teal wave */}
        <path d="M0 50C120 110 280 105 600 55V110H0V50Z" fill="#003b46" />
        {/* Gold wave (layered on top, thinner) */}
        <path d="M0 72C150 115 320 115 600 80V110H0V72Z" fill="#c59b27" />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 pb-16">
        {/* TOP ROW: Logo left, Company right */}
        <div className="flex items-start justify-between">
          {/* Left side - Logo + Brand name */}
          <div>
            <CardLogo card={card} className="w-[72px] h-[72px]" />
            <div className="mt-1 flex items-end gap-[3px]">
              <span className="font-cinzel text-[32px] font-black leading-none text-[#003b46]">
                Bodh
              </span>
              <span className="font-cinzel text-[32px] font-black leading-none text-[#c59b27]">
                prima
              </span>
            </div>
          </div>

          {/* Right side - Company subtitle */}
          <div className="text-right pt-2">
            <p className="font-jakarta text-[11px] font-bold tracking-[0.2em] uppercase text-[#003b46]">
              {company}
            </p>
            <div className="ml-auto mt-2 h-[2px] w-24 bg-[#c59b27]" />
          </div>
        </div>

        {/* BOTTOM RIGHT: Name, Role, Phone */}
        <div className="flex justify-end mt-auto">
          <div className="text-right max-w-[260px]">
            {/* Name row */}
            <div className="flex items-center justify-end gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#003b46] text-[#003b46]">
                <svg
                  className="w-[18px] h-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="font-jakarta text-[22px] font-extrabold uppercase tracking-wide leading-none text-[#003b46]">
                {name}
              </h2>
            </div>

            {/* Role */}
            <p className="mt-1 text-[15px] font-semibold text-[#c59b27] font-jakarta">
              {title}
            </p>

            {/* Divider */}
            <div className="ml-auto mt-3 mb-3 h-[2px] w-20 bg-[#c59b27]" />

            {/* Phone */}
            <div className="flex items-center justify-end gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#003b46] text-[#003b46]">
                <Phone size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-bold text-[#003b46] font-jakarta">
                {phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Back Side Component ──────────────────────────────────────────────────────
const CardBack = ({ card }) => {
  const website = card.website || "www.bodhprima.com";
  const facebook =
    card.socialLinks?.facebook || "facebook.com/bodhprima";
  const email = card.email || "Bodhprima@hotmail.com";
  const address =
    card.address ||
    "Krishna Nagar, Safdarjung Enclave, New Delhi, INDIA";

  return (
    <div className="card-face card-face-back relative h-full w-full overflow-hidden rounded-[16px] shadow-2xl">
      {/* Full teal background */}
      <div className="absolute inset-0 bg-[#003b46]" />

      {/* White geometric area (bottom-left corner with diamond shapes) */}
      <svg
        className="absolute bottom-0 left-0 w-[50%] h-full pointer-events-none"
        viewBox="0 0 300 320"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Main white area */}
        <path d="M0 0H220L160 320H0V0Z" fill="white" />
        {/* Small geometric diamonds/triangles as decorative accents */}
        <path d="M220 0L160 320L200 320L260 0Z" fill="rgba(197, 155, 39, 0.15)" />
        <path d="M160 320L210 160L190 320Z" fill="rgba(0, 59, 70, 0.06)" />
        <path d="M100 280L140 220L130 300L90 320H70L100 280Z" fill="rgba(0, 59, 70, 0.04)" />
      </svg>

      {/* Gold diagonal divider line */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 550 320"
        preserveAspectRatio="none"
      >
        <path d="M340 0L230 320" stroke="#c59b27" strokeWidth="3" />
      </svg>

      {/* Large watermark logo on right side */}
      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 pointer-events-none">
        {getLogoSrc(card) ? (
          <img src={getLogoSrc(card)} alt="" className="w-[260px] h-[260px] object-contain opacity-30" />
        ) : (
          <BPLogo
            className="w-[260px] h-[260px]"
            tealColor="rgba(255,255,255,0.12)"
            goldColor="#c59b27"
          />
        )}
      </div>

      {/* Content Layout */}
      <div className="relative z-10 flex h-full font-jakarta">
        {/* LEFT SIDE - Contact details */}
        <div className="flex w-[55%] flex-col justify-center gap-[14px] pl-6 pr-2">
          {/* Website */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003b46] text-white">
              <Globe size={17} />
            </div>
            <span className="text-[14px] font-semibold text-[#003b46]">
              {website}
            </span>
          </div>

          {/* Separator */}
          <div className="h-[1px] w-[80%] bg-[rgba(197,155,39,0.3)]" />

          {/* Facebook */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003b46] text-white">
              <Facebook size={17} />
            </div>
            <span className="text-[13px] font-semibold text-[#003b46]">
              {facebook}
            </span>
          </div>

          {/* Separator */}
          <div className="h-[1px] w-[80%] bg-[rgba(197,155,39,0.3)]" />

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003b46] text-white">
              <Mail size={17} />
            </div>
            <span className="text-[13px] font-semibold text-[#003b46]">
              {email}
            </span>
          </div>

          {/* Separator */}
          <div className="h-[1px] w-[80%] bg-[rgba(197,155,39,0.3)]" />

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003b46] text-white">
              <MapPin size={17} />
            </div>
            <span className="max-w-[200px] text-[12px] font-semibold leading-snug text-[#003b46]">
              {address}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE - QR Code */}
        <div className="flex w-[45%] items-center justify-center">
          <div className="rounded-[16px] border-[3px] border-[#c59b27] bg-white p-3 shadow-xl">
            <QRCode
              value={typeof window !== "undefined" ? window.location.href : ""}
              size={120}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
              }}
              viewBox="0 0 256 256"
            />
            <p className="mt-2 text-center text-[11px] font-bold text-[#003b46]">
              WhatsApp contact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main View Component ──────────────────────────────────────────────────────
export default function BusinessCardView() {
  const { slug } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareSuccess, setShareSuccess] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [scale, setScale] = useState(1);

  // Responsive Scaling Logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setScale((width - 32) / 550);
      } else {
        setScale(1);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getCardBySlug(slug);
        setCard(data);
      } catch (err) {
        setError(err.message || "Failed to load business card");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [slug]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("business-card-print-container");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#1a1e24",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 3, canvas.height / 3],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 3, canvas.height / 3);
      pdf.save(
        `${card.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-card.pdf`
      );
    } catch (err) {
      console.error("PDF generation error:", err);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.name} - Digital Business Card`,
          text: `Check out ${card.name}'s digital business card.`,
          url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err) {
        console.error("Clipboard copy error:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1e24]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-[#c59b27]" />
          <p className="text-sm font-semibold text-slate-400">
            Loading virtual card...
          </p>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#1a1e24] p-4 text-center">
        <div className="max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
            <AlertCircle size={32} />
          </div>
          <h1 className="mt-6 text-xl font-bold text-white">Card Not Found</h1>
          <p className="mt-2 text-sm text-slate-400">
            {error ||
              "The virtual business card you are looking for does not exist or has been removed."}
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex rounded-xl bg-[#c59b27] px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-[#c59b27]/90 transition"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-[#1a1e24] transition-colors duration-500">
      {/* 3D Flip Card Container */}
      <div
        className="flex items-center justify-center transition-all duration-300"
        style={{ height: `${320 * scale}px`, width: `${550 * scale}px` }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            width: "550px",
            height: "320px",
          }}
          className="card-perspective cursor-pointer shrink-0"
          onClick={() => setFlipped(!flipped)}
        >
          <div className={`card-inner ${flipped ? "flipped" : ""}`}>
            {/* Front Face */}
            <CardFront card={card} />

            {/* Back Face */}
            <CardBack card={card} />
          </div>
        </div>
      </div>

      {/* Tap-to-flip hint */}
      <p className="mt-5 text-[11px] font-semibold text-slate-500 tracking-[0.2em] uppercase animate-pulse select-none font-jakarta">
        Tap card to flip
      </p>

      {/* Actions Panel */}
      <div className="mt-6 flex items-center justify-center gap-4 w-full max-w-[320px] font-jakarta">
        <button
          onClick={handleDownloadPDF}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#003b46] text-white hover:bg-[#004d5a] active:scale-95 py-3.5 text-sm font-bold shadow-lg transition"
        >
          <Download size={16} />
          Download PDF
        </button>
        <button
          onClick={handleShare}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition shadow-sm"
          title="Share Card"
        >
          <Share2 size={18} />
        </button>
      </div>

      {shareSuccess && (
        <div className="fixed bottom-6 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xl animate-bounce font-jakarta">
          Link copied to clipboard!
        </div>
      )}

      {/* Hidden Print Wrapper (Stacked Layout for PDF generation) */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <div
          id="business-card-print-container"
          className="w-[600px] p-6 bg-[#1a1e24] flex flex-col gap-6 items-center justify-center"
        >
          <div className="w-[550px] h-[320px] relative">
            <CardFront card={card} />
          </div>
          <div className="w-[550px] h-[320px] relative">
            <CardBack card={card} />
          </div>
        </div>
      </div>
    </div>
  );
}
