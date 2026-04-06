"use server";

import { connectDB } from "@/lib/mongodb";
import { Url } from "@/lib/models/Url";
import { generateShortCode, validateUrl, getBaseUrl } from "@/lib/utils";
import QRCode from "qrcode";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface ShortenUrlRequest {
  originalUrl: string;
  customShortCode?: string;
  title?: string;
  description?: string;
  expiresAt?: Date;
}

interface ShortenUrlResponse {
  success: boolean;
  short?: string;
  message?: string;
  data?: {
    shortCode: string;
    originalUrl: string;
    shortUrl: string;
    qrCode: string;
    title?: string;
    description?: string;
  };
}

export async function shortenUrl(
  request: ShortenUrlRequest
): Promise<ShortenUrlResponse> {
  try {
    const session = await getServerSession(authOptions);

    // Validate URL
    if (!validateUrl(request.originalUrl)) {
      return {
        success: false,
        message: "Invalid URL format",
      };
    }

    await connectDB();

    // Generate or use custom short code
    let shortCode = request.customShortCode || generateShortCode();

    // Check if short code already exists
    let existing = await Url.findOne({ shortCode });
    if (existing) {
      if (request.customShortCode) {
        return {
          success: false,
          message: "Short code already exists",
        };
      }
      // Generate a new one if it's auto-generated
      shortCode = generateShortCode();
      existing = await Url.findOne({ shortCode });
    }

    // Generate QR Code
    const baseUrl = getBaseUrl();
    const shortUrl = `${baseUrl}/${shortCode}`;
    const qrCode = await QRCode.toDataURL(shortUrl);

    // Create URL record
    const urlRecord = new Url({
      shortCode,
      originalUrl: request.originalUrl,
      title: request.title || "",
      description: request.description || "",
      qrCode,
      userId: session?.user?.email || "",
      expiresAt: request.expiresAt,
    });

    await urlRecord.save();

    return {
      success: true,
      data: {
        shortCode,
        originalUrl: request.originalUrl,
        shortUrl,
        qrCode,
        title: request.title,
        description: request.description,
      },
    };
  } catch (error) {
    console.error("Error shortening URL:", error);
    return {
      success: false,
      message: "Failed to shorten URL",
    };
  }
}

export async function getUserUrls(limit?: number) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    const urls = await Url.find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .limit(limit || 100)
      .lean();

    return {
      success: true,
      data: urls.map((url) => ({
        _id: url._id,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl,
        shortUrl: `${getBaseUrl()}/${url.shortCode}`,
        title: url.title,
        description: url.description,
        qrCode: url.qrCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    return {
      success: false,
      message: "Failed to fetch URLs",
    };
  }
}

export async function deleteUrl(shortCode: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    const result = await Url.deleteOne({
      shortCode,
      userId: session.user.email,
    });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: "URL not found or you don't have permission to delete it",
      };
    }

    return {
      success: true,
      message: "URL deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting URL:", error);
    return {
      success: false,
      message: "Failed to delete URL",
    };
  }
}

export async function updateUrl(
  shortCode: string,
  updates: { title?: string; description?: string }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    const result = await Url.findOneAndUpdate(
      {
        shortCode,
        userId: session.user.email,
      },
      updates,
      { new: true }
    );

    if (!result) {
      return {
        success: false,
        message: "URL not found or you don't have permission to update it",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error updating URL:", error);
    return {
      success: false,
      message: "Failed to update URL",
    };
  }
}

export async function getUrlStats(shortCode: string) {
  try {
    await connectDB();

    const url = (await Url.findOne({ shortCode }).lean()) as any;

    if (!url) {
      return {
        success: false,
        message: "URL not found",
      };
    }

    return {
      success: true,
      data: {
        shortCode: url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
        lastAccessed: url.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error fetching URL stats:", error);
    return {
      success: false,
      message: "Failed to fetch stats",
    };
  }
}

export async function incrementClickCount(shortCode: string) {
  try {
    await connectDB();

    await Url.updateOne(
      { shortCode },
      {
        $inc: { clicks: 1 },
        updatedAt: new Date(),
      }
    );

    return { success: true };
  } catch (error) {
    console.error("Error incrementing click count:", error);
    return { success: false };
  }
}
