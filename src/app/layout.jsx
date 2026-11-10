import { Urbanist } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="pt-20 lg:pt-22">
        {children}
        </main>
        <Footer className="mt-auto" />
      </body>
    </html>
  );
}
