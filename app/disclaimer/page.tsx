import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Pinoy Calculator disclaimer. Our calculators are for informational purposes only.",
};


const Disclaimer = () => (
  <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-extrabold mb-6">Disclaimer</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p>The calculators and information on Pinoy Calculator are provided for informational and educational purposes only. They should not be considered as professional financial, legal, medical, or any other type of advice.</p>
        <p>While we strive for accuracy, results may vary based on individual circumstances. Always consult with qualified professionals for important financial, legal, or health decisions.</p>
        <p>We reference official Philippine government sources (DOLE, BIR, BSP, SSS, Pag-IBIG) but are not affiliated with any government agency.</p>
      </div>
    </div>
  );

export default Disclaimer;
