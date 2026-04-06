"use client";

import Link from "next/link";
import { Mail, Github, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              LinkSnip
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A modern URL shortener for sharing links with style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block"
              >
                Home
              </Link>
              <Link
                href="/features"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block"
              >
                Pricing
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a
                href="mailto:support@linksnip.dev"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a
                href="https://github.com/linksnip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Coffee Support */}
        <div className="my-8 p-6 rounded-lg glass-effect text-center">
          <h4 className="font-semibold mb-3 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Support Our Work
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            If you find LinkSnip useful, consider supporting us with a coffee!
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.buymeacoffee.com/linksnip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 rounded-lg gradient-button text-white font-medium transition-all"
          >
            Buy Me A Coffee ☕
          </motion.a>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-slate-800 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            &copy; {currentYear} LinkSnip. All rights reserved. | Made with{" "}
            <span className="text-red-500">❤️</span> by developers
          </p>
        </div>
      </div>
    </footer>
  );
}
