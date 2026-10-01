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
import NextStep from "./Nextstep";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

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
    <NextStep/>


    </>
  );
};

export default Page;