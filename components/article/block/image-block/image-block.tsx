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
  const { image } = block;
  const { url, width = 0, height = 0, caption } = image;

  return (
    <div className={cx("mt-4 flex w-full flex-col gap-3 py-2 md:py-4", { "!m-0 !p-0": !intrinsic })}>
      <div className="relative">
        <Image
          className="overflow-hidden rounded-xl md:rounded-2xl"
          src={url}
          alt=""
          intrinsic={intrinsic}
          width={width}
          height={height}
        />

        {intrinsic ? null : (
          <Dialog.Root>
            <Dialog.Trigger className="absolute bottom-3 right-3 cursor-pointer">
              <div className="rounded-md bg-black/65 p-1 text-base text-white">
                <IoIosExpand />
              </div>
            </Dialog.Trigger>

            <Dialog.Overlay />

            <Dialog.Content
              className="relative left-[50%] max-h-[calc(100vh-100px)] !w-auto translate-x-[-50%]"
              style={{ aspectRatio: `${width} / ${height}` }}
            >
              <div className="relative">
                <Dialog.Trigger className="absolute bottom-3 right-3 z-[1] cursor-pointer">
                  <div className="rounded-md bg-black/65 p-1 text-base text-white">
                    <AiOutlineClose />
                  </div>
                </Dialog.Trigger>

                <Image className="h-full w-full max-w-full" src={url} alt="" intrinsic width={width} height={height} />
              </div>
            </Dialog.Content>
          </Dialog.Root>
        )}
      </div>

      <Caption caption={caption} />
    </div>
  );
};
