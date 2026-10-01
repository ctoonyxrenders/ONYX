"use client";
import { usePathname } from "next/navigation";
import { Header, LowerFooter } from "@/components/shared";
import PageTransition from "@/components/shared/PageTransition";
import ScrollToTop from "@/components/shared/ScrollToTop";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");
    const isHomePage = pathname === "/";

    return (
        <>
            {!isDashboard && <PageTransition />}
            {!isDashboard && <Header />}
            {!isDashboard && <ScrollToTop />}

            {/*
              The header is fixed, so it no longer occupies flow. Home keeps its
              full-bleed hero underneath the transparent header; every other page
              is offset by --header-h, the same variable that sizes the header.
              data-fluid-root enables large-screen scaling for public pages
              (see globals.css).
            */}
            <main
                data-fluid-root={isDashboard ? undefined : ""}
                className={`flex-grow ${!isDashboard && !isHomePage ? "pt-[var(--header-h)]" : ""}`}
            >
                {children}
            </main>

            {!isDashboard && <LowerFooter />}
        </>
    );
}