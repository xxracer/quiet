import { put } from "@vercel/blob";

export async function uploadProductImage(
  file: Buffer | ArrayBuffer,
  filename: string,
  contentType: string
): Promise<string> {
  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });

  return blob.url;
}

export function getProductImageUrl(filename: string): string {
  return `https://public.vercel-blob.com/${filename}`;
}
