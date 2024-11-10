import { fetchImageDimensions, fetchImageUrl, uploadImage } from "libs/image/image.service";
import type { BlockChild, BlockChildren } from "libs/notion/notion.types";
import { getBlockImageUrl } from "libs/notion/notion.utils";

export const transformArticleBody = async (response: BlockChildren): Promise<BlockChildren> => {
  const { results, ...rest } = response;

  const transformed = await Promise.all(transformBlocks(results));

  return {
    ...rest,
    results: transformed,
  };
};

const transformBlocks = (blocks: BlockChild[]): Promise<BlockChild>[] => {
  return blocks.map(async (block) => {
    if (block.type === "image") {
      return transformImageBlockChild(block);
    }

    if (!block.children || block.children.length === 0) {
      return block;
    }

    const transformed = await Promise.all(transformBlocks(block.children));

    return {
      ...block,
      children: transformed,
    };
  });
};

const transformImageBlockChild = async (block: BlockChild<"image">): Promise<BlockChild<"image">> => {
  const { id } = block;

  // 이미지 URL 이 스토리지에 존재하는지 확인한다.
  let url = await fetchImageUrl(id);

  // 스토리지에 등록된 URL 이 없으면 이미지를 새로 등록한다.
  if (url === undefined) {
    url = await uploadImage(id, getBlockImageUrl(block));
  }

  // 이미지의 크기 정보를 조회한다.
  const dimensions = await fetchImageDimensions(url);

  return {
    ...block,
    image: {
      ...block.image,
      width: dimensions?.width,
      height: dimensions?.height,
      url,
    },
  };
};
