"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { connect } from "react-redux";
import LoginForm from "@/components/dashboard/Login";
// import {
//   signIn,
//   showLoading,
//   hideAuthMessage,
// } from "@/app/store/slices/authSlice";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const role: "admin" | "client" = roleParam === "admin" ? "admin" : "client";

  const handleForgetPassword = () => {
    // Add forgot password logic here
    console.log("Forgot password clicked");
  };

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

      <div className="relative w-full max-w-md">
        {/* Main Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6">
              <Image
                src="/logo/logo-without-text-theme.svg"
                alt="Onyx Render"
                width={80}
                height={80}
              />
            </div>

            <h1 className="text-3xl font-bold text-[#114046] mb-2 tracking-tight poppins">
              Welcome Back
            </h1>
            <p className="text-gray-600 para poppins">
              Sign in to access your {role === "admin" ? "admin" : "client"}{" "}
              dashboard
            </p>
          </div>

          {/* Login Form Component */}
          <LoginForm
            role={role}
          />
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = ({ auth }: any) => ({
//   auth,
// });

// const mapDispatchToProps = {
//   signIn,
//   showLoading,
//   hideAuthMessage,
// };

export default (LoginPage);
