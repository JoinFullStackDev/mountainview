"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useScroll,
  animate,
} from "framer-motion";
import {
  Car,
  Truck,
  Pill,
  Syringe,
  RefreshCw,
  ClipboardCheck,
  Users,
  Shield,
  ArrowRight,
  Phone,
  ChevronRight,
  Sparkles,
  Star,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Card } from "@/components/shared/Card";
import { FAQ } from "@/components/shared/FAQ";
import { CTA } from "@/components/shared/CTA";
import { Button } from "@/components/ui/button";

const quickServices = [
  {
    icon: <Car className="h-6 w-6" />,
    title: "Drive-Thru Service",
    description: "Quick and convenient pickup without leaving your car.",
    href: "/services",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Free Home Delivery",
    description: "Medications delivered right to your doorstep at no extra cost.",
    href: "/patients/delivery",
  },
  {
    icon: <Pill className="h-6 w-6" />,
    title: "Custom Compounding",
    description: "Personalized medications tailored to your specific needs.",
    href: "/services/compounding",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: "Pill Packaging",
    description: "Organize your medications by dose and time for easy adherence.",
    href: "/patients/pill-packaging",
  },
  {
    icon: <Syringe className="h-6 w-6" />,
    title: "Immunizations",
    description: "Walk-in vaccinations administered by licensed pharmacists.",
    href: "/patients/immunizations",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Medication Sync",
    description: "Synchronize all your refills to one convenient pickup day.",
    href: "/patients/med-sync",
  },
];

const patientLinks = [
  { label: "Transfer Prescriptions", href: "/patients/transfer-prescriptions" },
  { label: "Free Home Delivery", href: "/patients/delivery" },
  { label: "Pill Packaging", href: "/patients/pill-packaging" },
  { label: "Immunizations", href: "/patients/immunizations" },
];

const stats = [
  { value: 63, suffix: "+", label: "Years of Service", description: "Serving our community since 1961" },
  { value: 5, suffix: ".0", label: "Star Rating", description: "Top-rated on Google Reviews" },
  { value: 100, suffix: "%", label: "HIPAA Compliant", description: "Your privacy is our priority" },
  { value: 10, suffix: "k+", label: "Prescriptions Filled", description: "Trusted by thousands of patients" },
];

const testimonials = [
  {
    quote:
      "Thank Kathleen & the crew! You guys are so awesome. They got everything all the way up to Park City for me before our Baja spearfishing trip. Really appreciate all the help from everyone!",
    author: "David Stevens",
    role: "Google Review",
    tags: ["📦 Shipping", "⭐ Customer Service"],
  },
  {
    quote:
      "I’ve just started using Mountain View Pharmacy, but everyone I’ve interacted with has been wonderful. Hunter went above and beyond helping me through the entire process and made everything incredibly easy.",
    author: "Ginger Nielsen",
    role: "Google Review",
    tags: ["⭐ Customer Service"],
  },
  {
    quote:
      "Mountain View Pharmacy was excellent with my prescription. They shipped it the same day they received it, and it arrived the very next day. They answered all of my questions, and I couldn’t be happier with the service.",
    author: "Carole Shaughnessy",
    role: "Google Review",
    tags: ["📦 Shipping", "📞 Quick Response"],
  },
  {
    quote:
      "Every member of the staff is professional, courteous, and always on top of their game. Since I live in Tremonton and can’t drive yet, their delivery service has meant everything to me.",
    author: "Bethanie Hajek",
    role: "Google Review",
    tags: ["🚚 Fast Delivery"],
  },
  {
    quote:
      "They answered my call in under two minutes, verified everything with my prescription, and had me completely taken care of just a couple minutes later. Outstanding customer service.",
    author: "Emily Taylor",
    role: "Google Review",
    tags: ["📞 Quick Response", "⭐ Customer Service"],
  },
  {
    quote:
      "Excellent pharmacy with friendly, knowledgeable staff, fast service, and convenient delivery. Prescriptions are filled quickly, and the team is always helpful, professional, and reliable.",
    author: "Kipp Stock",
    role: "Google Review",
    tags: ["🚚 Fast Delivery", "⭐ Customer Service"],
  },
  {
    quote:
      "Angel and the pharmacist were incredibly helpful and efficient. They’re knowledgeable, answer every question politely, and have been wonderful to work with.",
    author: "Trudi Lupus",
    role: "Google Review",
    tags: ["👩‍⚕️ Knowledgeable Pharmacists"],
  },
  {
    quote:
      "I’ve had lots of questions about my medications, and the pharmacists have always been patient, helpful, and willing to take the time to explain everything. They’re friendly, knowledgeable, and incredibly fast.",
    author: "Vonell Hatch",
    role: "Google Review",
    tags: ["👩‍⚕️ Knowledgeable Pharmacists", "📞 Quick Response"],
  },
  {
    quote:
      "Fast, friendly, and professional service. Great customer service and always quick to get prescriptions sent out the same day.",
    author: "Jeanel Russell",
    role: "Google Review",
    tags: ["📦 Shipping", "📞 Quick Response"],
  },
  {
    quote:
      "I received my prescription with the wrong applicator, called the pharmacy, and they immediately fixed the issue by sending a replacement. 10/10 customer service.",
    author: "Sydney Matthews",
    role: "Google Review",
    tags: ["⭐ Customer Service", "📦 Shipping"],
  },
  {
    quote:
      "Mountain View Pharmacy consistently fills my prescriptions quickly and delivers them fast. Shelby was kind, efficient, and had me smiling by the end of the call.",
    author: "Tena Hampton",
    role: "Google Review",
    tags: ["🚚 Fast Delivery", "⭐ Customer Service"],
  },
  {
    quote:
      "Refilling my tirzepatide took less than five minutes. Shelby was patient, kind, and made the entire process incredibly smooth.",
    author: "Caiden Garcia",
    role: "Google Review",
    tags: ["💉 GLP-1 / Tirzepatide", "📞 Quick Response"],
  },
  {
    quote:
      "Dave went above and beyond helping me solve a prescription problem. Without his help, I would have had to wait another two weeks. Absolutely amazing service.",
    author: "William Hensley",
    role: "Google Review",
    tags: ["⭐ Customer Service"],
  },
  {
    quote:
      "This pharmacy is incredible. The customer service is top tier. Tavar was extremely helpful and took care of everything I needed.",
    author: "Philip Heywood",
    role: "Google Review",
    tags: ["⭐ Customer Service"],
  },
  {
    quote:
      "Shelby and the entire team are top notch. They’re great at communicating and offer excellent prescription delivery options.",
    author: "Shaun Syphus",
    role: "Google Review",
    tags: ["🚚 Fast Delivery", "⭐ Customer Service"],
  },
  {
    quote:
      "Shelby is amazing—fast, joyful, polite, and gets everything taken care of. I love this pharmacy and have never had a single issue.",
    author: "Shanda Housley",
    role: "Google Review",
    tags: ["⭐ Customer Service", "📞 Quick Response"],
  },
  {
    quote:
      "Shelby answered quickly, was friendly and professional, and my prescription was ready within 30 minutes. The pricing was great too.",
    author: "Chris Battrick",
    role: "Google Review",
    tags: ["📞 Quick Response", "⭐ Customer Service"],
  },
  {
    quote:
      "Kaitlyn was incredibly kind and thorough. Every technician and pharmacist I’ve worked with has been amazing.",
    author: "Elein Sutherland",
    role: "Google Review",
    tags: ["👩‍⚕️ Knowledgeable Pharmacists"],
  },
  {
    quote:
      "Cora resolved my billing concern in less than two minutes. It was refreshing to talk to a real person who solved the issue so quickly.",
    author: "Ryan M.",
    role: "Google Review",
    tags: ["📞 Quick Response", "⭐ Customer Service"],
  },
  {
    quote:
      "Katelyn was incredibly helpful and kind. I’d choose this pharmacy again based solely on my interaction with her.",
    author: "Kim Wright",
    role: "Google Review",
    tags: ["⭐ Customer Service"],
  },
  {
    quote:
      "Whether I pick up inside, use the drive-thru, or have prescriptions delivered, Mountain View Pharmacy always does an outstanding job. I’ve never had a better pharmacy experience.",
    author: "Rachel M. Barker",
    role: "Google Review",
    tags: ["🚗 Drive-Thru", "🚚 Fast Delivery"],
  },
  {
    quote:
      "I can’t say enough amazing things about Mountain View Pharmacy. They always go above and beyond, taking extra time to answer questions about dosage and ingredients while making sure I understand everything.",
    author: "Pinetrees & Poppies",
    role: "Google Review",
    tags: ["👩‍⚕️ Knowledgeable Pharmacists"],
  },
  {
    quote:
      "Sara made my experience fantastic. She took the time to explain everything clearly and genuinely made me feel cared for.",
    author: "Sawyer Kauffman",
    role: "Google Review",
    tags: ["👩‍⚕️ Knowledgeable Pharmacists", "⭐ Customer Service"],
  },
  {
    quote:
      "First time using this pharmacy and Katelyn was amazing. She answered every question thoroughly—even better than my doctor—and immediately put me at ease.",
    author: "Becca Lou",
    role: "Google Review",
    tags: ["👩‍⚕️ Knowledgeable Pharmacists"],
  },
  {
    quote:
      "I’ve been using Mountain View Pharmacy for over three years for both my family and my business. If I could give them 10 stars, I would. Their level of service is outstanding.",
    author: "Leslie Olsen",
    role: "Google Review",
    tags: ["⭐ Customer Service"],
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

const headlineContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordRevealVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(motionVal, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, motionVal, target]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function HomeClient() {
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 600], [0, 60]);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

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
                variants={headlineContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {["Personalized", "Care,"].map((word) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-[0.25em]"
                    variants={wordRevealVariants}
                  >
                    {word}
                  </motion.span>
                ))}{" "}
                <motion.span
                  className="inline-block text-gradient-shimmer"
                  variants={wordRevealVariants}
                >
                  Expert Service
                </motion.span>
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
              <motion.div style={{ y: heroImageY }}>
                <motion.div
                  className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-primary/10"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <video
                    src="/images/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
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
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
              href={service.href}
              variant="feature"
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* For Patients */}
      <Section variant="alt" size="default">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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
              {patientLinks.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group/link"
                  >
                    <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover/link:translate-x-1" />
                    {item.label}
                  </Link>
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
        </motion.div>
      </Section>

      {/* Stats / Trust Signals */}
      <Section variant="default" size="sm">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-semibold text-foreground">{stat.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-section-alt">
        <motion.div
          className="text-center mb-12 px-4"
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="accent-line mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Community Says
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real 5-star Google reviews from patients who trust Mountain View
            Pharmacy.
          </p>
        </motion.div>

        <div className="container-wide">
          <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.author}
                className={`card-base mb-6 break-inside-avoid p-6 ${
                  !showAllTestimonials && index >= 9 ? "hidden" : "inline-block w-full"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 fill-warning text-warning"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Google Review
                  </span>
                </div>

                <blockquote className="text-base leading-relaxed text-foreground/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-5 border-t border-border/70 pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {testimonial.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowAllTestimonials((current) => !current)}
              aria-expanded={showAllTestimonials}
            >
              {showAllTestimonials
                ? "Show fewer reviews"
                : `Show all ${testimonials.length} reviews`}
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <Section variant="default" size="default">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="accent-line mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <FAQ items={faqItems} />
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
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
