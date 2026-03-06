import { NextRequest, NextResponse } from "next/server";
import { createAdminSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await createAdminSession(email);
  return NextResponse.json({ ok: true });
}
