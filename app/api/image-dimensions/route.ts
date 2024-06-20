import { type NextRequest, NextResponse } from "next/server";

import sharp from "sharp";

import type { Dimensions } from "types/dimensions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const buffer = await fetch(url).then((response) => response.arrayBuffer());

    const image = await sharp(buffer).metadata();

    return NextResponse.json<Dimensions>({
      width: image.width,
      height: image.height,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get image dimensions" }, { status: 500 });
  }
}
