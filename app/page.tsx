"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UrlShortenerForm from "@/components/UrlShortenerForm";
import { ArrowRight, Zap, Shield, BarChart3, Share2, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session?.user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signin");
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get your shortened URL in milliseconds with our optimized infrastructure",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your URLs are encrypted and protected with enterprise-grade security",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track clicks, geographic data, and more with comprehensive analytics",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your shortened URLs across all social media platforms instantly",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Works seamlessly on desktop, tablet, and mobile devices",
    },
    {
      icon: QrCode,
      title: "QR Codes",
      description: "Generate QR codes for every shortened URL automatically",
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container-custom text-center space-y-8">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                Shorten URLs with{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Style & Elegance
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                LinkSnip transforms your long, messy URLs into beautiful, shareable links. 
                Perfect for sharing on social media, in emails, and everywhere else.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-8 py-3 rounded-lg gradient-button text-white font-medium flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </motion.button>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 font-medium transition-colors"
              >
                Learn More
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4 md:gap-8 mt-12 py-8 border-t border-b border-gray-200 dark:border-slate-800"
            >
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">10k+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">1M+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">URLs Shortened</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">99.9%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Shortener Form Section */}
        <section className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-slate-900/50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Start Shortening Now
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                Just paste your long URL below and we'll create a short, shareable link instantly.
              </p>
              <UrlShortenerForm />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 px-4">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose LinkSnip?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Powerful features designed to make link sharing simple, effective, and beautiful.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-6 rounded-lg glass-effect border border-gray-200 dark:border-slate-800 hover:border-primary/50 transition-all"
                  >
                    <div className="blur-gradient" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          </div>
          <div className="container-custom text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to shorten your URLs?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Join thousands of users who are already using LinkSnip to share links with style.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="inline-block px-8 py-3 rounded-lg gradient-button text-white font-medium hover:shadow-lg transition-all cursor-pointer"
            >
              Get Started Free <ArrowRight className="w-5 h-5 inline ml-2" />
            </motion.button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function QrCode(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
