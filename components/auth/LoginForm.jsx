"use client";
import { useFormStatus } from "react-dom";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="bg-fuchsia-800 text-white rounded px-4 py-2">
    {pending ? "Ingresando..." : "Iniciar Sesión"}
  </button>;
}

export default function LoginForm({ action, message }) {
  return (
    <div className="w-full max-w-sm">
      {message && <p className="mb-2 text-sm text-center">{message}</p>}
      <form action={action} className="space-y-4">
        <div>
          <label className="block mb-1">Correo electrónico</label>
          <input name="email" type="email" required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input name="password" type="password" required className="w-full border rounded p-2" />
        </div>
        <div className="flex justify-center"><SubmitBtn /></div>
      </form>
    </div>
  );
}
