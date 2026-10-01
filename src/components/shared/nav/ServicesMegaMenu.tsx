"use client";
import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/constants";
import { serviceColumns, featuredService } from "./navigation";

/**
 * The Services mega menu — four columns of services groups and a featured
 * service preview on the right.
 */
export default function ServicesMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="absolute left-0 top-full w-full bg-white text-black shadow-lg border-t border-brand">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 p-6 md:p-8">
        {/* Service columns */}
        {serviceColumns.map((column) =>
          column.map((group) => (
            <div key={group.title} className="flex flex-col">
              {/* Group title */}
              <h3 className="body-small-bold text-[#114046] uppercase tracking-wider mb-4 md:mb-6">
                {group.title}
              </h3>

              {/* Service links */}
              <ul className="flex flex-col gap-3 md:gap-4">
                {group.services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      onClick={onNavigate}
                      className="body-small text-secondary hover:text-brand hover:font-medium transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

        {/* Featured service preview — right side */}
        {featuredService && (
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-4 md:gap-6 border-l border-light pl-6 md:pl-8">
            <div className="relative w-full aspect-square overflow-hidden bg-subtle rounded-lg">
              <Image
                src={featuredService.image}
                alt={featuredService.label}
                fill
                sizes="200px"
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              <p className="label font-medium text-secondary">
                {featuredService.label}
              </p>

              <h4 className="body-small-bold text-black leading-tight">
                {featuredService.description}
              </h4>

              <Link
                href={featuredService.href}
                onClick={onNavigate}
                className="body-small text-[#114046] font-semibold underline underline-offset-4 hover:text-[#0e3035] transition-colors mt-2"
              >
                View service
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions — full width */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 border-t border-light px-6 md:px-8 py-4 md:py-6">
        <Link
          href="/services"
          onClick={onNavigate}
          className="body-small text-secondary hover:text-brand transition-colors underline underline-offset-4"
        >
          View all 23 services
        </Link>

        <Link
          href="/studio/#scheduleCall"
          onClick={onNavigate}
          className="body-small text-[#114046] font-semibold hover:text-[#0e3035] transition-colors underline underline-offset-4"
        >
          Get a free recommendation
        </Link>
      </div>
    </div>
  );
}
