import { connectDB } from "@/lib/mongodb";
import { Url } from "@/lib/models/Url";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const urlRecord = await Url.findOne({ shortCode: params.slug }).lean() as any;

    if (urlRecord) {
      return {
        title: urlRecord?.title || "LinkSnip - Shortened URL",
        description: urlRecord?.description || "Redirecting to the target URL...",
        openGraph: {
          title: urlRecord?.title || "LinkSnip - Shortened URL",
          description: urlRecord?.description || "Redirecting to the target URL...",
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "LinkSnip - Shortened URL",
    description: "Redirecting to the target URL...",
  };
}

export default async function RedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    await connectDB();

    const urlRecord = await Url.findOne({ shortCode: params.slug });

    if (!urlRecord) {
      redirect("/");
    }

    // Increment click count in the background without blocking the redirect.
    Url.updateOne(
      { shortCode: params.slug },
      {
        $inc: { clicks: 1 },
        updatedAt: new Date(),
      }
    ).catch((error) => {
      console.error("Error incrementing click count:", error);
    });

    // Redirect to the original URL
    redirect(urlRecord.originalUrl);
  } catch (error) {
    console.error("Error processing redirect:", error);
    redirect("/");
  }
}
