// src/app/services/_components/Logos.tsx
import Image from "next/image";
import React from "react";
// Same stylesheet the Home page marquee uses — one keyframe definition,
// not a copy.
import styles from "@/components/home/home.module.css";

export default function Logos({ logos }: { logos: { logo: string }[] }) {
  if (!logos?.length) return null;

  return (
    <div className="overflow-x-hidden">
      <div
        style={{ animationDuration: "30s" }}
        className={`my-10 xl:my-20 flex w-fit items-center gap-10 ${styles.slider}`}
      >
        {logos.map((item, idx) => (
          <div
            key={idx}
            className="h-[120px] aspect-video relative flex items-center"
          >
            <Image
              src={item.logo}
              alt="logo"
              className="object-cover"
              priority
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}