import { type NextRequest, NextResponse } from "next/server";

import sizeOf from "image-size";
import type { ISizeCalculationResult } from "image-size/dist/types/interface";

import type { Dimensions } from "types/dimensions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const dimensions = await sizeOfAsync(url);

    return NextResponse.json<Dimensions>({
      width: dimensions.width,
      height: dimensions.height,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get image dimensions" }, { status: 500 });
  }
}

const sizeOfAsync = async (url: string): Promise<ISizeCalculationResult> => {
  const response = await fetch(url);

  const buffer = await response.arrayBuffer();

  return sizeOf(new Uint8Array(buffer));
};
