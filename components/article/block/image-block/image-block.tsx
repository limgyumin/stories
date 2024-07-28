import { AiOutlineClose } from "react-icons/ai";
import { IoIosExpand } from "react-icons/io";

import { Dialog } from "components/ui/dialog";
import { Image } from "components/ui/image";
import type { BlockChild } from "libs/notion/notion.types";
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

  return (
    <div className={cx("mt-4 flex w-full flex-col gap-3 py-2 md:py-4", { "!m-0 !p-0": !intrinsic })}>
      <div className="relative">
        <Image className="overflow-hidden rounded-xl md:rounded-2xl" src={url} alt="" intrinsic={intrinsic} />

        {intrinsic ? null : (
          <Dialog.Root>
            <Dialog.Trigger className="absolute bottom-3 right-3 cursor-pointer">
              <div className="rounded-md bg-black/65 p-1 text-base text-white">
                <IoIosExpand />
              </div>
            </Dialog.Trigger>

            <Dialog.Overlay />

            <Dialog.Content>
              <div className="relative">
                <Dialog.Trigger className="absolute bottom-3 right-3 z-[1] cursor-pointer">
                  <div className="rounded-md bg-black/65 p-1 text-base text-white">
                    <AiOutlineClose />
                  </div>
                </Dialog.Trigger>

                <Image className="h-auto w-full max-w-full" src={url} alt="" intrinsic />
              </div>
            </Dialog.Content>
          </Dialog.Root>
        )}
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

export const getBlockImageUrl = (block: BlockChild<"image">): string => {
  if (block.image.type === "external") {
    return block.image.external.url;
  }

  return block.image.file.url;
};
