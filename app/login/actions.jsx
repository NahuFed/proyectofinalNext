"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import { users } from "@/data/data";

function isEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

async function signJWT(payload) {
  const secretValue = process.env.AUTH_SECRET;
  if (!secretValue) throw new Error("Falta AUTH_SECRET (definilo en .env)");
  const secret = new TextEncoder().encode(secretValue);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function actionsLoginInicio(formData) {
  const email = (formData.get("email") || "").toString().trim().toLowerCase();
  const password = (formData.get("password") || "").toString().trim();

  if (!isEmail(email)) redirect(`/login?error=${encodeURIComponent("El email no es válido")}`);
  if (!password) redirect(`/login?error=${encodeURIComponent("La contraseña es obligatoria")}`);

  const user = users.find((u) => u.email?.toLowerCase() === email);
  if (!user || user.password !== password) {
    redirect(`/login?error=${encodeURIComponent("Credenciales inválidas")}`);
  }

  const token = await signJWT({
    sub: String(user.id ?? user.email),
    name: user.name ?? "",
    email: user.email,
    role: user.role ?? "user",
  });

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, 
  });

  redirect("/movies?ok=1");
}
