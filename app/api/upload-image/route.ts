import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { put } from "@vercel/blob";
import sharp from "sharp";

import { getArrayBuffer } from "utils/get-array-buffer";

export async function POST(request: NextRequest) {
  const { id, url, key } = await request.json();

  if (key !== process.env.API_ROUTE_KEY) {
    return NextResponse.json({ error: "Invalid api route key" }, { status: 403 });
  }

  if (!id || !url) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const arrayBuffer = await getArrayBuffer(url);

    const buffer = await sharp(arrayBuffer)
      .rotate()
      .resize({
        width: 1080,
        height: 1080,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("webp", { quality: 75 })
      .toBuffer();

    const result = await put(`images/${id}.webp`, buffer, { access: "public", addRandomSuffix: false });

    return NextResponse.json({ url: result.url });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
