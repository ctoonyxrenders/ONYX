"use client";
export const revalidate = 0; 
import React, { useEffect, useState } from "react";
import WorldMap, { CountryContext, SizeOption } from "react-svg-worldmap";
import { fetchMapData } from "@/lib/sanity";
import { get } from "http";
import { client } from "@/sanity/lib/client";

export default function Map() {
  const [size, setSize] = useState<SizeOption | number | null>(null);
  type CountryData = {
    country: string;
    value: number;
    countryCode?: string; // Optional, in case you want to include it
  };
  const [mapData, setMapData] = useState<CountryData[]>([]);
  useEffect(() => {
    if (window.innerWidth > 2000) {
      // 2xl
      setSize(2000);
    } else {
      setSize("xxl")
    }
    // Fetch map data from Sanity
    const fetchData = async () => {
      try {
        const data = await fetchMapData();
        const formattedData = data.map((item: any) => ({
          country: item.countryCode.toLowerCase(), // Ensure country code is in lowercase
          value: item.value,
        }));
        setMapData(formattedData);
      }
      catch (error) {
        console.error("Error fetching map data:", error);
      }
    }
    fetchData();
    
  }, []);
  
  if (size === null) return null;

  return (
    <div className="w-full flex justify-center overflow-hidden bg-[#114046]">
      <WorldMap
        color="white"
        valueSuffix="Sales"
        backgroundColor="#114046"
        size={size}
        data={mapData}
        styleFunction={(context: CountryContext<number>) => ({
          fill: context.countryValue ? "#bac3c8" : "transparent",
          stroke: context.countryValue ? "black" : "white",
          strokeWidth: 0.7,
          outline: "none",
        })}
      />
    </div>
  );
}
