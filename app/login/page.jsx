import { Film } from "lucide-react";
import { actionsLoginInicio } from "./actions";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage({ searchParams }) {
  const sp = searchParams || {};
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
