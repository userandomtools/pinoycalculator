import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Pinoy Calculator.",
};


const Contact = () => (
  <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-extrabold mb-6">Contact Us</h1>
      <p className="text-muted-foreground mb-6">Have a suggestion for a new calculator or found an issue? We'd love to hear from you!</p>
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Email us at: <span className="font-medium text-foreground">hello@pinoycalculator.com</span></p>
      </div>
    </div>
  );

export default Contact;
