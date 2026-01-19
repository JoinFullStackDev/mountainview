"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Navigation,
  CheckCircle,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message || message.trim().length < 10) {
      newErrors.message = "Please enter a message (at least 10 characters)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setFormState("success");
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        description="Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible."
        breadcrumbs={[{ name: "Contact" }]}
        badge="Get in Touch"
      />

      <Section variant="default" size="default">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Visit Us</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    230 S Main Street
                    <br />
                    Bountiful, UT 84010
                  </p>
                  <Button asChild variant="link" className="px-0 mt-2">
                    <a
                      href="https://maps.google.com/?q=230+S+Main+Street,+Bountiful,+UT+84010"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">801-295-3439</p>
                  <p className="text-muted-foreground text-sm">
                    Toll Free: 1-888-201-6341
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Fax: 801-299-1696
                  </p>
                  <Button asChild variant="link" className="px-0 mt-2">
                    <a href="tel:+18012953439">Call Now</a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">
                    info@mtviewpharmacy.com
                  </p>
                  <Button asChild variant="link" className="px-0 mt-2">
                    <a href="mailto:info@mtviewpharmacy.com">Send Email</a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Monday – Friday: 9:00 AM – 7:00 PM</p>
                    <p>Saturday: 9:00 AM – 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Building Exterior */}
            <div className="mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/building-exterior-2.png"
                alt="Mountain View Pharmacy building exterior"
                className="w-full aspect-video rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            {formState === "success" ? (
              <div className="card-base p-8 text-center">
                <div className="h-16 w-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground">
                  Thank you for contacting us. We&apos;ll get back to you as
                  soon as possible.
                </p>
                <Button
                  onClick={() => setFormState("idle")}
                  variant="outline"
                  className="mt-6"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
