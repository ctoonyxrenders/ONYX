"use client";
import React, { useEffect, useState } from "react";
import "./styles.css";

export default function PageTransition() {
  const [mount, setMount] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMount(false), 2000); // same as the animation time
    return () => clearTimeout(timer);
  }, []);

  if (!mount) return null;

  return (
    <div
      className={`flex fixed inset-0 h-screen w-screen z-50`}
    >
      <div className="bg-black h-full w-1/2 left-half" />
      <div className="line" />
      <div className="bg-black h-full w-1/2 right-half" onAnimationEnd={()=>{
        setMount(false)
      }} />
    </div>
  );
}
