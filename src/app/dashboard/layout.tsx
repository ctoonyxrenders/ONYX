// app/dashboard/layout.tsx
"use client";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/store/store";
import { useEffect } from "react";
import { fetchUser } from "../store/slices/authSlice";
import type { AppDispatch } from "@/app/store/store";
import GlobalLoadingOverlay from "@/components/dashboard/GlobalLoadingOverlay";
// import GlobalLoadingOverlay from "@/components/GlobalLoadingOverlay"; // Adjust path as needed

function InitAuth({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <>
            <GlobalLoadingOverlay />
            {children}
        </>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <InitAuth>{children}</InitAuth>
        </Provider>
    );
}