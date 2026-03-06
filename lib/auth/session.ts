import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "kc_admin_session";

function sign(value: string) {
  const secret = process.env.ADMIN_AUTH_SECRET || "dev-secret";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export async function createAdminSession(email: string) {
  const token = Buffer.from(`${email}.${Date.now()}`).toString("base64url");
  const payload = `${token}.${sign(token)}`;
  (await cookies()).set(COOKIE_NAME, payload, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAdminSession() {
  const raw = (await cookies()).get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const [token, signature] = raw.split(".");
  if (!token || !signature) return null;
  if (sign(token) !== signature) return null;
  const decoded = Buffer.from(token, "base64url").toString("utf8");
  const [email] = decoded.split(".");
  return { email };
}
