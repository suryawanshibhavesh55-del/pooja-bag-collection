import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POOJA BAG COLLECTION | Premium Luxury Handbags & Ladies Bags",
  description: "Explore POOJA BAG COLLECTION, Mumbai's premier destination for premium handcrafted handbags, luxury totes, elegant sling bags, and stylish clutches. Wholesale and retail available at competitive prices.",
  keywords: "Pooja Bag Collection, ladies handbags Mumbai, premium bags, luxury bags, wholesale bags Mumbai, ladies purses, Abdul Rehman Street bags, designer bags wholesale, bag collections",
  authors: [{ name: "POOJA BAG COLLECTION" }],
  metadataBase: new URL("https://poojabagcollection.com"), // Fallback base URL for resolving OG images
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "POOJA BAG COLLECTION | Premium Luxury Handbags & Ladies Bags",
    description: "Explore POOJA BAG COLLECTION, Mumbai's premier destination for premium handcrafted handbags, luxury totes, elegant sling bags, and stylish clutches. Wholesale and retail available.",
    url: "https://poojabagcollection.com",
    siteName: "POOJA BAG COLLECTION",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/WhatsApp Image 2026-07-17 at 4.53.06 PM.jpeg",
        width: 800,
        height: 600,
        alt: "Pooja Bag Collection - Premium Handbag Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "POOJA BAG COLLECTION | Premium Luxury Handbags",
    description: "Explore POOJA BAG COLLECTION, Mumbai's premier destination for premium handcrafted handbags, luxury totes, elegant sling bags, and stylish clutches.",
    images: ["/assets/WhatsApp Image 2026-07-17 at 4.53.06 PM.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream-bg text-charcoal">
        {children}
      </body>
    </html>
  );
}
