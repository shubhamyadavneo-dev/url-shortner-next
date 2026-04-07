import { customAlphabet } from "nanoid";
import { getSiteUrl } from "@/lib/env";

// Use a custom alphabet for short codes (alphanumeric)
const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-",
  6
);

export function generateShortCode(): string {
  return nanoid();
}

export function validateUrl(url: string): boolean {
  try {
    const newUrl = new URL(url);
    // Validate protocol
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export function isValidShortCode(code: string): boolean {
  return /^[a-zA-Z0-9_-]{1,10}$/.test(code);
}

export function getBaseUrl(): string {
  return getSiteUrl();
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function calculateDaysAgo(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
