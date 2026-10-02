export const revalidate = 60; // Revalidate every 60 seconds

import React from "react";
import OurTeam from "./OurTeam";
import { Statistics } from "@/components/home";
import {ClientReviews} from "@/components/home"
import Header from "./Header";
import OurStory from "./OurStory";
import OurServicesImages from "./OurServicesImages";
import StudioSEO from "@/components/seo/StudioSEO";
import WhoWeAre from "./WhoWeAre";
import TheDifference from "./TheDifference";
import HowWeThink from "./Howwethink";
import {ServicesOverview} from "@/components/home";
import Standards from "./Standards";
import Careers from "./Careers";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import FooterCTA from "@/components/shared/FooterCTA";

const Page = () => {
  return (
    <>
      <StudioSEO />
      <Header />
      <WhoWeAre />
      <OurStory />
      <OurServicesImages />

      {/* Statistics with dark variant */}
      <ErrorBoundary componentName="Statistics">
        <Statistics variant="dark" />
      </ErrorBoundary>

        <TheDifference />
        
        <HowWeThink/>
        <ServicesOverview/>

      {/* <OurServices /> */}

      <ErrorBoundary componentName="Our Team">
        <OurTeam />
      </ErrorBoundary>

      <Standards/>

       <ErrorBoundary componentName="Client Reviews">
        <ClientReviews />
      </ErrorBoundary>
      
      <Careers/>

      {/* The site-wide closing band, with the About page's Next Step copy. */}
      <FooterCTA
        eyebrow="Next step"
        heading={["Tell us what you're", "building."]}
        body="Send drawings, a sketch or just the brief. You'll have a scoped proposal within 24 hours. Prefer to talk it through first? Book a 30-minute session with the studio."
        actions={[{ label: "Request a Proposal", href: "/studio/#scheduleCall" }]}
        note="4 quick questions. Reply within 24 hours."
      />


    </>
  );
};

export default Page;