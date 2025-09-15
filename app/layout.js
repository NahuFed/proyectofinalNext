import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/general/LayoutClient";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "CineReview - Reseñas y Calificaciones de Películas",
  description:
    "Explora películas como en IMDb: buscá por nombre, género o año. Descubrí sinopsis, reparto y director. Califica del 1 al 10, deja reseñas y consultá el ranking de las más populares en CineReview.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
