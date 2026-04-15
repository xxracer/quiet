import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/storage";

export async function GET() {
  try {
    const content = await getSiteContent();
    if (!content) {
      return NextResponse.json({ error: "Site content not found" }, { status: 404 });
    }
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching site content:", error);
    return NextResponse.json({ error: "Failed to fetch site content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await saveSiteContent(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving site content:", error);
    return NextResponse.json({ error: "Failed to save site content" }, { status: 500 });
  }
}