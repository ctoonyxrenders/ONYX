// src/components/shared/LowerFooter.tsx
//
// OPTION 1: TEXT LABELS ONLY (No icons)
//
// Social links shown as text names instead of icons

import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";
import { Mail, Phone } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/place/5900+Balcones+Dr+Suit+100,+Austin,+TX+78731,+USA/@30.3415589,-97.7549546,17z";

const studioLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/exterior-3d-renderings" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/studio" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/studio/#scheduleCall" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/onyxrender" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCQFBS73Re0F3bVWtfGvnfhQ" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/106947372" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61574497564060" },
];

export default function LowerFooter() {
  return (
    <footer className="bg-black text-white overflow-hidden">
      <div className="px-[6vw] pt-12 md:pt-16 pb-10 flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between">
        {/* Logo + address */}
        <div className="flex flex-col gap-4 max-lg:items-center max-lg:text-center">
          <Link href="/" className="w-fit">
            <Image
              placeholder="blur"
              blurDataURL={blurDataURL}
              src="/logo/logo-without-text-white.svg"
              alt="Onyx Renders"
              width={120}
              height={50}
              className="w-10 h-auto"
            />
          </Link>

          <address className="text-x-small not-italic text-[#BCBCBC] leading-relaxed">
            <Link href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
              5900 Balcones Drive, Suite 100
              <br />
              Austin, TX 78731
            </Link>

            <Link
              href="mailto:info@onyxrenders.com"
              className="flex items-center gap-2 mt-3 hover:text-white transition-colors max-lg:justify-center"
            >
              <Mail className="w-3 shrink-0" /> info@onyxrenders.com
            </Link>
            <div className="flex items-center gap-2 mt-2 max-lg:justify-center">
              <Phone className="w-3 shrink-0" /> +1 512 325 5121
            </div>
          </address>
        </div>

        {/* Link columns - Studio & Legal only */}
        <div className="flex flex-wrap gap-10 md:gap-16 max-lg:justify-center max-lg:text-center">
          <nav className="flex flex-col gap-2">
            <h2 className="text-small font-bold text-white">Studio</h2>
            {studioLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-x-small text-[#BCBCBC] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2">
            <h2 className="text-small font-bold text-white">Legal</h2>
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-x-small text-[#BCBCBC] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Oversized wordmark, aligned to the bottom-right corner */}
      <div className="relative flex justify-end pr-[4vw]">
        <Image
          src="/logo/logo1-text-only-theme.svg"
          alt=""
          width={1200}
          height={300}
          sizes="60vw"
          className="w-[60vw] h-auto brightness-0 invert"
        />
      </div>

      {/* Copyright and Social Links (TEXT) on same line */}
      <div className="px-[6vw] pt-8 pb-8 flex items-center justify-between gap-6 flex-wrap">
        {/* Copyright text - left side */}
        <p className="text-x-small text-[#BCBCBC]">
          © {new Date().getFullYear()} Onyx Renders LLC. All rights reserved.
        </p>

        {/* Social Links as TEXT - right side */}
        <div className="flex items-center gap-5 flex-wrap">
          {socialLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-x-small text-[#BCBCBC] hover:text-white transition-colors "
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}