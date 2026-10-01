// components/GlobalLoadingOverlay.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";

const GlobalLoadingOverlay: React.FC = () => {
    const { loading } = useSelector((state: RootState) => state.auth);

    if (!loading) return null;

    return (
        <div
            className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-[9999]"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div className="text-center">
                {/* Animated spinner */}
                <div className="relative">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500 mx-auto mb-4"
                        style={{
                            width: "48px",
                            height: "48px",
                            border: "4px solid #e5e7eb",
                            borderTop: "4px solid #3b82f6",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto 16px",
                        }}
                    ></div>
                </div>

                {/* Loading text */}
                <div className="text-lg font-medium text-gray-700 mb-2">
                    Loading...
                </div>

                {/* Subtitle */}
                <div className="text-sm text-gray-500">
                    Please wait while we set things up for you
                </div>
            </div>

            {/* Add the keyframes for spin animation if not available in your CSS */}
            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default GlobalLoadingOverlay;