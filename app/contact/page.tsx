import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock, Send, Calculator, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Pinoy Calculator 2026: Reach Our Team",
  description: "Have a tool request or feedback? Contact the Pinoycalculator team. We are available for tool suggestions, partnership inquiries, and technical support.",
};

const Contact = () => (
  <div className="container py-12 md:py-20 max-w-5xl">
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">Get in Touch</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Have a suggestion for a new calculator or found an issue? The Pinoycalculator team is here to help and listen to your feedback.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <Card className="border-border/60 bg-card">
        <CardContent className="p-6 text-center">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-1 text-foreground">Email Us</h3>
          <p className="text-sm text-muted-foreground mb-3">General inquiries & feedback</p>
          <a href="mailto:hello@pinoycalculator.com" className="text-primary font-medium hover:underline">
            hello@pinoycalculator.com
          </a>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card">
        <CardContent className="p-6 text-center">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-1 text-foreground">Tool Requests</h3>
          <p className="text-sm text-muted-foreground mb-3">Suggest a new calculator</p>
          <span className="text-foreground font-medium italic">We build what you search for!</span>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card">
        <CardContent className="p-6 text-center">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-1 text-foreground">Response Time</h3>
          <p className="text-sm text-muted-foreground mb-3">Average turnaround time</p>
          <span className="text-foreground font-medium">24 - 48 Hours</span>
        </CardContent>
      </Card>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="rounded-3xl border border-border bg-muted/30 p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
          <Calculator className="h-6 w-6 text-primary" />
          Request a Specific Calculator
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
          <p>
            Is there a specific calculation you perform often that isn't on our site? Whether it's for a niche hobby, a specific Philippine tax rule, or a local business need, we want to build it for you.
          </p>
          <p>
            When requesting a tool, please include the name of the calculation, the formula if available, and how you intend to use it.
          </p>
          <div className="pt-4">
            <Button asChild className="gap-2 rounded-xl w-full sm:w-auto">
               <a href="mailto:hello@pinoycalculator.com?subject=New Tool Request">
                 Email Your Request <Send className="h-4 w-4" />
               </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Report a Bug or Correction
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
          <p>
            Accuracy is our top priority. If you notice a calculation error, an outdated tax rate, or a technical bug, please let us know immediately.
          </p>
          <p>
            <strong>What to include:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 font-medium text-foreground">
            <li>The URL of the tool or guide</li>
            <li>Description of the error or bug</li>
            <li>The expected result vs. what you saw</li>
          </ul>
          <div className="pt-4">
            <Button asChild variant="secondary" className="gap-2 rounded-xl w-full sm:w-auto border-primary/20">
               <a href="mailto:hello@pinoycalculator.com?subject=Bug Report / Correction">
                 Submit Report <ArrowRight className="h-4 w-4" />
               </a>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div className="rounded-3xl border border-border bg-card p-8 md:p-12 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Media & Partnerships</h2>
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-center">
          Pinoy Calculator is a high-authority financial utility platform. We are open to collaborations with fintech companies, educational institutions, and financial services that align with our mission.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 pt-4">
          <div className="text-center p-4 rounded-2xl bg-muted/50">
             <h4 className="font-bold text-foreground mb-1">Advertising</h4>
             <p className="text-xs">Contextual ad units and branded tools.</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-muted/50">
             <h4 className="font-bold text-foreground mb-1">API Access</h4>
             <p className="text-xs">Integrate our logic into your app.</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-muted/50">
             <h4 className="font-bold text-foreground mb-1">Content</h4>
             <p className="text-xs">Expert guest posts and data insights.</p>
          </div>
        </div>
        <div className="text-center pt-6">
          <a href="mailto:partnerships@pinoycalculator.com" className="text-primary font-bold hover:underline">
            partnerships@pinoycalculator.com
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
