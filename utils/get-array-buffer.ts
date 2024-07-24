export const getArrayBuffer = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to get array buffer");
  }

  return response.arrayBuffer();
};
