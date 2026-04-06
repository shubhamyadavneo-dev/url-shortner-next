import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container-custom py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p>
                At LinkSnip ("we", "us", or "our"), we are committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p>We collect information in the following ways:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Information you provide directly (name, email, from OAuth providers)</li>
                <li>Information about the URLs you shorten and their performance</li>
                <li>Click data and analytics information</li>
                <li>Device and browser information</li>
                <li>Geographic location (IP-based)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our services</li>
                <li>Generate analytics and reports</li>
                <li>Send you service updates and announcements</li>
                <li>Improve our platform and user experience</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p>
                We implement industry-standard security measures including SSL encryption, 
                secure authentication, and regular security audits to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with 
                service providers who assist us in operating our website and conducting our business, 
                all under strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Port your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of 
                significant changes by email or by posting a prominent notice on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@linksnip.dev" className="text-primary hover:underline">
                  privacy@linksnip.dev
                </a>
              </p>
            </section>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
