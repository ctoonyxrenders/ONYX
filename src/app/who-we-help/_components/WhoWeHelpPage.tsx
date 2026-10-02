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
import CtaSection from "./CtaSection";

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
      <FaqSection faqs={content.faqs} />
      <CtaSection cta={content.cta} />
    </>
  );
}
