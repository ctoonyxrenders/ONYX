// services/authService.ts
import axios from "axios";
import { ApiResponse } from "@/types/api";
import { apiWrapper } from "./wrapper-api";
import api from "./axios";

export interface LoginRequest {
    email: string;
    password: string;
    role: "admin" | "client";
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "client";
    photoUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export async function loginApi(body: LoginRequest): Promise<ApiResponse<{ user: User, token: string }>> {
    return apiWrapper<{ user: User, token: string }>(
        async () => {
            const res = await api.post<ApiResponse<{ user: User, token: string }>>("/auth/login", body);
            return res.data;
        },
        { showToast: false }
    );
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
    return apiWrapper<User>(
        async () => {
            const res = await api.get<ApiResponse<User>>("/auth/user");
            return res.data
        },
        { showToast: false }
    )
}

export async function changeAccountPassword(body: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<ApiResponse<null>> {
    return apiWrapper<null>(
        async () => {
            const res = await api.post('/auth/change-password', body)
            return res.data
        },
        { showToast: true }
    )
}

export async function forgetPassword(body: { email: string }): Promise<ApiResponse<null>> {
    console.log("body", body)
    return apiWrapper<null>(
        async () => {
            const res = await api.post<ApiResponse<null>>("/auth/forget-password", body);
            return res.data;
        },
        { showToast: true }
    )
}

export async function resetPassword(body: { token: string; newPassword: string }): Promise<ApiResponse<null>> {
    return apiWrapper<null>(
        async () => {
            const res = await api.post<ApiResponse<null>>("/auth/reset-password", body);
            return res.data;
        },
        { showToast: true }
    );
}

export async function logoutUser(): Promise<ApiResponse<null>> {
    return apiWrapper<null>(
        async () => {
            const res = await api.post<ApiResponse<null>>("/auth/logout");
            return res.data;
        },
        { showToast: false }
    );
}

export async function getInviteEmail(token: string): Promise<ApiResponse<{ email: string }>> {
    console.log("TOKEN FOUND", token)
    return apiWrapper<{ email: string }>(
        async () => {
            const res = await api.post<ApiResponse<{ email: string }>>("/auth/invite-email", { token: token });
            return res.data;
        },
        { showToast: true }
    )
}