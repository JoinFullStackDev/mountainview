"use client";

import { useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Navigation,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";

export default function ContactClient() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
                    <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                    <p>Saturday – Sunday: Closed</p>
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
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/yYF7Ys6ExXiOANdyRR04"
              style={{ width: "100%", minHeight: "440px", border: "none", borderRadius: "8px" }}
              id="inline-yYF7Ys6ExXiOANdyRR04"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Contact Form"
              data-height="440"
              data-layout-iframe-id="inline-yYF7Ys6ExXiOANdyRR04"
              data-form-id="yYF7Ys6ExXiOANdyRR04"
              title="Contact Form"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
