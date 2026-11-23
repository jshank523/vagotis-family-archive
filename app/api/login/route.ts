import { NextResponse } from "next/server";
import { createReviewAccess, reviewAccessSeconds } from "../review-access";

export async function POST(request: Request) {
  const { password } = await request.json();

  const familyPassword = process.env.FAMILY_PASSWORD;
  if (!familyPassword || password !== familyPassword) {
    return NextResponse.json(
      { success: false, message: "Incorrect password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("family-access", "true", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 5,
  });
  response.cookies.set("memory-publishing-access", createReviewAccess(familyPassword), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: reviewAccessSeconds,
  });

  return response;
}
