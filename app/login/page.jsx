import { Film } from "lucide-react";
import { actionsLoginInicio } from "./actions";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Iniciar Sesión - CineReview",
  description:
    "Accede a tu cuenta de CineReview para dejar reseñas, calificaciones y explorar tu historial de películas.",
  keywords: [
    "login CineReview",
    "iniciar sesión CineReview",
    "entrar CineReview",
    "reseñas de películas",
    "calificaciones de cine",
  ],
  openGraph: {
    title: "Iniciar Sesión - CineReview",
    description:
      "Accede a tu cuenta y participa en la comunidad de reseñas y calificaciones de CineReview.",
    url: "https://cinereview-sigma.vercel.app/login",
    siteName: "CineReview",
    images: [
      {
        url: "https://cinereview-sigma.vercel.app/logo.png",
        width: 512,
        height: 512,
        alt: "Logo de CineReview",
      },
    ],
    locale: "es_ES",
    type: "website",
  }
};

export default async function LoginPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const message =
    sp.ok === "1" ? "¡Inicio de sesión exitoso!" :
    sp.error ? sp.error : "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center gap-2 mb-2">
        <Film className="h-8 w-8 text-fuchsia-800" />
        <h1 className="font-bold text-4xl">Cine<span className="text-fuchsia-800">Review</span></h1>
      </div>
      <p className="text-xl mb-4">Por favor, inicia sesión para continuar</p>
      <LoginForm action={actionsLoginInicio} message={message} />
    </div>
  );
}
