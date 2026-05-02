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
        <h2 className="text-2xl font-bold text-foreground mb-3">4. Google AdSense \u0026 Advertising</h2>
        <p>
          We use third-party advertising companies to serve ads when you visit our Website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Google, as a third-party vendor, uses cookies to serve ads on Pinoy Calculator.</li>
          <li>Google's use of the advertising cookie enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">5. Third-Party Services</h2>
        <p>
          Our website may contain links to government portals (.gov.ph) or educational resources (.edu.ph). We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy statements of any site you visit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">6. Children&apos;s Privacy</h2>
        <p>
          Pinoy Calculator does not knowingly collect or solicit personal information from anyone under the age of 13. If you are under 13, please do not attempt to register for the Website or send any personal information about yourself to us. If we learn that we have collected personal information from a child under age 13, we will delete that information as quickly as possible.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">7. Your Data Subject Rights</h2>
        <p>
          Under the Philippine Data Privacy Act, you have the following rights regarding any personal information you provide (such as when emailing us):
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Right to be Informed:</strong> To know how your data is being processed.</li>
          <li><strong>Right to Access:</strong> To request a copy of the data we hold about you.</li>
          <li><strong>Right to Rectification:</strong> To correct any inaccuracies in your data.</li>
          <li><strong>Right to Erasure:</strong> To request the deletion of your data from our systems.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">8. Data Privacy Act of 2012 (Republic Act No. 10173)</h2>
        <p>
          Pinoy Calculator operates in compliance with the Philippine Data Privacy Act of 2012. We ensure that all processing of personal information (if any, such as via email contact) is done with adherence to the principles of transparency, legitimate purpose, and proportionality.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">9. Updates to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of any significant changes by posting the new policy on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-3">10. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy, please reach out to our team at <a href="mailto:hello@pinoycalculator.com" className="text-primary hover:underline">hello@pinoycalculator.com</a>.
        </p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;
