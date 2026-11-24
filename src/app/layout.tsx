import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Display font for headings: characterful, friendly, still very readable.
const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mahima Kopalley · ML Researcher",
  description:
    "Machine learning researcher (Edge AI, Clinical AI, Speech & NLP) at IIIT Hyderabad. Projects, experience and contact.",
  openGraph: {
    title: "Mahima Kopalley · ML Researcher",
    description: "Edge AI · Clinical AI · Speech & NLP. Projects, experience and contact.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='9' fill='%23ff5fa2'/><text x='16' y='21.5' font-family='Arial' font-weight='700' font-size='14' fill='white' text-anchor='middle'>MK</text></svg>",
  },
};

export const viewport: Viewport = { themeColor: "#070611" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${display.variable} font-sans antialiased`}>
        {/* If JavaScript is off, show every section instead of waiting for a scroll animation that never runs */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
