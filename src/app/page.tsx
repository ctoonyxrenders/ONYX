// app/page.tsx
//
// HOME PAGE WITH STICKY BANNER + COVERING CONTENT
//
// How it works:
// 1. Banner sticks to top
// 2. Content sections appear over banner (no overlay)
// 3. Content covers banner as user scrolls
// 4. Normal scrolling after banner is covered
//
// Visual result: Premium sticky reveal effect

export const revalidate = 60;

import React from "react";
import OurWorkFlow from "@/components/home/OurWorkFlow";
import {
  Banner,
  SplitReveal,
  WhoWeHelp,
  OurVision,
  WhyItMatters,
  ServicesOverview,
  CaseStudies,
  WhyUs,
  FAQs,
  ClientReviews,
  Statistics,
} from "@/components/home";
import { StickyBannerWithCoveringContent } from "@/components/home/StickyBannerWithCoveringContent";
import { FooterCTA } from "@/components/shared";
import { FeedbackVideo } from "@/components/shared/Video";
import HomeSEO from "@/components/seo/HomeSEO";
import LogoMarquee from "@/components/home/LogoMarquee"

export default function page() {
  return (
    <>
      <HomeSEO />

      {/* 
        STICKY BANNER WITH COVERING CONTENT
        ════════════════════════════════════════════════════
        
        banner prop: The Hero/Banner (sticky at top)
        children: All other sections (appear over banner)
        
        Effect:
          1. Banner displays full (sticky)
          2. User scrolls
          3. Sections appear over banner at banner midpoint
          4. Banner gets covered (no gray effect)
          5. Normal scrolling continues
      */}
      <StickyBannerWithCoveringContent
        banner={<Banner />}
      >
        {/* All sections appear over sticky banner */}
        <SplitReveal />
        <LogoMarquee />
        <WhoWeHelp />
        {/* <OurVision /> */}
      
        <WhyItMatters />
        <ServicesOverview />
        <CaseStudies />
         <Statistics />
        <WhyUs />
        <OurWorkFlow />
        <ClientReviews />
        <FeedbackVideo />
        <FAQs />
        <FooterCTA />
      </StickyBannerWithCoveringContent>
    </>
  );
}