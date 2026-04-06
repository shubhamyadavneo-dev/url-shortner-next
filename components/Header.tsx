"use client";

import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Moon, Sun, Menu, X, LogOut, LayoutDashboard, LogIn, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-200 dark:border-slate-800">
      <nav className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          > */}
            <div className="relative">
            <Sparkles className="w-8 h-8 text-primary" />
            </div>
          {/* </motion.div> */}
          <span className="hidden sm:inline font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            LinkSnip
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/features"
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </motion.button>

          {/* Auth Section */}
          {status === "loading" ? (
            <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">Loading...</div>
          ) : session?.user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium gradient-button text-white hover:shadow-lg"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50"
        >
          <div className="container-custom py-4 space-y-3">
            <Link
              href="/"
              className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              Pricing
            </Link>
            {session?.user && (
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
