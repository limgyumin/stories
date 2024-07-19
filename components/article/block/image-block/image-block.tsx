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
  const { caption } = block.image;

  const url = getBlockImageUrl(block);

  let dimensions: Dimensions | undefined;

  if (intrinsic) {
    dimensions = await getImageSize(url);
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

const getImageSize = async (url: string): Promise<Dimensions> => {
  // TODO: 환경별 host 분기 필요
  return fetch(`http://localhost:3000/api/image-dimensions?url=${encodeURIComponent(url)}`).then((res) => res.json());
};

export const getBlockImageUrl = (block: BlockChild<"image">): string => {
  if (block.image.type === "external") {
    return block.image.external.url;
  }

  return block.image.file.url;
};
