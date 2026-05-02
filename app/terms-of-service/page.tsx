import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service 2026 | Pinoy Calculator",
  description: "Read the Terms of Service for using Pinoy Calculator. Understand our usage rules, limitations of liability, and educational purpose.",
};

const TermsOfService = () => (
  <div className="container py-12 md:py-20 max-w-4xl">
    <div className="mb-10">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">Terms of Service</h1>
      <p className="text-muted-foreground italic">Last updated: May 2026</p>
    </div>

    <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Pinoy Calculator (the "Website"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">2. Educational \u0026 Informational Purpose</h2>
        <p>
          All calculators and content provided on this Website are for <strong>educational and informational purposes only</strong>. While we strive for 100% accuracy based on official Philippine government formulas (BIR, SSS, DOLE, etc.), our results should not be used as the sole basis for critical financial, legal, or medical decisions. Always verify results with official sources or qualified professionals.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">3. Use of Services</h2>
        <p>
          You agree to use the Website only for lawful purposes. You are prohibited from:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Attempting to interfere with the proper working of the Website.</li>
          <li>Using automated systems (bots, spiders) to scrape content without permission.</li>
          <li>Misrepresenting the accuracy of the tools for deceptive purposes.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
        <p>
          The custom logic, code, design, and written content on Pinoy Calculator are the property of our team. You may use our calculators for personal or business use, but you may not reproduce, distribute, or "frame" our tools on other websites without explicit written consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">5. Third-Party Advertisements</h2>
        <p>
          We use third-party advertising companies, such as Google AdSense, to serve ads when you visit our Website. These companies may use cookies and web beacons to collect data in the course of ads being served. Pinoy Calculator has no access to or control over these cookies that are used by third-party advertisers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">6. Limitation of Liability</h2>
        <p>
          Pinoy Calculator and its developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools, or from any errors or omissions in the content. <strong>Use of the calculators is at your own risk.</strong>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">6. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of the Republic of the Philippines.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of the Website following any changes constitutes acceptance of the new Terms of Service.
        </p>
      </section>
    </div>
  </div>
);

export default TermsOfService;
