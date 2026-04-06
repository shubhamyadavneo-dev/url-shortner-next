import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect to get started",
      features: [
        "5 shortened URLs per month",
        "Basic analytics",
        "QR code generation",
        "7-day link history",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      description: "For active users",
      features: [
        "Unlimited shortened URLs",
        "Advanced analytics",
        "Custom short codes",
        "QR code generation",
        "Link expiration options",
        "Priority email support",
        "API access",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom branding",
        "Advanced security features",
        "White-label solution",
        "SLA guarantee",
        "24/7 phone support",
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="container-custom py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 transition-all ${
                plan.highlighted
                  ? "glass-effect border-2 border-primary scale-105"
                  : "glass-effect border border-gray-200 dark:border-slate-800"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-600 dark:text-gray-400">
                    /{plan.period}
                  </span>
                )}
              </div>

              <Link
                href="/auth/signin"
                className={`block w-full py-2 rounded-lg font-medium text-center mb-6 transition-all ${
                  plan.highlighted
                    ? "gradient-button text-white"
                    : "border border-primary text-primary hover:bg-primary/10"
                }`}
              >
                Get Started
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 p-8 rounded-lg glass-effect border border-gray-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I upgrade or downgrade my plan anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee if you're not satisfied with your subscription.",
              },
              {
                q: "Is there a contract?",
                a: "No contracts! All our plans are month-to-month and can be cancelled anytime.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards and PayPal for your convenience.",
              },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
