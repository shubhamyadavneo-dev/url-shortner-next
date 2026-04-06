import { connectDB } from "@/lib/mongodb";
import { Url } from "@/lib/models/Url";
import { incrementClickCount } from "@/lib/actions/urlActions";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const urlRecord = await Url.findOne({ shortCode: params.slug });

    if (!urlRecord) {
      return NextResponse.redirect(new URL("/", new URL(request.url).origin));
    }

    // Increment click count in background
    incrementClickCount(params.slug).catch((error) => {
      console.error("Error incrementing click count:", error);
    });

    // Redirect to the original URL
    return NextResponse.redirect(urlRecord.originalUrl);
  } catch (error) {
    console.error("Error processing redirect:", error);
    return NextResponse.redirect(new URL("/", new URL(request.url).origin));
  }
}