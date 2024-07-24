import Image from "next/image";

import type { BlockChild } from "libs/notion/notion.types";
import type { Dimensions } from "types/dimensions";
import { cx } from "utils/cx";

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

type ImageResponse = {
  url: string;
};

const uploadToStorage = async (id: string, url: string): Promise<string> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload-image`, {
    method: "POST",
    body: JSON.stringify({ id, url }),
  });

  if (response.status >= 400) {
    return url;
  }

  const result = (await response.json()) as ImageResponse;

  return result.url;
};

const getImageUrlFromStorage = async (id: string): Promise<string | undefined> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/uploaded-image-url?id=${id}`);

  if (response.status >= 400) {
    return;
  }

  const result = (await response.json()) as ImageResponse;

  return result.url;
};

const getImageDimensions = async (url: string): Promise<Dimensions | undefined> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/image-dimensions?url=${encodeURIComponent(url)}`,
  );

  if (response.status >= 400) {
    return;
  }

  return response.json();
};

export const getBlockImageUrl = (block: BlockChild<"image">): string => {
  if (block.image.type === "external") {
    return block.image.external.url;
  }

  return block.image.file.url;
};
