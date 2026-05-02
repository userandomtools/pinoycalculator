import type { Metadata } from "next";
import { AlertTriangle, ShieldCheck, Scale, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Disclaimer \u0026 Accuracy Statement | Pinoy Calculator",
  description: "Read our full disclaimer regarding calculator accuracy and professional advice. Pinoy Calculator tools are for informational purposes only.",
};

const Disclaimer = () => (
  <div className="container py-12 md:py-20 max-w-4xl">
    <div className="mb-10 text-center md:text-left">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-4">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">Disclaimer</h1>
      <p className="text-muted-foreground text-lg max-w-2xl">
        Important information regarding the accuracy, use, and professional limitations of the tools on Pinoy Calculator.
      </p>
    </div>

    <div className="grid gap-6 mb-12">
      <Card className="border-amber-200 bg-amber-50/30">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-amber-800 mb-3 flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Not Professional Advice
          </h2>
          <p className="text-amber-900/80 leading-relaxed">
            The calculators provided on this website are intended for <strong>informational and educational purposes only</strong>. The results generated do not constitute financial, legal, medical, tax, or engineering advice. Pinoy Calculator is not a licensed financial institution, law firm, or medical provider.
          </p>
        </CardContent>
      </Card>

      <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Accuracy Statement
          </h2>
          <p>
            We make every effort to ensure that our calculators reflect the most current Philippine laws, tax rates, and government regulations (including BIR, SSS, PhilHealth, Pag-IBIG, and DOLE standards). However, formulas and rates can change frequently. We do not guarantee that the results are 100% accurate, complete, or up-to-date at all times.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
            <Landmark className="h-6 w-6 text-primary" />
            Verify with Official Sources
          </h2>
          <p>
            Users are strongly encouraged to verify any calculation results with official government portals or qualified professionals before making significant financial or legal commitments. For official computations, please refer to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><a href="https://www.bir.gov.ph" className="text-primary hover:underline">Bureau of Internal Revenue (BIR)</a></li>
            <li><a href="https://www.sss.gov.ph" className="text-primary hover:underline">Social Security System (SSS)</a></li>
            <li><a href="https://www.pagibigfund.gov.ph" className="text-primary hover:underline">Pag-IBIG Fund</a></li>
            <li><a href="https://www.dole.gov.ph" className="text-primary hover:underline">Department of Labor and Employment (DOLE)</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">Limitation of Liability</h2>
          <p>
            By using this website, you agree that Pinoy Calculator, its owners, and its developers shall not be held liable for any financial losses, legal issues, or damages resulting from the use of or reliance on the information provided by our tools.
          </p>
        </section>
      </div>
    </div>
  </div>
);

export default Disclaimer;
