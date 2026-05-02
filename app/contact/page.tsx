import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock, Send, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Pinoy Calculator 2026: Reach Our Editorial Team",
  description: "Have a tool request or feedback? Contact the Pinoy Calculator team. We are available for tool suggestions, partnership inquiries, and technical support.",
};

const Contact = () => (
  <div className="container py-12 md:py-20 max-w-5xl">
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">Get in Touch</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Have a suggestion for a new calculator or found an issue? Our editorial team is here to help and listen to your feedback.
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

    <div className="max-w-3xl mx-auto rounded-3xl border border-border bg-muted/30 p-8 md:p-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
        <Calculator className="h-6 w-6 text-primary" />
        Request a Specific Calculator
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Is there a specific calculation you perform often that isn't on our site? Whether it's for a niche hobby, a specific Philippine tax rule, or a local business need, we want to build it for you.
        </p>
        <p>
          When requesting a tool, please include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The name of the calculation/tool</li>
          <li>The formula or official government link (if applicable)</li>
          <li>A brief explanation of how you intend to use it</li>
        </ul>
        <div className="pt-4">
          <Button asChild className="gap-2 rounded-xl">
             <a href="mailto:hello@pinoycalculator.com">
               Email Your Request <Send className="h-4 w-4" />
             </a>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
