import React from "react";
import CountUp from "../shared/CountUp";

export interface StatItem {
  target: number;
  /** Rendered straight after the number, e.g. "+" or "+ Years". */
  suffix: string;
  label: string;
}

interface StatisticsProps {
  variant?: "light" | "dark";
  /** Defaults to the Home page figures. */
  stats?: StatItem[];
}

const statsData: StatItem[] = [
  { target: 9, suffix: "+ Years", label: "in Practice" },
  { target: 1100, suffix: "+", label: "Successful Projects" },
  { target: 225, suffix: "+", label: "Happy Clients" },
  { target: 30, suffix: "+", label: "Countries" },
  { target: 93, suffix: "%", label: "Repeat & Preferred" },
];

const Statistics = async ({ variant = "light", stats = statsData }: StatisticsProps = {}) => {
  const isDark = variant === "dark";
  
  const bgClass = isDark ? "bg-[#113f45]" : "";
  const headingClass = isDark ? "text-white" : "text-[#114046]";
  const labelClass = isDark ? "text-white" : "text-[#7D7D7D]";
  const paddingClass = isDark ? "py-12 md:py-20 lg:py-24" : "py-4 md:py-6 lg:py-8";

  return (
    <section
      className={`w-full min-h-[200px] flex items-center justify-center ${paddingClass} ${bgClass}`}
    >
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 px-6 md:px-0 w-full">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center text-center">
            {/* Smaller than .heading on phones only; md:text-5xl restates the
                .heading size because a plain text-2xl would override it at
                every width. */}
            <h3 className={`heading text-2xl md:text-5xl mb-2 ${headingClass}`}>
              <CountUp target={stat.target} />
              {stat.suffix}
            </h3>
            <p className={`text-x-small ${labelClass}`}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;