"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Share2, Smartphone, QrCode, Lock, Zap as FastIcon } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast URLs",
      description: "Get instant URL shortening with sub-millisecond response times powered by our edge-optimized infrastructure.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption, DDoS protection, and constant security monitoring ensure your links are always safe.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track clicks, geographic data, referrer information, and device types with detailed real-time analytics.",
    },
    {
      icon: Share2,
      title: "One-Click Sharing",
      description: "Share your shortened URLs directly to social media, email, and messaging platforms with a single click.",
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      description: "Every shortened URL comes with an auto-generated QR code for offline sharing and easy mobile access.",
    },
    {
      icon: Lock,
      title: "Custom Branding",
      description: "Create branded short links that match your identity and build trust with your audience.",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Fully responsive design that works flawlessly on all devices from smartphones to desktops.",
    },
    {
      icon: FastIcon,
      title: "API Access",
      description: "Complete REST API for integrating URL shortening into your applications and workflows.",
    },
  ];

  return (
    <>
      <Header />
      <main>
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features for Every Use Case
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              LinkSnip provides everything you need to create, manage, and track shortened URLs with style.
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
                  className="p-6 rounded-lg glass-effect border border-gray-200 dark:border-slate-800 hover:border-primary/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
