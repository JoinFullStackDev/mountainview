"use client";

import { Heart, Users, Award, Target } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { CTA } from "@/components/shared/CTA";

const values = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Patient-Centered Care",
    description:
      "Every decision we make is guided by what's best for our patients and their families.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Focus",
    description:
      "We're deeply rooted in our community and committed to its health and well-being.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Excellence",
    description:
      "We maintain the highest standards of pharmaceutical care and professional service.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Innovation",
    description:
      "We embrace new technologies and methods to better serve our patients' needs.",
  },
];

const timeline = [
  {
    year: "1961",
    title: "Founded",
    description:
      "Mountain View Pharmacy opens its doors, serving the local community.",
  },
  {
    year: "1985",
    title: "Compounding Lab",
    description:
      "Expanded services to include custom compounding for patients with unique needs.",
  },
  {
    year: "2005",
    title: "Home Delivery",
    description:
      "Launched free home delivery service to improve medication access.",
  },
  {
    year: "2015",
    title: "Pill Packaging",
    description:
      "Introduced adherence packaging to help patients manage complex medication regimens.",
  },
  {
    year: "2020",
    title: "Immunizations",
    description:
      "Expanded vaccination services to include COVID-19 and other immunizations.",
  },
  {
    year: "Today",
    title: "Growing Strong",
    description:
      "Continuing our mission to provide personalized, expert pharmaceutical care.",
  },
];

const team = [
  {
    name: "Dr. Sarah Johnson, PharmD",
    role: "Lead Pharmacist",
    initials: "SJ",
  },
  {
    name: "Dr. Michael Chen, PharmD",
    role: "Clinical Pharmacist",
    initials: "MC",
  },
  {
    name: "Dr. Emily Rodriguez, PharmD",
    role: "Compounding Specialist",
    initials: "ER",
  },
  { name: "David Kim", role: "Pharmacy Manager", initials: "DK" },
];

export default function About() {
  return (
    <>
      <PageHero
        title="About Mountain View Pharmacy"
        description="For over 60 years, we've been more than just a pharmacy — we're a trusted partner in our community's health and well-being."
        breadcrumbs={[{ name: "About" }]}
        badge="Our Story"
      />

      {/* Story Section */}
      <Section variant="default" size="default">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Caring for Our Community Since 1961
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              What started as a small neighborhood pharmacy has grown into a
              trusted healthcare destination, but our core mission remains the
              same: to provide personalized, compassionate pharmaceutical care
              to every patient who walks through our doors.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our team of dedicated pharmacists takes the time to know each
              patient by name, understand their health needs, and provide
              guidance that goes beyond simply filling prescriptions. We believe
              that pharmacy care should be personal, accessible, and focused on
              outcomes.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today, we offer a comprehensive range of services including custom
              compounding, medication synchronization, pill packaging,
              immunizations, and free home delivery — all designed to make
              managing your health easier.
            </p>
          </div>
          <div className="card-base overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/building-exterior-1.png"
              alt="Mountain View Pharmacy building"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold">Your Neighborhood Pharmacy</h3>
              <p className="mt-3 text-muted-foreground">
                Locally owned and operated, proudly serving Mountain View and
                surrounding communities.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Values */}
      <Section variant="alt" size="default">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Mission & Values</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re guided by a commitment to excellence, compassion, and
            community service in everything we do.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="card-base text-center p-6">
              <div className="h-14 w-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary">{value.icon}</span>
              </div>
              <h3 className="font-semibold text-lg">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section variant="default" size="default">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our dedicated pharmacists and staff are here to serve you.
          </p>
        </div>
        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/team-group.jpg"
            alt="Mountain View Pharmacy team"
            className="w-full max-h-80 object-cover rounded-xl"
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="card-base text-center p-6">
              <div className="h-20 w-20 mx-auto rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-foreground">
                  {member.initials}
                </span>
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section variant="alt" size="default">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Journey</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Milestones in our history of serving the community.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-8 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  } hidden md:block`}
                >
                  <div className="card-base p-4">
                    <span className="text-sm font-semibold text-primary">
                      {item.year}
                    </span>
                    <h4 className="font-semibold mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 h-4 w-4 rounded-full bg-primary border-4 border-background md:-translate-x-2" />
                <div className="flex-1 pl-16 md:pl-0">
                  <div className="card-base p-4 md:hidden">
                    <span className="text-sm font-semibold text-primary">
                      {item.year}
                    </span>
                    <h4 className="font-semibold mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTA
        title="Experience the Mountain View Difference"
        description="Visit us today and discover why our community trusts us with their pharmaceutical care."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{
          label: "Transfer Rx",
          href: "/patients/transfer-prescriptions",
        }}
      />
    </>
  );
}
