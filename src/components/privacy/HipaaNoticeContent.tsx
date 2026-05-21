import Link from "next/link";

interface Item {
  id?: string;
  term: string;
  description: string;
}

const permittedUses: Item[] = [
  {
    term: "Uses and disclosures of PHI for Treatment:",
    description:
      "We will use the PHI that we receive from you to fill your prescription and coordinate or manage your health care.",
  },
  {
    term: "Uses and disclosures of PHI for Payment:",
    description:
      "The Practice will disclose your PHI to obtain payment or reimbursement from insurers for your health care services.",
  },
  {
    term: "Uses and disclosures of PHI for Health Care Operations:",
    description:
      "The Practice may use the minimum necessary amount of your PHI to conduct quality assessments, improvement activities, and evaluate the Practice workforce.",
  },
];

const additionalUses: Item[] = [
  {
    term: "Uses and disclosures as required by law:",
    description:
      "The Practice is required to use or disclose PHI about you as required and as limited by law.",
  },
  {
    term: "Uses and disclosure for Public Health Activities:",
    description:
      "The Practice may use or disclose PHI about you to a public health authority that is authorized by law to collect for the purpose of preventing or controlling disease, injury, or disability. This includes the FDA so that it may monitor any adverse effects of drugs, foods, nutritional supplements and other products as required by law.",
  },
  {
    term: "Uses and disclosure about victims of abuse, neglect or domestic violence:",
    description:
      "The Practice may use or disclose PHI about you to a government authority if it is reasonably believed you are a victim of abuse, neglect or domestic violence.",
  },
  {
    term: "Uses and disclosures for health oversight activities:",
    description:
      "The Practice may use or disclose PHI about you to a health oversight agency for oversight activities which may include audits, investigations, inspections as necessary for licensure, compliance with civil laws, or other activities the health oversight agency is authorized by law to conduct.",
  },
  {
    term: "Disclosures to Individuals Involved in your Care:",
    description: "The Practice may disclose PHI about you to individuals involved in your care.",
  },
  {
    term: "Disclosures for judicial and administrative proceedings:",
    description:
      "The Practice may disclose PHI about you in the course of any judicial or administrative proceedings, provided that proper documentation is presented to the Practice.",
  },
  {
    term: "Disclosures for law enforcement purposes:",
    description:
      "The Practice may disclose PHI about you to law enforcement officials for authorized purposes as required by law or in response to a court order or subpoena.",
  },
  {
    term: "Uses and disclosures about the deceased:",
    description:
      "The Practice may disclose PHI about a deceased, or prior to, and in reasonable anticipation of an individual\u2019s death, to coroners, medical examiners, and funeral directors.",
  },
  {
    term: "Uses and disclosures for cadaveric organ, eye or tissue donation purposes:",
    description:
      "The Practice may use and disclose PHI for the purpose of procurement, banking, or transplantation of cadaveric organs, eyes, or tissues for donation purposes.",
  },
  {
    term: "Uses and disclosures for research purposes:",
    description:
      "The Practice may use and disclose PHI about you for research purposes with a valid waiver of authorization approved by an institutional review board or a privacy board. Otherwise, the Practice will request a signed authorization by the individual for all other research purposes.",
  },
  {
    term: "Uses and disclosures to avert a serious threat to health or safety:",
    description:
      "The Practice may use or disclose PHI about you, if it believed in good faith, and is consistent with any applicable law and standards of ethical conduct, to avert a serious threat to health or safety.",
  },
  {
    term: "Uses and disclosures for specialized government functions:",
    description:
      "The Practice may use or disclose PHI about you for specialized government functions including; military and veteran\u2019s activities, national security and intelligence, protective services, department of state functions, and correctional institutions and law enforcement custodial situations.",
  },
  {
    term: "Disclosure for workers\u2019 compensation:",
    description:
      "The Practice may disclose PHI about you as authorized by and to the extent necessary to comply with workers\u2019 compensation laws or programs established by law.",
  },
  {
    term: "Disclosures for disaster relief purposes:",
    description:
      "The Practice may disclose PHI about you as authorized by law to a public or private entity to assist in disaster relief efforts and for family and personal representative notification.",
  },
  {
    term: "Disclosures to business associates:",
    description:
      "The Practice may disclose PHI about you to the Practice\u2019s business associates for services that they may provide to or for the Practice to assist the Practice to provide quality health care. To ensure the privacy of your PHI, we require all business associates to apply appropriate safeguards to any PHI they receive or create.",
  },
];

const otherContactPurposes: Item[] = [
  {
    term: "Information about treatment alternatives:",
    description:
      "The Practice may contact you to notify you of alternative treatments and/or products.",
  },
  {
    term: "Health related benefits or services:",
    description:
      "The Practice may use your PHI to notify you of benefits and services the Practice provides.",
  },
  {
    term: "Fundraising:",
    description:
      "If the Practice participates in a fundraising activity, the Practice may use demographic PHI to send you a fundraising packet, or the Practice may disclose demographic PHI about you to its business associate or an institutionally related foundation to send you a fundraising packet. No further disclosure will be allowed by the business associates or an institutionally related foundation without your written authorization. You will be provided with an opportunity to opt-out of all future fundraising activities.",
  },
];

const healthInformationRights: Item[] = [
  {
    term: "Request restrictions on certain uses and disclosures of your PHI:",
    description:
      "You have the right to request additional restrictions of the Practice\u2019s uses and disclosures of your PHI. The Practice is not required to accommodate a request, except that the Practice is required to agree to a request to restrict disclosures to health insurance plans related to products and services you pay out-of-pocket for.",
  },
  {
    term: "The right to have your PHI communicated to you by alternate means or locations:",
    description:
      "You have the right to request that the Practice communicate confidentially with you using an address or phone number other than your residence. However, state and federal laws require the Practice to have an accurate address and home phone number in case of emergencies. The Practice will consider all reasonable requests.",
  },
  {
    term: "The right to inspect and/or obtain a copy your PHI:",
    description:
      "You have the right to request access and/or obtain a copy (Paper or Electronic) of your PHI that is contained in the Practice for the duration the Practice maintains PHI about you. There may be a reasonable cost-based charge for photocopying documents. You will be notified in advance of incurring such charges, if any.",
  },
  {
    term: "The right to amend your PHI:",
    description:
      "You have the right to request an amendment of the PHI the Practice maintains about you, if you feel that the PHI the Practice has maintained about you is incorrect or otherwise incomplete. Under certain circumstances we may deny your request for amendment. If we do deny the request, you will have the right to have the denial reviewed by someone we designate who was not involved in the initial review. You may also ask the Secretary, United States Department of Health and Human Services (\u201cHHS\u201d), or their appropriate designee, to review such a denial.",
  },
  {
    term: "The right to receive an accounting of disclosures of your PHI:",
    description:
      "You have the right to receive an accounting of certain disclosures of your PHI made by the Practice.",
  },
  {
    term: "The right to receive additional copies of the Practice\u2019s Notice of Privacy Practices:",
    description:
      "You have the right to receive additional paper copies of this Notice, upon request, even if you initially agreed to receive the Notice electronically",
  },
  {
    term: "Notification of Breaches:",
    description:
      "You will be notified of any breaches that have compromised the privacy of your PHI.",
  },
];

const tableOfContents = [
  { id: "uses-and-disclosures", label: "How the Practice May Use and Disclose Your PHI" },
  { id: "other-uses", label: "Other Uses and Disclosures" },
  { id: "all-other-uses", label: "For All Other Uses and Disclosures" },
  { id: "your-rights", label: "Your Health Information Rights" },
  { id: "revisions", label: "Revisions to the Notice" },
  { id: "complaints", label: "Complaints" },
  { id: "contact", label: "Contact Information" },
];

function TermList({ items }: { items: Item[] }) {
  return (
    <dl className="space-y-5 my-6">
      {items.map((item) => (
        <div key={item.term}>
          <dt className="font-semibold text-foreground">{item.term}</dt>
          <dd className="text-muted-foreground mt-1 leading-relaxed">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-2xl font-bold text-foreground mt-12 mb-4 scroll-mt-24 uppercase tracking-wide"
    >
      {children}
    </h2>
  );
}

export function HipaaNoticeContent() {
  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">HIPAA</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
          Notice of Privacy Practices
        </h1>
        <p className="text-muted-foreground text-sm mt-2">Effective 10/1/2021</p>
      </header>

      <div className="card-base p-6 my-8 bg-primary/5 border-primary/20">
        <p className="text-sm md:text-base font-semibold uppercase tracking-wide text-foreground leading-relaxed mb-0">
          This notice describes how medical information about you may be used and disclosed and how
          you can get access to this information. Please review it carefully.
        </p>
      </div>

      <nav aria-label="Table of contents" className="card-base p-6 my-8 bg-muted/40">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          On this page
        </p>
        <ol className="space-y-1.5 text-sm">
          {tableOfContents.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-primary hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-5 text-muted-foreground leading-relaxed">
        <p>
          As part of the federal Health Insurance Portability and Accountability Act of 1996, known
          as HIPAA, the Practice has created this Notice of Privacy Practices (Notice). This Notice
          describes the Practice’s privacy practices and the rights you, the individual, have as
          they relate to the privacy of your Protected Health Information (PHI). Your PHI is
          information about you, or that could be used to identify you, as it relates to your past
          and present physical and mental health care services. The HIPAA regulations require that
          the Practice protect the privacy of your PHI that the Practice has received or created.
        </p>
        <p>
          This Practice will abide by the terms presented within this Notice. For any uses or
          disclosures that are not listed below (Including Psychotherapy Notes, Marketing and
          Selling of PHI), the Practice will obtain a written authorization from you for that use
          or disclosure, which you will have the right to revoke at any time, as explained in more
          detail below. The Practice reserves the right to change the Practice’s privacy
          practices and this Notice.
        </p>
      </div>

      <SectionHeading id="uses-and-disclosures">
        How the Practice May Use and Disclose Your PHI
      </SectionHeading>
      <p className="text-muted-foreground leading-relaxed">
        The following is an accounting of the ways that the Practice is permitted, by law, to use
        and disclose your PHI.
      </p>
      <TermList items={permittedUses} />

      <p className="text-muted-foreground leading-relaxed mt-6">
        The following is an accounting of additional ways in which the Practice is permitted or
        required to use or disclose PHI about you without your written authorization.
      </p>
      <TermList items={additionalUses} />

      <SectionHeading id="other-uses">Other Uses and Disclosures</SectionHeading>
      <p className="text-muted-foreground leading-relaxed">
        The Practice may contact you for the following purposes:
      </p>
      <TermList items={otherContactPurposes} />

      <SectionHeading id="all-other-uses">For All Other Uses and Disclosures</SectionHeading>
      <p className="text-muted-foreground leading-relaxed">
        The Practice will obtain a written authorization from you for all other uses and
        disclosures of PHI, and the Practice will only use or disclose pursuant to such an
        authorization. In addition, you may revoke such an authorization in writing at any time.
        To revoke a previously authorized use or disclosure, please contact Jacob Horrocks to
        obtain a Request for Restriction of Uses and Disclosures.
      </p>

      <SectionHeading id="your-rights">Your Health Information Rights</SectionHeading>
      <p className="text-muted-foreground leading-relaxed">
        The following are a list of your rights in respect to your PHI. Please contact Jacob
        Horrocks for more information about the below.
      </p>
      <TermList items={healthInformationRights} />

      <SectionHeading id="revisions">Revisions to the Notice of Privacy Practices</SectionHeading>
      <p className="text-muted-foreground leading-relaxed">
        The Practice reserves the right to change and/or revise this Notice and make the new
        revised version applicable to all PHI received prior to its effective date. The Practice
        will also post the revised version of the Notice in the Practice.
      </p>

      <SectionHeading id="complaints">Complaints</SectionHeading>
      <div className="space-y-5 text-muted-foreground leading-relaxed">
        <p>
          If you believe your privacy rights have been violated, you may file a complaint with the
          Practice and/or to the Secretary of HHS, or their designee. If you wish to file a
          complaint with the Practice, please contact Jacob Horrocks.
        </p>
        <p>
          You may also file a complaint with the U.S. Department of Health and Human Services
          Office for Civil Rights by sending a letter to 200 Independence Avenue, S.W., Washington,
          D.C. 20201, calling{" "}
          <a href="tel:1-877-696-6775" className="text-primary hover:underline">
            1-877-696-6775
          </a>
          , or visiting{" "}
          <Link
            href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline break-words"
          >
            www.hhs.gov/ocr/privacy/hipaa/complaints/
          </Link>
          .
        </p>
        <p>The Practice will not take any adverse action against you as a result of your filing of a complaint.</p>
      </div>

      <SectionHeading id="contact">Contact Information</SectionHeading>
      <p className="text-muted-foreground leading-relaxed">
        If you have any questions on the Practice’s privacy practices or for clarification on
        anything contained within the Notice, please contact:
      </p>
      <div className="card-base p-6 my-6">
        <p className="font-semibold text-foreground">Mountain View Pharmacy, Inc.</p>
        <p className="text-muted-foreground">Jacob Horrocks</p>
        <p className="text-muted-foreground">230 S Main Street</p>
        <p className="text-muted-foreground">Bountiful, UT 84010</p>
        <p className="text-muted-foreground">
          <a href="tel:8012953439" className="hover:text-primary transition-colors">
            (801) 295-3439
          </a>
        </p>
      </div>
    </article>
  );
}
