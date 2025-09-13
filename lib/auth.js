import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getCurrentUser() {
  const c = cookies().get("session");
  if (!c) return null;

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(c.value, secret);
    return { id: payload.sub, name: payload.name, email: payload.email };
  } catch {
    return null;
  }
}
