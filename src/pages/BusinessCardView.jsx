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

// ─── Theme Color System ────────────────────────────────────────────────────────
const THEME_PALETTES = {
  "bodh-prima": {
    primary: "#003b46",
    accent: "#c59b27",
    bgPage: "#1a1e24",
    bgCard: "#ffffff",
    bgCardBack: "#ffffff",
    textPrimary: "#003b46",
    textAccent: "#c59b27",
    wavePrimary: "#003b46",
    waveAccent: "#c59b27",
    iconBg: "#003b46",
    iconText: "#ffffff",
    brandFirst: "#003b46",
    brandSecond: "#c59b27",
    qrBorder: "#c59b27",
    dividerLine: "#c59b27",
    separatorColor: "rgba(197,155,39,0.3)",
  },
  "modern-dark": {
    primary: "#1a1a2e",
    accent: "#e4af47",
    bgPage: "#0f0f1a",
    bgCard: "#1a1a2e",
    bgCardBack: "#1a1a2e",
    textPrimary: "#f0f0f0",
    textAccent: "#e4af47",
    wavePrimary: "#16213e",
    waveAccent: "#e4af47",
    iconBg: "#e4af47",
    iconText: "#1a1a2e",
    brandFirst: "#f0f0f0",
    brandSecond: "#e4af47",
    qrBorder: "#e4af47",
    dividerLine: "#e4af47",
    separatorColor: "rgba(228,175,71,0.25)",
  },
  glassmorphism: {
    primary: "#2d1b69",
    accent: "#a78bfa",
    bgPage: "#0f0a1e",
    bgCard: "rgba(255,255,255,0.12)",
    bgCardBack: "rgba(255,255,255,0.10)",
    textPrimary: "#f0eaff",
    textAccent: "#a78bfa",
    wavePrimary: "rgba(45,27,105,0.7)",
    waveAccent: "#a78bfa",
    iconBg: "#a78bfa",
    iconText: "#1a0a3e",
    brandFirst: "#e0d4ff",
    brandSecond: "#a78bfa",
    qrBorder: "#a78bfa",
    dividerLine: "#a78bfa",
    separatorColor: "rgba(167,139,250,0.25)",
  },
  "sunset-glow": {
    primary: "#7c2d12",
    accent: "#f97316",
    bgPage: "#1c1008",
    bgCard: "#ffffff",
    bgCardBack: "#ffffff",
    textPrimary: "#7c2d12",
    textAccent: "#f97316",
    wavePrimary: "#9a3412",
    waveAccent: "#fb923c",
    iconBg: "#9a3412",
    iconText: "#ffffff",
    brandFirst: "#7c2d12",
    brandSecond: "#f97316",
    qrBorder: "#f97316",
    dividerLine: "#f97316",
    separatorColor: "rgba(249,115,22,0.25)",
  },
  "ocean-breeze": {
    primary: "#064e3b",
    accent: "#14b8a6",
    bgPage: "#0a1a18",
    bgCard: "#ffffff",
    bgCardBack: "#ffffff",
    textPrimary: "#064e3b",
    textAccent: "#14b8a6",
    wavePrimary: "#065f46",
    waveAccent: "#2dd4bf",
    iconBg: "#064e3b",
    iconText: "#ffffff",
    brandFirst: "#064e3b",
    brandSecond: "#14b8a6",
    qrBorder: "#14b8a6",
    dividerLine: "#14b8a6",
    separatorColor: "rgba(20,184,166,0.25)",
  },
  "midnight-gold": {
    primary: "#1c1917",
    accent: "#d4a843",
    bgPage: "#0c0a09",
    bgCard: "#1c1917",
    bgCardBack: "#1c1917",
    textPrimary: "#fafaf9",
    textAccent: "#d4a843",
    wavePrimary: "#292524",
    waveAccent: "#d4a843",
    iconBg: "#d4a843",
    iconText: "#1c1917",
    brandFirst: "#fafaf9",
    brandSecond: "#d4a843",
    qrBorder: "#d4a843",
    dividerLine: "#d4a843",
    separatorColor: "rgba(212,168,67,0.25)",
  },
};

const getThemeColors = (theme) =>
  THEME_PALETTES[theme] || THEME_PALETTES["bodh-prima"];

// Helper: is the card background dark?
const isDarkCard = (theme) =>
  ["modern-dark", "glassmorphism", "midnight-gold"].includes(theme);

// ─── SVG Logo of Bodh Prima (Teal 'B' intertwined with Gold '1') ───────────────
const BPLogo = ({
  className = "w-20 h-20",

}) => (
  <img src="https://www.bodhprima.com/logo-bp.png" alt="" className={`${className} object-contain`} />

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

  /* ── Print container overrides: disable 3D flip for PDF capture ── */
  #business-card-print-container .card-face {
    position: relative !important;
    backface-visibility: visible !important;
    -webkit-backface-visibility: visible !important;
    inset: unset !important;
  }
  #business-card-print-container .card-face-back {
    transform: none !important;
  }

  /* ── Mobile stacked cards: static positioning ── */
  .card-stacked .card-face {
    position: relative !important;
    backface-visibility: visible !important;
    -webkit-backface-visibility: visible !important;
    inset: unset !important;
  }
  .card-stacked .card-face-back {
    transform: none !important;
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
    return <img src="https://www.bodhprima.com/logo-bp.png" alt={card.company || "Logo"} className={`${className} object-contain`} />;
  }
  return <BPLogo className={className} tealColor={tealColor} goldColor={goldColor} />;
};

// ─── Helper: ensure URL has protocol ──────────────────────────────────────────
const ensureHttp = (url) => {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

// ─── Helper: format phone for tel: link ───────────────────────────────────────
const formatTelLink = (phone) => {
  if (!phone) return "#";
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
};

// ─── Front Side Component ─────────────────────────────────────────────────────
const CardFront = ({ card, theme }) => {
  const t = getThemeColors(theme);
  const name = card.name || "ISHTIAQ AHMAD";
  const title = card.title || "Partner & CMO";
  const phone = card.phone || "+91 - 97186 67757";
  const company = card.company || "EXPORTS & IMPORTS";
  const logoSrc = getLogoSrc(card);

  const isGlass = theme === "glassmorphism";
  const cardBgStyle = isGlass
    ? { background: t.bgCard, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }
    : { backgroundColor: t.bgCard };

  return (
    <div className="card-face relative h-full w-full overflow-hidden rounded-[16px] shadow-2xl" style={cardBgStyle}>
      {/* Large watermark logo faded on right */}
      <div className="absolute right-[-20px] top-[10px] opacity-[0.06] pointer-events-none">
        {logoSrc ? (
          <img src="https://www.bodhprima.com/logo-bp.png" alt="" className="w-[280px] h-[280px] object-contain" />
        ) : (
          <BPLogo
            className="w-[280px] h-[280px]"
            tealColor={t.primary}
            goldColor={t.primary}
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
        {/* Primary wave */}
        <path d="M0 50C120 110 280 105 600 55V110H0V50Z" fill={t.wavePrimary} />
        {/* Accent wave (layered on top, thinner) */}
        <path d="M0 72C150 115 320 115 600 80V110H0V72Z" fill={t.waveAccent} />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 pb-16">
        {/* TOP ROW: Logo left, Company right */}
        <div className="flex items-start justify-between">
          {/* Left side - Logo + Brand name */}
          <div>
            <CardLogo card={card} className="w-[72px] h-[72px]" />
            <div className="mt-1 flex items-end gap-[3px]">
              <span className="text-[32px] font-medium leading-none" style={{ color: t.brandFirst }}>
                Bodh
              </span>
              <span className="text-[32px] font-medium leading-none" style={{ color: t.brandSecond }}>
                prima
              </span>
            </div>
          </div>

          {/* Right side - Company subtitle */}
          <div className="text-right pt-2">
            <p className="font-jakarta text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: t.textPrimary }}>
              {company}
            </p>
            <div className="ml-auto mt-2 h-[2px] w-24" style={{ backgroundColor: t.accent }} />
          </div>
        </div>

        {/* BOTTOM RIGHT: Name, Role, Phone */}
        <div className="flex justify-end mt-auto">
          <div className="text-right max-w-[260px]">
            {/* Name row */}
            <div className="flex items-center justify-end gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: t.textPrimary, color: t.textPrimary }}>
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
              <h2 className="font-jakarta text-[22px] font-extrabold uppercase tracking-wide leading-none" style={{ color: t.textPrimary }}>
                {name}
              </h2>
            </div>

            {/* Role */}
            <p className="mt-1 text-[15px] font-semibold font-jakarta" style={{ color: t.textAccent }}>
              {title}
            </p>

            {/* Divider */}
            <div className="ml-auto mt-3 mb-3 h-[2px] w-20" style={{ backgroundColor: t.accent }} />

            {/* Phone */}
            <a href={formatTelLink(phone)} className="flex items-center justify-end gap-3 no-underline hover:opacity-80 transition-opacity">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: t.textPrimary, color: t.textPrimary }}>
                <Phone size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-bold font-jakarta" style={{ color: t.textPrimary }}>
                {phone}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Back Side Component ──────────────────────────────────────────────────────
const CardBack = ({ card, theme }) => {
  const t = getThemeColors(theme);
  const website = card.website || "www.bodhprima.com";
  const facebook =
    card.socialLinks?.facebook || "facebook.com/bodhprima";
  const email = card.email || "Bodhprima@hotmail.com";
  const address =
    card.address ||
    "Krishna Nagar, Safdarjung Enclave, New Delhi, INDIA";

  const isGlass = theme === "glassmorphism";
  const cardBgStyle = isGlass
    ? { background: t.bgCardBack, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }
    : { backgroundColor: t.bgCardBack };

  return (
    <div className="card-face card-face-back relative h-full w-full overflow-hidden rounded-[16px] shadow-2xl" style={cardBgStyle}>
      {/* Gold diagonal divider line */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 550 320"
        preserveAspectRatio="none"
      >
        <path d="M340 0L230 320" stroke={t.dividerLine} strokeWidth="3" />
      </svg>

      {/* Large watermark logo on right side */}
      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 pointer-events-none">
        {getLogoSrc(card) ? (
          <img src="https://www.bodhprima.com/logo-bp.png" alt="" className="w-[260px] h-[260px] object-contain opacity-30" />
        ) : (
          <BPLogo
            className="w-[260px] h-[260px]"
            tealColor={`${t.primary}20`}
            goldColor={t.accent}
          />
        )}
      </div>

      {/* Content Layout */}
      <div className="relative z-10 flex h-full font-jakarta">
        {/* LEFT SIDE - Contact details */}
        <div className="flex w-[55%] flex-col justify-center gap-[14px] pl-6 pr-2">
          {/* Website */}
          <a href={ensureHttp(website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: t.iconBg, color: t.iconText }}>
              <Globe size={17} />
            </div>
            <span className="text-[14px] font-semibold" style={{ color: t.textPrimary }}>
              {website}
            </span>
          </a>

          {/* Separator */}
          <div className="h-[1px] w-[80%]" style={{ backgroundColor: t.separatorColor }} />

          {/* Facebook */}
          <a href={ensureHttp(facebook)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: t.iconBg, color: t.iconText }}>
              <Facebook size={17} />
            </div>
            <span className="text-[13px] font-semibold" style={{ color: t.textPrimary }}>
              {facebook}
            </span>
          </a>

          {/* Separator */}
          <div className="h-[1px] w-[80%]" style={{ backgroundColor: t.separatorColor }} />

          {/* Email */}
          <a href={`mailto:${email}`} className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: t.iconBg, color: t.iconText }}>
              <Mail size={17} />
            </div>
            <span className="text-[13px] font-semibold" style={{ color: t.textPrimary }}>
              {email}
            </span>
          </a>

          {/* Separator */}
          <div className="h-[1px] w-[80%]" style={{ backgroundColor: t.separatorColor }} />

          {/* Address */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 no-underline hover:opacity-80 transition-opacity"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: t.iconBg, color: t.iconText }}>
              <MapPin size={17} />
            </div>
            <span className="max-w-[200px] text-[12px] font-semibold leading-snug" style={{ color: t.textPrimary }}>
              {address}
            </span>
          </a>
        </div>

        {/* RIGHT SIDE - QR Code */}
        <div className="flex w-[45%] items-center justify-center">
          <a
            href={`https://wa.me/${(card.phone || "").replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <div className="rounded-[16px] border-[3px] p-3 shadow-xl" style={{ borderColor: t.qrBorder, backgroundColor: "#ffffff" }}>
              <QRCode
                value={`https://wa.me/${(card.phone || "").replace(/[^0-9]/g, "")}`}
                size={120}
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%",
                }}
                viewBox="0 0 256 256"
              />
              <p className="mt-2 text-center text-[11px] font-bold" style={{ color: t.textPrimary }}>
                WhatsApp contact
              </p>
            </div>
          </a>
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
  const [downloading, setDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Scaling + Mobile Detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
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

  useEffect(() => {
    if (!card) return;

    // Save original values to restore them on unmount
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";

    // Helper to get or create meta tag
    const setMetaTag = (attrName, attrValue, contentValue) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      let originalVal = null;
      if (element) {
        originalVal = element.getAttribute("content");
        element.setAttribute("content", contentValue);
      } else {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        element.setAttribute("content", contentValue);
        document.head.appendChild(element);
      }
      return { element, existed: !!originalVal, originalVal };
    };

    // Set page title (name + designation)
    const titleText = card.title
      ? `${card.name} - ${card.title} | Bodh Prima`
      : `${card.name} | Bodh Prima`;
    document.title = titleText;

    // Set page description (dynamic, high-quality description)
    const descText = `Digital Business Card of ${card.name}${
      card.title ? `, ${card.title}` : ""
    }${
      card.company ? ` at ${card.company}` : ""
    }. View contact details, website, social links, and connect directly.`;

    if (metaDesc) {
      metaDesc.setAttribute("content", descText);
    }

    // Set Open Graph tags for rich social sharing previews (WhatsApp, etc.)
    const ogTitleInfo = setMetaTag("property", "og:title", titleText);
    const ogDescInfo = setMetaTag("property", "og:description", descText);

    return () => {
      // Restore original values on cleanup
      document.title = originalTitle;
      if (metaDesc) {
        metaDesc.setAttribute("content", originalDesc);
      }

      // Cleanup dynamically created/modified OG tags
      if (ogTitleInfo.existed) {
        ogTitleInfo.element.setAttribute("content", ogTitleInfo.originalVal);
      } else {
        ogTitleInfo.element.remove();
      }

      if (ogDescInfo.existed) {
        ogDescInfo.element.setAttribute("content", ogDescInfo.originalVal);
      } else {
        ogDescInfo.element.remove();
      }
    };
  }, [card]);

  const cardTheme = card?.theme || "bodh-prima";
  const themeColors = getThemeColors(cardTheme);

  const handleDownloadPDF = async () => {
    const wrapper = document.getElementById("business-card-print-wrapper");
    const frontEl = document.getElementById("print-card-front");
    const backEl = document.getElementById("print-card-back");
    if (!wrapper || !frontEl || !backEl) return;

    setDownloading(true);
    try {
      // Make the print wrapper visible so html2canvas can capture
      wrapper.style.position = "fixed";
      wrapper.style.left = "0";
      wrapper.style.top = "0";
      wrapper.style.zIndex = "9999";
      wrapper.style.opacity = "1";
      wrapper.style.pointerEvents = "none";

      // Wait for browser paint
      await new Promise((r) => setTimeout(r, 300));

      // html2canvas can't parse oklch() colors from Tailwind v4.
      // This callback strips oklch from ALL sources: <style> tags, linked
      // stylesheets (read via CSSOM from the original document), and inline
      // style attributes on individual elements.
      const replaceOklch = (css) => {
        css = css.replace(/oklch\(\s*1\s+0\s+0[^)]*\)/g, '#ffffff');
        css = css.replace(/oklch\(\s*0\s+0\s+0[^)]*\)/g, '#000000');
        css = css.replace(/oklch\([^)]*\)/g, 'transparent');
        return css;
      };

      const stripOklch = (clonedDoc) => {
        // 1. Strip oklch from inline <style> tags
        clonedDoc.querySelectorAll('style').forEach((s) => {
          if (s.textContent.includes('oklch')) {
            s.textContent = replaceOklch(s.textContent);
          }
        });

        // 2. Replace linked stylesheets with cleaned inline <style> tags.
        //    Read rules from the ORIGINAL document's CSSOM (same-origin = accessible).
        const clonedLinks = [...clonedDoc.querySelectorAll('link[rel="stylesheet"]')];
        clonedLinks.forEach((link) => {
          // Find the matching stylesheet in the original document
          for (const sheet of document.styleSheets) {
            if (sheet.href && link.href && sheet.href === link.href) {
              try {
                const rules = sheet.cssRules || sheet.rules;
                if (!rules) continue;
                let css = '';
                for (let i = 0; i < rules.length; i++) {
                  css += rules[i].cssText + '\n';
                }
                css = replaceOklch(css);
                const inlineStyle = clonedDoc.createElement('style');
                inlineStyle.textContent = css;
                link.parentNode.insertBefore(inlineStyle, link);
              } catch (e) {
                // CORS restriction — can't read rules; leave the link as-is
              }
              break;
            }
          }
          link.remove();
        });

        // 3. Strip oklch from inline style="" attributes on all elements
        clonedDoc.querySelectorAll('[style]').forEach((el) => {
          const attr = el.getAttribute('style');
          if (attr && attr.includes('oklch')) {
            el.setAttribute('style', replaceOklch(attr));
          }
        });
      };

      // Capture front card
      const frontCanvas = await html2canvas(frontEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: themeColors.bgCard.startsWith("rgba") ? "#1a1a2e" : themeColors.bgCard,
        onclone: stripOklch,
      });

      // Capture back card
      const backCanvas = await html2canvas(backEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: themeColors.bgCardBack.startsWith("rgba") ? "#1a1a2e" : themeColors.bgCardBack,
        onclone: stripOklch,
      });

      // Hide the wrapper again
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "-9999px";
      wrapper.style.zIndex = "-1";
      wrapper.style.opacity = "0";

      // Create PDF - landscape, sized to card proportions
      const pdfWidth = 550;
      const pdfHeight = 320;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });

      // Page 1 - Front
      const frontImg = frontCanvas.toDataURL("image/png");
      pdf.addImage(frontImg, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Page 2 - Back
      pdf.addPage([pdfWidth, pdfHeight], "landscape");
      const backImg = backCanvas.toDataURL("image/png");
      pdf.addImage(backImg, "PNG", 0, 0, pdfWidth, pdfHeight);

      const fileName = `${(card.name || "card").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-card.pdf`;

      // Detect iOS Safari for special handling
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (isIOS) {
        // iOS Safari: open in new window (blob download doesn't work reliably)
        const pdfBlob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);
        window.open(blobUrl, "_blank");
        // Clean up after a delay
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      } else {
        // All other browsers: use jsPDF's built-in save (handles mobile Android, desktop Chrome/Firefox/Edge)
        pdf.save(fileName);
      }
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. Please try again.");
      // Ensure we hide the container even on error
      if (wrapper) {
        wrapper.style.position = "absolute";
        wrapper.style.left = "-9999px";
        wrapper.style.top = "-9999px";
        wrapper.style.opacity = "0";
      }
    } finally {
      setDownloading(false);
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
    <div
      className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-colors duration-500"
      style={{ backgroundColor: themeColors.bgPage }}
    >
      {/* ── MOBILE: Stacked both-sides view ── */}
      {isMobile ? (
        <div className="w-full max-w-[550px] space-y-4 card-stacked">
          {/* Front label */}
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-center" style={{ color: themeColors.accent, opacity: 0.7 }}>
            ▬ Front Side ▬
          </p>
          {/* Front card */}
          <div
            className="flex items-center justify-center"
            style={{ height: `${320 * scale}px`, width: `${550 * scale}px`, margin: "0 auto" }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                width: "550px",
                height: "320px",
              }}
              className="shrink-0"
            >
              <CardFront card={card} theme={cardTheme} />
            </div>
          </div>

          {/* Back label */}
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-center pt-2" style={{ color: themeColors.accent, opacity: 0.7 }}>
            ▬ Back Side ▬
          </p>
          {/* Back card */}
          <div
            className="flex items-center justify-center"
            style={{ height: `${320 * scale}px`, width: `${550 * scale}px`, margin: "0 auto" }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                width: "550px",
                height: "320px",
              }}
              className="shrink-0"
            >
              <CardBack card={card} theme={cardTheme} />
            </div>
          </div>
        </div>
      ) : (
        /* ── DESKTOP: 3D Flip Card Container ── */
        <>
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
                <CardFront card={card} theme={cardTheme} />

                {/* Back Face */}
                <CardBack card={card} theme={cardTheme} />
              </div>
            </div>
          </div>

          {/* Tap-to-flip hint */}
          <p className="mt-5 text-[11px] font-semibold tracking-[0.2em] uppercase animate-pulse select-none font-jakarta" style={{ color: `${themeColors.accent}88` }}>
            Tap card to flip
          </p>
        </>
      )}

      {/* Actions Panel */}
      <div className="mt-6 flex items-center justify-center gap-4 w-full max-w-[320px] font-jakarta">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className={`flex-1 flex items-center justify-center gap-2 rounded-2xl text-white active:scale-95 py-3.5 text-sm font-bold shadow-lg transition ${downloading ? 'opacity-70 cursor-wait' : 'hover:opacity-90'}`}
          style={{ backgroundColor: themeColors.primary }}
        >
          {downloading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating...
            </>
          ) : (
            <>
              <Download size={16} />
              Download PDF
            </>
          )}
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
      <div
        id="business-card-print-wrapper"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none', zIndex: -1 }}
      >
        <div
          id="business-card-print-container"
          style={{ width: '600px', padding: '25px', background: themeColors.bgPage, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center' }}
        >
          <div id="print-card-front" style={{ width: '550px', height: '320px', position: 'relative' }}>
            <CardFront card={card} theme={cardTheme} />
          </div>
          <div id="print-card-back" style={{ width: '550px', height: '320px', position: 'relative' }}>
            <CardBack card={card} theme={cardTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}
