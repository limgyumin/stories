import Image from "next/image";

import { head, put } from "@vercel/blob";
import sharp from "sharp";

import type { BlockChild } from "libs/notion/notion.types";
import type { Dimensions } from "types/dimensions";
import { cx } from "utils/cx";
import { getArrayBuffer } from "utils/get-array-buffer";

import { Caption } from "../caption";

type Props = {
  block: BlockChild<"image">;
  intrinsic: boolean;
};

export const ImageBlock = async ({ block, intrinsic }: Props) => {
  const {
    id,
    image: { caption },
  } = block;

  let url = await getImageUrlFromStorage(id);

  if (url === undefined) {
    url = await uploadToStorage(id, getBlockImageUrl(block));
  }

  let dimensions: Dimensions | undefined;

  if (intrinsic) {
    dimensions = await getImageDimensions(url);
  }

  return (
    <div className={cx("mt-4 flex w-full flex-col gap-3 py-2 md:py-4", { "!m-0 !p-0": !intrinsic })}>
      <div
        className="relative w-full overflow-hidden rounded-xl md:rounded-2xl"
        style={{ aspectRatio: intrinsic ? `${dimensions?.width} / ${dimensions?.height}` : "3 / 4" }}
      >
        <Image className="object-cover" src={url} alt="" fill draggable={false} />
      </div>

      <Caption caption={caption} />
    </div>
  );
};

const uploadToStorage = async (id: string, url: string): Promise<string> => {
  try {
    const arrayBuffer = await getArrayBuffer(url);

    const buffer = await sharp(arrayBuffer)
      .resize({
        width: 1080,
        height: 1080,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("webp", { quality: 75 })
      .toBuffer();

    const result = await put(`images/${id}.webp`, buffer, { access: "public", addRandomSuffix: false });

    return result.url;
  } catch (error) {
    return url;
  }
};

const getImageUrlFromStorage = async (id: string): Promise<string | undefined> => {
  try {
    const result = await head(`${process.env.VERCEL_STORAGE_URL}/images/${id}.webp`);

    return result.url;
  } catch (error) {
    return undefined;
  }
};

const getImageDimensions = async (url: string): Promise<Dimensions> => {
  const buffer = await getArrayBuffer(url);

  const metadata = await sharp(buffer).metadata();

  return metadata;
};

export const getBlockImageUrl = (block: BlockChild<"image">): string => {
  if (block.image.type === "external") {
    return block.image.external.url;
  }

  return block.image.file.url;
};
