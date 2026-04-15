import { NextRequest, NextResponse } from "next/server";

// This endpoint is no longer needed when using public blob access
// Kept for backwards compatibility - returns the same URL
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pathname = searchParams.get("pathname");

    if (!pathname) {
      return NextResponse.json({ error: "No pathname provided" }, { status: 400 });
    }

    // For public blobs, we can construct the public URL directly
    // Or just return the pathname if it's already a full URL
    return NextResponse.json({ url: pathname });
  } catch (error) {
    console.error("Error generating URL:", error);
    return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
  }
}
