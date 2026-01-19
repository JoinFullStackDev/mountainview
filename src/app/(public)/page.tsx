"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Car,
  Truck,
  Pill,
  Syringe,
  RefreshCw,
  ClipboardCheck,
  Users,
  Stethoscope,
  Shield,
  Heart,
  Clock,
  Award,
  ArrowRight,
  Phone,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Card } from "@/components/shared/Card";
import { Testimonial } from "@/components/shared/Testimonial";
import { FAQ } from "@/components/shared/FAQ";
import { CTA } from "@/components/shared/CTA";
import { Button } from "@/components/ui/button";

const quickServices = [
  {
    icon: <Car className="h-6 w-6" />,
    title: "Drive-Thru Service",
    description: "Quick and convenient pickup without leaving your car.",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Free Home Delivery",
    description: "Medications delivered right to your doorstep at no extra cost.",
  },
  {
    icon: <Pill className="h-6 w-6" />,
    title: "Custom Compounding",
    description: "Personalized medications tailored to your specific needs.",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: "Pill Packaging",
    description: "Organize your medications by dose and time for easy adherence.",
  },
  {
    icon: <Syringe className="h-6 w-6" />,
    title: "Immunizations",
    description: "Walk-in vaccinations administered by licensed pharmacists.",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Medication Sync",
    description: "Synchronize all your refills to one convenient pickup day.",
  },
];

const trustSignals = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Since 1961",
    description: "Serving our community for over 60 years",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "HIPAA Compliant",
    description: "Your privacy is our priority",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Pharmacist-Led Care",
    description: "Expert guidance at every step",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Quality Assured",
    description: "Accredited compounding pharmacy",
  },
];

const testimonials = [
  {
    quote:
      "Always a pleasure to shop here, Staff is friendly and knowledgeable and always makes sure I leave with the best possible product! Special shout out to Tom and Jasmine for their great attitudes and helpfulness!",
    author: "Zachary W.",
    role: "Google Review",
  },
  {
    quote:
      "Thank you for your amazing service. I had a prescription delivered with the wrong applicator, I called the pharmacist and let them know. They sent me a new prescription no problem. 10/10 customer service.",
    author: "Sydney M.",
    role: "Google Review",
  },
  {
    quote:
      "Shelby is amazing! She is joyful and polite, fast, no nonsense, gets it done for you. Also I love this pharmacy, haven't had one issue and you get your prescription fast. They have it figured out.",
    author: "Shanda H.",
    role: "Google Review",
  },
  {
    quote:
      "I talked to a technician named Shelby and I've never had such an easy experience on the phone before. I was refilling my tirzepatide and it was the smoothest experience - took 5 minutes, she was patient and kind.",
    author: "Caiden G.",
    role: "Google Review",
  },
  {
    quote:
      "I called at 9am, which I realized was probably going to be a very busy time. They answered in under 2 minutes, ran my prescription to make sure they had all necessary information and had me 100% satisfied in 2 more minutes.",
    author: "Emily T.",
    role: "Google Review",
  },
  {
    quote:
      "Mountain View Pharmacy has done an excellent job filling my prescriptions and delivering quickly! Shelby was so kind I could hear her smile! The call ended with me smiling too!",
    author: "Tena H.",
    role: "Google Review",
  },
];

const faqItems = [
  {
    question: "How do I transfer my prescriptions to Mountain View Pharmacy?",
    answer:
      "Transferring is easy! Simply provide us with your current pharmacy's information and prescription details. We'll handle all the paperwork and notify you when your medications are ready. You can start the process online, by phone, or in person.",
  },
  {
    question: "Do you offer home delivery?",
    answer:
      "Yes! We offer free home delivery within our service area. Your medications are carefully packaged and delivered right to your door. You can schedule deliveries at your convenience or set up automatic refill deliveries.",
  },
  {
    question: "What immunizations do you provide?",
    answer:
      "We offer a wide range of immunizations including flu shots, COVID-19 vaccines, shingles, pneumonia, Tdap, and more. Our pharmacists are licensed to administer vaccines to adults and children. No appointment needed for most vaccines.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-30" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-wide py-20 md:py-28 lg:py-36 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.span
                className="badge-primary mb-4 inline-flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Your Neighborhood Pharmacy
              </motion.span>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Personalized Care,{" "}
                <span className="text-gradient">Expert Service</span>
              </motion.h1>
              <motion.p
                className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Experience pharmacy care the way it should be — attentive,
                personalized, and focused on your well-being. From custom
                compounding to free delivery, we&apos;re here for you.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button asChild size="xl">
                    <Link href="/patients/transfer-prescriptions">
                      Transfer Prescription
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button asChild size="xl" variant="outline">
                    <Link href="/contact">
                      <Phone className="h-5 w-5" />
                      Consult a Pharmacist
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <motion.div
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-primary/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/pharmacy-interior-1.jpg"
                  alt="Mountain View Pharmacy interior"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-card rounded-xl px-4 py-3 shadow-lg border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-success" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">HIPAA Compliant</p>
                    <p className="text-muted-foreground text-xs">
                      Secure & Private
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-card rounded-xl px-4 py-3 shadow-lg border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">Free Delivery</p>
                    <p className="text-muted-foreground text-xs">
                      Same-day available
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <Section variant="default" size="default">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="accent-line mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need, All in One Place
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From convenient pickup options to personalized medication
            management, we offer comprehensive pharmacy services designed around
            your needs.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickServices.map((service, index) => (
            <Card
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              variant="feature"
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Patients vs Providers Split */}
      <Section variant="alt" size="default">
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* For Patients */}
          <motion.div
            className="card-base p-8 md:p-10 relative overflow-hidden group"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
            <motion.div
              className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center mb-6 shadow-glow"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Users className="h-7 w-7 text-primary-foreground" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold">For Patients</h3>
            <p className="mt-3 text-muted-foreground">
              Whether you need prescription transfers, medication delivery, or
              personalized pill packaging, we make managing your health simple
              and convenient.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Transfer Prescriptions",
                "Free Home Delivery",
                "Pill Packaging",
                "Immunizations",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ChevronRight className="h-4 w-4 text-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg">
                <Link href="/patients">Explore Patient Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* For Providers */}
          <motion.div
            className="card-base p-8 md:p-10 relative overflow-hidden group"
            variants={itemVariants}
            whileHover={{ y: -4 }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500" />
            <motion.div
              className="h-14 w-14 rounded-xl bg-foreground flex items-center justify-center mb-6"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <Stethoscope className="h-7 w-7 text-background" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold">For Providers</h3>
            <p className="mt-3 text-muted-foreground">
              Partner with us for custom compounding solutions, quality
              pharmaceutical care, and reliable prescription fulfillment for
              your patients.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Custom Compounding",
                "Easy Prescribing",
                "Quality & Compliance",
                "Provider Support",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ChevronRight className="h-4 w-4 text-foreground" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg" variant="outline">
                <Link href="/providers">Provider Resources</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Trust Signals */}
      <Section variant="default" size="sm">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trustSignals.map((signal) => (
            <motion.div
              key={signal.title}
              className="text-center"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="h-14 w-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  backgroundColor: "hsl(var(--primary))",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-primary group-hover:text-primary-foreground">
                  {signal.icon}
                </span>
              </motion.div>
              <h4 className="font-semibold text-lg">{signal.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {signal.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Testimonials */}
      <Section variant="alt" size="default">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="accent-line mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Community Says
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from patients and providers who trust Mountain View Pharmacy.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              delay={index * 0.15}
            />
          ))}
        </div>
      </Section>

      {/* FAQ Preview */}
      <Section variant="default" size="default">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="accent-line mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <FAQ items={faqItems} />
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild variant="subtle">
                <Link href="/contact">Have more questions? Contact us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Final CTA */}
      <CTA
        title="Ready to Experience Better Pharmacy Care?"
        description="Transfer your prescriptions today and discover the Mountain View difference. Personalized service, expert care, and convenience you can count on."
        primaryAction={{
          label: "Transfer Prescription",
          href: "/patients/transfer-prescriptions",
        }}
        secondaryAction={{ label: "Contact Us", href: "/contact" }}
        variant="dark"
      />
    </>
  );
}
