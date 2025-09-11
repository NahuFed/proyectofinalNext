"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import { users } from "@/data/data";


function isEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

async function signJWT(payload) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function actionsLoginInicio(formData) {
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const password = (formData.get("password") || "").toString().trim();

  if (!name) redirect(`/login?error=${encodeURIComponent("El nombre es obligatorio")}`);
  if (!isEmail(email)) redirect(`/login?error=${encodeURIComponent("El email no es válido")}`);
  if (!password) redirect(`/login?error=${encodeURIComponent("La contraseña es obligatoria")}`);

  const user = users.find((u) => u.email === email);
  if (!user) redirect(`/login?error=${encodeURIComponent("Usuario no encontrado")}`);
  if (user.name !== name || user.password !== password) {
    redirect(`/login?error=${encodeURIComponent("Credenciales inválidas")}`);
  }

  const token = await signJWT({ sub: user.id, name: user.name, email: user.email });

  cookies().set({
    name: "session",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(`/movies?ok=1&name=${encodeURIComponent(user.name)}`);
}
