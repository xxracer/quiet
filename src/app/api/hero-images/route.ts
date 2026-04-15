import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get("action");

    if (action === "list") {
      // List all hero images
      const blobResponse = await list({ prefix: "hero/" });
      const images = blobResponse.blobs.map((blob) => ({
        url: blob.url,
        filename: blob.pathname,
        uploadedAt: blob.uploadedAt,
      }));
      return NextResponse.json({ images });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error listing hero images:", error);
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const action = formData.get("action") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (action === "upload") {
      // Upload a new hero image
      const filename = `hero/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

      const blob = await put(filename, file, {
        contentType: file.type,
        access: "public",
      });

      return NextResponse.json({
        url: blob.url,
        filename: blob.pathname,
        downloadUrl: blob.downloadUrl
      });
    } else if (action === "set-static") {
      // Set a single static image for hero
      const imageUrl = formData.get("imageUrl") as string;
      // This would typically be stored in a database or site-content
      // For now, we'll just return the URL
      return NextResponse.json({ url: imageUrl });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error handling hero image:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json({ error: "No filename provided" }, { status: 400 });
    }

    await del(filename);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting hero image:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}

export const runtime = "edge";
