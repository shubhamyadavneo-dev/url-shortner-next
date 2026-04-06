"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { shortenUrl } from "@/lib/actions/urlActions";
import { validateUrl } from "@/lib/utils";
import { Copy, Check, Loader, QrCode as QrCodeIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

interface ShortenedUrl {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  qrCode: string;
  title?: string;
  description?: string;
}

export default function UrlShortenerForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shortened, setShortened] = useState<ShortenedUrl | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please sign in to shorten URLs");
      router.push("/auth/signin");
      return;
    }

    if (!validateUrl(url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setLoading(true);
    try {
      const result = await shortenUrl({
        originalUrl: url,
        title: title || undefined,
        description: description || undefined,
      });

      if (result.success && result.data) {
        setShortened(result.data);
        setUrl("");
        setTitle("");
        setDescription("");
        toast.success("URL shortened successfully!");
      } else {
        toast.error(result.message || "Failed to shorten URL");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!shortened ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleShorten}
            className="space-y-6"
          >
            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium mb-2">URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                className="w-full px-4 py-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none bg-gray-100 dark:bg-slate-900 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                required
              />
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My awesome link"
                  className="w-full px-4 py-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none bg-gray-100 dark:bg-slate-900 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description"
                  className="w-full px-4 py-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none bg-gray-100 dark:bg-slate-900 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg gradient-button text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Shortening...
                </>
              ) : (
                "Shorten URL"
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            {/* Success Message */}
            <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-center">
              ✨ Your URL has been shortened successfully!
            </div>

            {/* QR Code */}
            {showQR && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center p-4 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800"
              >
                <img
                  src={shortened.qrCode}
                  alt="QR Code"
                  className="w-40 h-40"
                />
              </motion.div>
            )}

            {/* Short URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Short URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shortened.shortUrl}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-primary bg-gray-100 dark:bg-slate-900 font-mono text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(shortened.shortUrl)}
                  className="px-4 py-3 rounded-lg gradient-button text-white flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Original URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Original URL</label>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-900 text-sm text-gray-600 dark:text-gray-400 break-all">
                {shortened.originalUrl}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQR(!showQR)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                <QrCodeIcon className="w-4 h-4" />
                {showQR ? "Hide" : "Show"} QR Code
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(shortened.shortUrl)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShortened(null)}
                className="px-4 py-2 rounded-lg gradient-button text-white"
              >
                Create Another
              </motion.button>
            </div>

            {/* Dashboard Link */}
            <div className="text-center">
              <Link
                href="/dashboard"
                className="text-primary hover:text-secondary transition-colors text-sm font-medium"
              >
                View All Your Links →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign In Prompt */}
      {!session?.user && (
        <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-center text-sm">
          <p>
            <Link href="/auth/signin" className="font-medium hover:underline">
              Sign in with Google or GitHub
            </Link>{" "}
            to shorten URLs
          </p>
        </div>
      )}
    </div>
  );
}
