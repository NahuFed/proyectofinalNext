import { actionsLoginInicio } from "./actions";
import { Film } from "lucide-react";

export default function LoginPage({ searchParams }) {
  const sp = searchParams || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Film className="h-8 w-8 text-fuchsia-800" />
        <h1 className="font-bold text-4xl">
          Cine<span className="text-fuchsia-800">Review</span>
        </h1>
      </div>

      <p className="text-xl">Por favor, inicia sesión para continuar</p>
      {sp.error && <p className="text-red-600">{sp.error}</p>}
      {sp.ok && <p className="text-green-600">¡Inicio de sesión exitoso!</p>}

      <form action={actionsLoginInicio} className="w-full max-w-sm">
        <div className="flex flex-col gap-2 m-4">
          <label htmlFor="name" className="text-[18px]">Nombre</label>
          <input id="name" name="name" className="border border-fuchsia-800 rounded p-2" />
        </div>

        <div className="flex flex-col gap-2 m-4">
          <label htmlFor="email" className="text-[18px]">Correo electrónico</label>
          <input id="email" name="email" type="email" className="border border-fuchsia-800 rounded p-2" />
        </div>

        <div className="flex flex-col gap-2 m-4">
          <label htmlFor="password" className="text-[18px]">Contraseña</label>
          <input id="password" name="password" type="password" className="border border-fuchsia-800 rounded p-2" />
        </div>

        <div className="flex justify-center m-4">
          <button type="submit" className="bg-fuchsia-800 text-white rounded px-4 py-2">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}
