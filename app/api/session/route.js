import { cookies } from "next/headers";

export async function GET() {
  const hasSession = Boolean(cookies().get("session")?.value); // usa el nombre real de tu cookie
  return Response.json({ authenticated: hasSession });
}
