import { type NextRequest, NextResponse } from "next/server";

import sharp from "sharp";

import type { Dimensions } from "types/dimensions";
import { getArrayBuffer } from "utils/get-array-buffer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
  }

  try {
    const arrayBuffer = await getArrayBuffer(url);

    const { width, height } = await sharp(arrayBuffer).metadata();

    return NextResponse.json<Dimensions>({ width, height });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get image dimensions" }, { status: 500 });
  }
}
