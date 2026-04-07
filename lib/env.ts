function normalizeUrl(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const withProtocol = trimmed.startsWith("http")
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  return (
    normalizeUrl(process.env.NEXT_PUBLIC_APP_URL) ||
    normalizeUrl(process.env.NEXTAUTH_URL) ||
    normalizeUrl(process.env.VERCEL_URL) ||
    "http://localhost:3000"
  );
}

export function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
