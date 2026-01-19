import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";

export default function Privacy() {
  return (
    <>
      <PageHero
        title="Privacy Policy & HIPAA Notice"
        description="Your privacy is our priority. Learn how we protect your personal and health information."
        breadcrumbs={[{ name: "Privacy & HIPAA" }]}
        variant="minimal"
      />

      <Section variant="default" size="default">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="text-muted-foreground text-sm">
            Last Updated: January 2024
          </p>

          <div className="card-base p-6 my-8 bg-primary/5 border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mt-0">
              HIPAA Compliance Notice
            </h3>
            <p className="text-muted-foreground mb-0">
              Mountain View Pharmacy is committed to protecting your Protected
              Health Information (PHI) in accordance with the Health Insurance
              Portability and Accountability Act (HIPAA). We maintain strict
              administrative, physical, and technical safeguards to ensure the
              confidentiality, integrity, and security of your health
              information.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-muted-foreground">
            We collect information necessary to provide pharmacy services,
            including:
          </p>
          <ul className="text-muted-foreground space-y-2">
            <li>
              Personal identification information (name, address, phone, email)
            </li>
            <li>Date of birth and gender</li>
            <li>Health insurance information</li>
            <li>Prescription and medication history</li>
            <li>Health conditions and allergies</li>
            <li>Payment information for transactions</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-muted-foreground">Your information is used to:</p>
          <ul className="text-muted-foreground space-y-2">
            <li>Fill and manage your prescriptions</li>
            <li>Process insurance claims and payments</li>
            <li>Communicate with you about your medications</li>
            <li>Coordinate with your healthcare providers</li>
            <li>Provide medication therapy management services</li>
            <li>Send refill reminders and health-related notifications</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
          <p className="text-muted-foreground">
            We may share your information with:
          </p>
          <ul className="text-muted-foreground space-y-2">
            <li>Your prescribing healthcare providers</li>
            <li>Your health insurance company for claims processing</li>
            <li>Other healthcare providers involved in your care</li>
            <li>Law enforcement when required by law</li>
          </ul>
          <p className="text-muted-foreground">
            We never sell your personal or health information to third parties.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
          <p className="text-muted-foreground">
            Under HIPAA, you have the right to:
          </p>
          <ul className="text-muted-foreground space-y-2">
            <li>Access your health records</li>
            <li>Request corrections to your records</li>
            <li>Receive a copy of this privacy notice</li>
            <li>
              Request restrictions on how we use or share your information
            </li>
            <li>
              File a complaint if you believe your privacy rights have been
              violated
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Security Measures</h2>
          <p className="text-muted-foreground">
            We implement comprehensive security measures including:
          </p>
          <ul className="text-muted-foreground space-y-2">
            <li>Encrypted electronic health records</li>
            <li>Secure prescription transmission systems</li>
            <li>Staff training on privacy and security</li>
            <li>Physical security of pharmacy premises</li>
            <li>Regular security audits and assessments</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about our privacy practices or wish to
            exercise your rights, please contact our Privacy Officer:
          </p>
          <div className="card-base p-6 my-4">
            <p className="font-medium text-foreground">
              Mountain View Pharmacy - Privacy Officer
            </p>
            <p className="text-muted-foreground">
              230 S Main Street, Bountiful, UT 84010
            </p>
            <p className="text-muted-foreground">Phone: 801-295-3439</p>
            <p className="text-muted-foreground">
              Email: info@mtviewpharmacy.com
            </p>
          </div>

          <div className="card-base p-6 my-8 bg-muted border-muted-foreground/20">
            <p className="text-sm text-muted-foreground mb-0">
              This notice describes how medical information about you may be
              used and disclosed and how you can get access to this information.
              Please review it carefully. A paper copy of this notice is
              available upon request.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
