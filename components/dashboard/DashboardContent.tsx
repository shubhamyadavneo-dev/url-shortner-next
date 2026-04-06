"use client";

import { useEffect, useState } from "react";
import { getUserUrls, deleteUrl } from "@/lib/actions/urlActions";
import { Copy, Check, Trash2, Eye, QrCode, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import UrlShortenerForm from "@/components/UrlShortenerForm";
import { calculateDaysAgo } from "@/lib/utils";

interface UrlRecord {
  _id: string;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  title?: string;
  description?: string;
  qrCode?: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardContent() {
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState<string | null>(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const result = await getUserUrls();
      if (result.success) {
        setUrls((result.data as UrlRecord[]) || []);
      }
    } catch (error) {
      toast.error("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (shortCode: string) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) return;

    try {
      const result = await deleteUrl(shortCode);
      if (result.success) {
        setUrls(urls.filter((url) => url.shortCode !== shortCode));
        toast.success("URL deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete URL");
      }
    } catch (error) {
      toast.error("Failed to delete URL");
    }
  };

  const handleRefresh = () => {
    fetchUrls();
    setShowForm(false);
  };

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your shortened URLs and track performance
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg gradient-button text-white font-medium w-fit"
        >
          <Plus className="w-5 h-5" />
          Create New
        </motion.button>
      </motion.div>

      {/* Form Section */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 p-6 rounded-lg glass-effect border border-gray-200 dark:border-slate-800"
          >
            <UrlShortenerForm />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
              >
                Refresh List
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="p-4 rounded-lg glass-effect border border-gray-200 dark:border-slate-800 text-center">
          <p className="text-2xl md:text-3xl font-bold text-primary">
            {urls.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Links</p>
        </div>
        <div className="p-4 rounded-lg glass-effect border border-gray-200 dark:border-slate-800 text-center">
          <p className="text-2xl md:text-3xl font-bold text-primary">
            {urls.reduce((sum, url) => sum + url.clicks, 0)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</p>
        </div>
        <div className="p-4 rounded-lg glass-effect border border-gray-200 dark:border-slate-800 text-center col-span-2 md:col-span-1">
          <p className="text-2xl md:text-3xl font-bold text-primary">
            {urls.length > 0
              ? (urls.reduce((sum, url) => sum + url.clicks, 0) / urls.length).toFixed(1)
              : 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Clicks</p>
        </div>
      </motion.div>

      {/* URLs List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-gray-300 dark:border-slate-700 border-t-primary rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading your URLs...
          </p>
        </div>
      ) : urls.length === 0 ? (
        <div className="text-center py-12 rounded-lg glass-effect border border-gray-200 dark:border-slate-800">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No shortened URLs yet. Create one to get started!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-6 py-2 rounded-lg gradient-button text-white font-medium"
          >
            Create Your First Link
          </motion.button>
        </div>
      ) : (
        <div className="space-y-3">
          {urls.map((url) => (
            <motion.div
              key={url._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg glass-effect border border-gray-200 dark:border-slate-800 hover:border-primary/50 transition-all"
            >
              <div className="space-y-3">
                {/* Title and Meta */}
                <div>
                  <h3 className="font-semibold text-lg">
                    {url.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {url.description || "No description"}
                  </p>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Short URL */}
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 rounded bg-gray-100 dark:bg-slate-900 text-sm font-mono overflow-hidden text-ellipsis">
                      {url.shortUrl}
                    </code>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopy(url.shortUrl, url._id)}
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {copied === url._id ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>

                  {/* Original URL */}
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 rounded bg-gray-100 dark:bg-slate-900 text-sm font-mono overflow-hidden text-ellipsis line-clamp-1">
                      {url.originalUrl}
                    </code>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopy(url.originalUrl, `orig-${url._id}`)}
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {copied === `orig-${url._id}` ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Stats and Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium">{url.clicks}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        clicks
                      </span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {calculateDaysAgo(new Date(url.createdAt))}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {url.qrCode && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setShowQRCode(
                            showQRCode === url._id ? null : url._id
                          )
                        }
                        className="p-2 rounded hover:bg-primary/10 text-primary transition-colors"
                        title="View QR Code"
                      >
                        <QrCode className="w-5 h-5" />
                      </motion.button>
                    )}
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors"
                      title="Open link"
                    >
                      <Eye className="w-5 h-5" />
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(url.shortCode)}
                      className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* QR Code Display */}
                <AnimatePresence>
                  {showQRCode === url._id && url.qrCode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-center pt-3 border-t border-gray-200 dark:border-slate-700"
                    >
                      <img
                        src={url.qrCode}
                        alt="QR Code"
                        className="w-32 h-32 rounded-lg"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
