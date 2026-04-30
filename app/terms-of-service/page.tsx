import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Pinoy Calculator terms of service.",
};


const TermsOfService = () => (
  <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-extrabold mb-6">Terms of Service</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p>By using Pinoy Calculator, you agree to the following terms:</p>
        <h2 className="text-xl font-bold text-foreground">Use of Service</h2>
        <p>Our calculators are free to use for personal and educational purposes. All calculations are performed in your browser.</p>
        <h2 className="text-xl font-bold text-foreground">Accuracy</h2>
        <p>While we strive for accuracy, we cannot guarantee that all calculations are error-free. Please verify important calculations with qualified professionals.</p>
        <h2 className="text-xl font-bold text-foreground">Changes</h2>
        <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of updated terms.</p>
      </div>
    </div>
  );

export default TermsOfService;
