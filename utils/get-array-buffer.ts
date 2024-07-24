export const getArrayBuffer = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url, { cache: "no-store" });

  return response.arrayBuffer();
};
