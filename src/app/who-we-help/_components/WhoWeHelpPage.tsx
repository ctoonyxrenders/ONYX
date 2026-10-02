// src/app/who-we-help/_components/WhoWeHelpPage.tsx
//
// THE single Who We Help layout. Every audience route renders this; only the
// content object changes between them. Every section owns the shared .section
// rhythm and none adds outer margins, so the gaps match on every page.

import type { WhoWeHelpContent } from "../_types";
import WhoWeHelpHero from "./WhoWeHelpHero";
import ProblemSection from "./ProblemSection";
import DeliverSection from "./DeliverSection";
import ProcessSection from "./ProcessSection";
import ProofSection from "./ProofSection";
import FaqSection from "./FaqSection";
import FooterCTA from "@/components/shared/FooterCTA";
import Statistics, { type StatItem } from "@/components/home/Statistics";

/** The same on every audience page, and as on the Home page. */
const YEARS: StatItem = { target: 9, suffix: "+ Years", label: "in Practice" };
const COUNTRIES: StatItem = { target: 30, suffix: "+", label: "Countries" };

export default function WhoWeHelpPage({
  content,
}: {
  content: WhoWeHelpContent;
}) {
  return (
    <>
      <WhoWeHelpHero hero={content.hero} />
      <ProblemSection problem={content.problem} />
      <DeliverSection deliver={content.deliver} />
      <ProcessSection process={content.process} />
      <ProofSection proof={content.proof} />
      {/* The Home page stats band, on the brand teal (as on About). */}
      <Statistics
        variant="dark"
        stats={[YEARS, content.stats.projects, content.stats.clients, COUNTRIES]}
      />
      <FaqSection faqs={content.faqs} />
      {/* The site-wide closing band, with this audience's copy. An empty
          eyebrow hides the Home page's default line. */}
      <FooterCTA
        eyebrow=""
        heading={content.cta.heading}
        body={content.cta.body}
        actions={[content.cta.primaryCta, content.cta.secondaryCta]}
      />
    </>
  );
}
