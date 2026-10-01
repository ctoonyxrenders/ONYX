"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
  target: number;
  duration?: number;
}

export default function CountUp({ target, duration = 3 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [digitHeight, setDigitHeight] = useState(0);
  const digitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (digitRef.current) {
      setDigitHeight(digitRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <span ref={ref} style={{ display: "inline-flex", gap: "2px" }}>
      {String(target)
        .split("")
        .map((digit, index) => (
          <div
            key={index}
            style={{
              width: "1ch",
              height: digitHeight || "1em",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ y: digitHeight * 10 }}
              animate={controls}
              variants={{
                visible: {
                  y: -digitHeight * Number(digit),
                  transition: { duration, ease: "backInOut" },
                },
              }}
            >
              {[...Array(10).keys()].map((num) => (
                <div
                  key={num}
                  ref={index === 0 ? digitRef : undefined}
                  style={{ height: "1em", lineHeight: "1em" }}
                >
                  {num}
                </div>
              ))}
            </motion.div>
          </div>
        ))}
    </span>
  );
}
