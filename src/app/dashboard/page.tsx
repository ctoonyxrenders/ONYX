"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Shield, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";

const WelcomePage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (loading) return; // Wait for auth check to complete

    if (isAuthenticated && user) {
      // Redirect to appropriate dashboard based on user role
      if (user.role === "admin") {
        router.push("/dashboard/admin/clients");
      } else if (user.role === "client") {
        router.push("/dashboard/client/projects");
      }
    }
  }, [isAuthenticated, user, loading, router]);

  const handleRoleSelection = (role: "admin" | "client") => {
    if (isAuthenticated && user) {
      // If already authenticated, redirect directly to dashboard
      if (role === "admin" && user.role === "admin") {
        router.push("/dashboard/admin/clients");
      } else if (role === "client" && user.role === "client") {
        router.push("/dashboard/client/projects");
      } else {
        // Role mismatch - redirect to login
        router.push(`/dashboard/login?role=${role}`);
      }
    } else {
      // Not authenticated - go to login
      router.push(`/dashboard/login?role=${role}`);
    }
  };

  // Don't render anything while loading or if already authenticated
  if (loading) {
    return null; // Global loading overlay will handle this
  }

  if (isAuthenticated && user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-[#bac3c833] flex items-center justify-center p-4 poppins">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23114046' fillOpacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      <div className="relative w-full max-w-4xl">
        {/* Main Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-35 h-35 rounded-2xl mb-6 ">
              <Image
                src="/logo/logo-without-text-theme.svg"
                alt="Onyx Render"
                width={80}
                height={80}
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#114046] mb-4 tracking-tight poppins">
              WELCOME TO ONYX RENDERS
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed para poppins">
              Choose your role to access your personalized dashboard experience
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Admin Card */}
            <div
              onClick={() => handleRoleSelection("admin")}
              className="group relative overflow-hidden bg-gradient-to-br from-[#114046]/10 to-[#1a6978]/10 rounded-2xl p-8 border border-[#114046]/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#114046]/25 hover:border-[#114046]/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#114046]/5 to-[#1a6978]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-[#114046] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-[#114046] mb-4 group-hover:text-[#1a6978] transition-colors poppins">
                  Administrator
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed para poppins">
                  Access client details, manage projects, view analytics, and
                  chat with the team.
                </p>

                <div className="flex items-center text-[#114046] font-semibold group-hover:text-[#1a6978] transition-colors poppins">
                  <span>Enter Admin Panel</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#114046]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Client Card */}
            <div
              onClick={() => handleRoleSelection("client")}
              className="group relative overflow-hidden bg-gradient-to-br from-[#1a6978]/10 to-[#114046]/10 rounded-2xl p-8 border border-[#1a6978]/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#1a6978]/25 hover:border-[#1a6978]/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a6978]/5 to-[#114046]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-[#1a6978] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-[#1a6978] mb-4 group-hover:text-[#114046] transition-colors poppins">
                  Client
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed para poppins">
                  View your personal dashboard, and chat with our team.
                </p>

                <div className="flex items-center text-[#1a6978] font-semibold group-hover:text-[#114046] transition-colors poppins">
                  <span>Enter Client Portal</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#1a6978]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm para poppins">
              Need help? Contact support at{" "}
              <span className="text-[#114046] hover:text-[#1a6978] cursor-pointer transition-colors">
                support@dashboard.com
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;