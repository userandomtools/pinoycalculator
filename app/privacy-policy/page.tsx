import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pinoy Calculator privacy policy. Learn how we handle your data.",
};


const PrivacyPolicy = () => (
  <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-extrabold mb-6">Privacy Policy</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>Pinoy Calculator respects your privacy. Our calculators run entirely in your browser — we do not store any calculation data on our servers.</p>
        <h2 className="text-xl font-bold text-foreground">Information We Collect</h2>
        <p>We may collect anonymous usage analytics to improve our service. No personally identifiable information is collected through our calculators.</p>
        <h2 className="text-xl font-bold text-foreground">Contact</h2>
        <p>If you have questions about this policy, please visit our Contact page.</p>
      </div>
    </div>
  );

export default PrivacyPolicy;
