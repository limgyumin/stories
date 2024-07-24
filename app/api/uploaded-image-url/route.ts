import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { head } from "@vercel/blob";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
  }

  try {
    const result = await head(`${process.env.VERCEL_STORAGE_URL}/images/${id}.webp`);

    return NextResponse.json({ url: result.url });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get uploaded image url" }, { status: 500 });
  }
}
