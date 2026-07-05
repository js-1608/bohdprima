import "../index.css";
import "../App.css";

export const metadata = {
  title: "Bodh prima | Exports-Imports & Trading House",
  description: "Bodh prima ® provides end‑to‑end trade‑house services — procurement, compliance, documentation, logistics and market access — with efficiency, transparency, and trusted execution.",
  keywords: "Bodh Prima, logistics, cargo services, freight forwarding, shipping, supply chain, global transport, export import, trading house, international trade",
  icons: {
    icon: "https://bodhprima.vercel.app/assets/bodh-prima-logo-C9xp6Q-h.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
