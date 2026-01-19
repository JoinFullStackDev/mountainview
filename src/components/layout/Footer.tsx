"use client";

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  patients: [
    { name: 'Transfer Prescriptions', href: '/patients/transfer-prescriptions' },
    { name: 'Free Delivery', href: '/patients/delivery' },
    { name: 'Pill Packaging', href: '/patients/pill-packaging' },
    { name: 'Immunizations', href: '/patients/immunizations' },
    { name: 'Medication Sync', href: '/patients/med-sync' },
  ],
  providers: [
    { name: 'Compounding Services', href: '/providers/compounding' },
    { name: 'How to Prescribe', href: '/providers/how-to-prescribe' },
    { name: 'Quality & Compliance', href: '/providers/quality-compliance' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Medical Kits', href: '/medical-kits' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy & HIPAA', href: '/privacy' },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  return (
    <footer className="bg-section-dark text-section-dark-foreground">
      <motion.div
        className="container-wide section-padding-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.svg" 
                alt="Mountain View Pharmacy" 
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70 leading-relaxed">
              Serving our community with personalized pharmaceutical care since 1961. 
              Your neighborhood pharmacy committed to your health and well-being.
            </p>
            
            {/* Contact Info */}
            <div className="mt-5 space-y-2.5">
              <motion.a
                href="tel:+18012953439"
                className="flex items-center gap-2.5 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                whileHover={{ x: 3 }}
              >
                <Phone className="h-4 w-4" />
                801-295-3439
              </motion.a>
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>Toll Free: 1-888-201-6341</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>Fax: 801-299-1696</span>
              </div>
              <motion.a
                href="mailto:info@mtviewpharmacy.com"
                className="flex items-center gap-2.5 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                whileHover={{ x: 3 }}
              >
                <Mail className="h-4 w-4" />
                info@mtviewpharmacy.com
              </motion.a>
              <div className="flex items-start gap-2.5 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>230 S Main Street, Bountiful, UT 84010</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-primary-foreground/80">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Mon-Fri: 9am-7pm • Sat: 9am-5pm</span>
              </div>
            </div>

            {/* Shop link */}
            <motion.a
              href="https://shop.mtviewpharmacy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              whileHover={{ x: 3 }}
            >
              Shop Online <ExternalLink className="h-3.5 w-3.5" />
            </motion.a>
          </motion.div>

          {/* Patients Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
              For Patients
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.patients.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Providers Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
              For Providers
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.providers.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-10 pt-6 border-t border-primary-foreground/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Mountain View Pharmacy. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/mvpbountiful/' },
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/mvp_bountiful/' },
              ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
