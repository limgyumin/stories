import type { Dimensions } from "types/dimensions";

type ImageResponse = {
  url: string;
};

export const uploadImage = async (id: string, url: string): Promise<string> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload-image`, {
    method: "POST",
    body: JSON.stringify({
      key: process.env.API_ROUTE_KEY,
      id,
      url,
    }),
  });

  if (response.status >= 400) {
    return url;
  }

  const result = (await response.json()) as ImageResponse;

  return result.url;
};

export const fetchImageUrl = async (id: string): Promise<string | undefined> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/uploaded-image-url?id=${id}`);

  if (response.status >= 400) {
    return;
  }

  const result = (await response.json()) as ImageResponse;

  return result.url;
};

export const fetchImageDimensions = async (url: string): Promise<Dimensions | undefined> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/image-dimensions?url=${encodeURIComponent(url)}`,
  );

  if (response.status >= 400) {
    return;
  }

  return response.json();
};
