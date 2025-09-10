import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavegacionComponent from "@/components/ui/Navegacion";
import FooterComponent from "@/components/ui/Footer";
import { ClientProvider } from "./ClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ImDB Next App",
  description: "Una aplicación de reseñas de películas construida con Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavegacionComponent />
        <ClientProvider>{children}</ClientProvider>
        <FooterComponent />
      </body>
    </html>
  );
}
