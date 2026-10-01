import api from "./axios";
import { ApiResponse, ClientProfile, ClientProject, InvoiceResponse, PaymentRequestData, PaymentResponse, InvoiceRequest, InsightsApiResponse } from "@/types/api";
import { apiWrapper } from "./wrapper-api";

export interface UpdateRequest {
    companyName: string;
    address: string;
    phone: string;
    name: string;
}

export async function getClientProjects(params: { page: number; limit: number }): Promise<ApiResponse<ClientProject[]>> {
    return apiWrapper<ClientProject[]>(
        async () => {
            const res = await api.get<ApiResponse<ClientProject[]>>(
                "/client/all-projects",
                { params } // axios will convert { page, limit } → ?page=1&limit=10
            );
            return res.data;
        },
        { showToast: false }
    );
}
export async function getClientProfile(): Promise<ApiResponse<ClientProfile>> {
    return apiWrapper<ClientProfile>(
        async () => {
            const res = await api.get<ApiResponse<ClientProfile>>("/client/profile");
            return res.data;
        },
        { showToast: false }
    );
}

export async function updateClientProfie(body: UpdateRequest): Promise<ApiResponse<ClientProfile>> {
    return apiWrapper<ClientProfile>(
        async () => {
            const res = await api.put<ApiResponse<ClientProfile>>("/client/profile", body)
            return res.data;
        }
    )
}
export async function getInvoices(): Promise<ApiResponse<InvoiceResponse>> {
    return apiWrapper<InvoiceResponse>(
        async () => {
            const res = await api.get<ApiResponse<InvoiceResponse>>("/client/all-invoices")
            return res.data
        }
    )
}

export async function makePayment(body: PaymentRequestData): Promise<ApiResponse<PaymentResponse>> {
    return apiWrapper<PaymentResponse>(
        async () => {
            const res = await api.post<ApiResponse<PaymentResponse>>(
                "/client/create-checkout-session",
                body
            );
            return res.data;
        }
    );
}

export async function updateInvoiceStatus(invoiceId: string): Promise<ApiResponse<InvoiceResponse>> {
    return apiWrapper<InvoiceResponse>(
        async () => {
            const res = await api.put<ApiResponse<InvoiceResponse>>(
                "/client/update-invoice-status",
                { params: { invoiceId } })
            return res.data;
        }
    )
}
export async function getInsights(): Promise<ApiResponse<InsightsApiResponse>> {
    return apiWrapper<InsightsApiResponse>(
        async () => {
            const res = await api.get<ApiResponse<InsightsApiResponse>>("/client/insights")
            return res.data;
        }
    )
}
