"use client";
import { blurDataURL } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import MobileMenu from "./nav/MobileMenu";
import ServicesMegaMenu from "./nav/ServicesMegaMenu";
import CardsMenu from "./nav/CardsMenu";
import { navItems } from "./nav/navigation";

const SCROLL_THRESHOLD = 30;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  const solid = scrolled || openMenu !== null;
  const close = () => setOpenMenu(null);

  // Pages whose first section is a dark full-bleed hero under the header.
  // While the header is transparent there, its text turns white; everywhere
  // else the transparent header sits on a light page and stays black.
  const overDarkHero = pathname === "/" || pathname.startsWith("/who-we-help/");
  const light = overDarkHero && !solid;
  const hover = light ? "hover:text-white/70" : "hover:text-brand";

  return (
    <header
      onMouseLeave={close}
      className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${
        solid
          ? "bg-white text-black shadow-sm"
          : `bg-transparent ${light ? "text-white" : "text-black"}`
      }`}
    >
      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between items-center h-[var(--header-h)] px-[var(--gutter)]">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <Image
            placeholder="blur"
            blurDataURL={blurDataURL}
            src="/logo/logo-without-text-theme.svg"
            alt="Onyx Renders"
            width={40}
            height={40}
            className="w-8 h-8 lg:w-11 lg:h-11"
            unoptimized
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-stretch gap-6 xl:gap-8 h-full">
          {navItems.map((item) => {
            if (!item.menu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav flex items-center ${hover} transition-colors`}
                >
                  {item.label}
                </Link>
              );
            }

            const isMenuOpen = openMenu === item.label;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setOpenMenu(item.label)}
                className="flex items-center h-full"
              >
                <button
                  type="button"
                  aria-expanded={isMenuOpen}
                  onClick={() => setOpenMenu(isMenuOpen ? null : item.label)}
                  className={`inline-flex items-center gap-1 nav transition-colors ${hover} ${
                    isMenuOpen ? "text-brand underline underline-offset-8" : ""
                  }`}
                >
                  {item.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M2.5 4.5L6 8L9.5 4.5" />
                  </svg>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Sign in + CTA */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard/login"
            className={`nav ${light ? "text-white" : "text-secondary"} ${hover} transition-colors`}
          >
            Sign in
          </Link>
          <Link href="/studio/#scheduleCall">
            <button className="bg-[#114046] text-white rounded-full hover:bg-[#0e3035] transition-colors px-6 py-2 lg:px-8 lg:py-3 nav font-semibold">
              Request a Proposal
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden justify-between items-center h-[var(--header-h)] px-[var(--gutter)]">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <Image
            placeholder="blur"
            blurDataURL={blurDataURL}
            src="/logo/logo-without-text-theme.svg"
            alt="Onyx Renders"
            width={32}
            height={32}
            className="w-7 h-7 md:w-8 md:h-8"
            unoptimized
          />
        </Link>

        {/* Mobile toggle */}
        <button
          className="text-2xl md:text-3xl"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Dropdowns */}
      {openMenu && (
        <div className="hidden lg:block">
          {navItems.map((item) => {
            if (openMenu !== item.label || !item.menu) return null;
            return item.menu === "services" ? (
              <ServicesMegaMenu key={item.label} onNavigate={close} />
            ) : (
              <CardsMenu key={item.label} cards={item.cards} onNavigate={close} />
            );
          })}
        </div>
      )}

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
