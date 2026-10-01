"use client";
import Link from "next/link";
import React, { useState } from "react";
import { navItems, serviceGroups } from "./navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Same sidebar behaviour as before — overlay, right slide-in, tap to close.
 * Any menu expands in place; only one at a time.
 */
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = () => {
    setExpanded(null);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={close}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white text-black shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center py-3 md:py-4 px-6 md:px-8 border-b border-light">
          <span className="nav-medium text-sm md:text-base">Menu</span>
          <button onClick={close} className="rotate-45 text-xl leading-none" aria-label="Close menu">
            +
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-6 md:px-8 py-6 md:py-8 gap-0">
          {navItems.map((item) => {
            if (!item.menu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={close}
                  className="nav py-3 text-xs md:text-sm lg:text-base hover:text-brand transition-colors"
                >
                  {item.label}
                </Link>
              );
            }

            const isExpanded = expanded === item.label;

            return (
              <div key={item.label} className="flex flex-col">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(isExpanded ? null : item.label)}
                  className="flex items-center justify-between gap-2 py-3 text-left text-xs md:text-sm lg:text-base nav-medium"
                >
                  <span>{item.label}</span>
                  <span className="text-xl leading-none">{isExpanded ? "−" : "+"}</span>
                </button>

                {isExpanded && item.menu === "services" && (
                  <div className="flex flex-col gap-6 md:gap-8 pl-6 pb-4">
                    {serviceGroups.map((group) => (
                      <div key={group.title} className="flex flex-col gap-6 md:gap-8">
                        <h3 className="label font-bold text-secondary">
                          {group.title}
                        </h3>
                        {group.services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={close}
                            className="body-small text-secondary hover:text-brand transition-colors"
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {isExpanded && item.menu === "cards" && (
                  <div className="flex flex-col gap-6 md:gap-8 pl-6 pb-4">
                    {item.cards.map((card) => (
                      <Link
                        key={card.href}
                        href={card.href}
                        onClick={close}
                        className="body-small text-secondary hover:text-brand transition-colors"
                      >
                        {card.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 md:px-8 py-6 md:py-8 border-t border-light flex flex-col gap-6 md:gap-8">
          <Link
            href="/dashboard/login"
            onClick={close}
            className="nav text-xs md:text-sm lg:text-base hover:text-brand transition-colors"
          >
            Sign in
          </Link>
          <Link href="/studio/#scheduleCall" onClick={close}>
            <button className="btn-pill btn-theme w-full">
              Request a Proposal
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
}
