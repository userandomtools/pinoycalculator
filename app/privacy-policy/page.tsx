import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy 2026 | Pinoy Calculator",
  description: "Learn how Pinoy Calculator protects your data. We prioritize local execution, zero-data storage, and complete transparency for our users.",
};

const PrivacyPolicy = () => (
  <div className="container py-12 md:py-20 max-w-4xl">
    <div className="mb-10">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">Privacy Policy</h1>
      <p className="text-muted-foreground italic">Last updated: May 2026</p>
    </div>

    <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">1. Our Commitment to Privacy</h2>
        <p>
          At Pinoy Calculator, we believe that your financial and personal calculations should remain private. Our platform is designed with a "Local-First" architecture, meaning the vast majority of our calculations are performed directly on your device (browser-side) and never transmitted to our servers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">2. Data Collection \u0026 Usage</h2>
        <p>
          <strong>Calculation Data:</strong> We do not collect, store, or monitor the specific numbers you input into our calculators. Whether you are computing your salary, a bank loan, or gaming stats, that data stays in your browser.
        </p>
        <p>
          <strong>Analytical Data:</strong> We use industry-standard, privacy-compliant analytics tools (like Google Analytics or Vercel Analytics) to track anonymous usage patterns. This helps us understand which calculators are popular and where we can improve our user experience. This data is aggregated and does not identify individual users.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">3. Cookies \u0026 Local Storage</h2>
        <p>
          We use cookies to maintain your preferences (such as Dark Mode settings) and for analytical purposes. You can choose to disable cookies in your browser settings, though some personalized features may not function correctly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">4. Third-Party Services</h2>
        <p>
          Our website may contain links to government portals (.gov.ph) or educational resources (.edu.ph). We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy statements of any site you visit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">5. Data Privacy Act of 2012 (Republic Act No. 10173)</h2>
        <p>
          Pinoy Calculator operates in compliance with the Philippine Data Privacy Act of 2012. We ensure that all processing of personal information (if any, such as via email contact) is done with adherence to the principles of transparency, legitimate purpose, and proportionality.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">6. Updates to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of any significant changes by posting the new policy on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">7. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy, please reach out to us at <a href="mailto:hello@pinoycalculator.com" className="text-primary hover:underline">hello@pinoycalculator.com</a>.
        </p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;
