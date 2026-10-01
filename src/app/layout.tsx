import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import PageTransition from "@/components/shared/PageTransition";
import { Header, LowerFooter } from "@/components/shared";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { ConfigProviders } from "./providers";
import AppWrapper from "@/components/shared/AppWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const centuryGothic = localFont({
  src: [
    {
      path: "/font/CenturyGothicPaneuropeanRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/font/CenturyGothicPaneuropeanItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "/font/CenturyGothicPaneuropeanBold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "/font/CenturyGothicPaneuropeanBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "/font/CenturyGothicPaneuropeanLight.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "/font/CenturyGothicPaneuropeanLightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "/font/CenturyGothicPaneuropeanSemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "/font/CenturyGothicPaneuropeanSemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "/font/CenturyGothicPaneuropeanBlack.ttf",
      weight: "900",
      style: "black",
    },
    {
      path: "/font/CenturyGothicPaneuropeanBlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-century-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onyx Renders LLC",
  description: "Onyx Renders offers high-quality 3D architectural rendering, visualization, animations, and Pano360. From interior & exterior 3D renderings to walkthroughs & virtual tours, we bring designs to life.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${centuryGothic.variable} antialiased min-h-screen flex flex-col`}>
        <ConfigProviders>
          <Toaster toastOptions={{
            success: {
              style: {
                background: '#296D76',
                color: 'white',
              },
            },
            error: {
              style: {
                background: '#DD4949',
                color: 'white',
              },
            },
          }} position="bottom-right" reverseOrder={false} />
          <AppWrapper>{children}</AppWrapper>
          {/* <PageTransition />

          <Header />
          <ScrollToTop />
          <Link href="/studio/#scheduleCall" className="fixed -right-8 lg:-right-12 3xl:-right-28 top-1/2 transform -translate-y-1/2 bg-[#114046] text-white rounded-t-xl  px-2 py-1 lg:px-4 lg:py-2 3xl:px-6 3xl:py-4 -rotate-90 z-50 shadow border">
            <span className="font-semibold text-sm lg:text-xl 3xl:text-5xl">Contact Us</span>
          </Link>

          <main className="flex-grow">{children}</main>
          <LowerFooter /> */}
        </ConfigProviders>
      </body>
    </html>
  );
}
