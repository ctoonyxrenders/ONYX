import { AllConversationApiResponse, ApiResponse, ConversationApiResponse, GetAllMessageOfConversation, Invoice, ProjectApiResponse } from "@/types/api";
import api from "./axios";
import { apiWrapper } from "./wrapper-api";

export async function getConversationApi(clientId: string): Promise<ApiResponse<ConversationApiResponse>> {
    return apiWrapper(
        async () => {
            const response = await api.post<ApiResponse<ConversationApiResponse>>(`/chat/conversation/${clientId}`);
            return response.data;
        },
    )
}

export async function getAdminConversationApi(page: number): Promise<ApiResponse<AllConversationApiResponse[]>> {
    return apiWrapper(
        async () => {
            const response = await api.get<ApiResponse<AllConversationApiResponse[]>>(`/chat/conversations/?limit=${page}`);
            return response.data;
        },
    )
}

export async function getAllConversationsApi(): Promise<ApiResponse<AllConversationApiResponse[]>> {
    return apiWrapper(
        async () => {
            const response = await api.get<ApiResponse<AllConversationApiResponse[]>>(`/chat/all-conversations`);
            return response.data;
        },
    )
}

export async function getAllMessagesOfConversation(conversationId: string, limit = 10, cursor: string | null): Promise<ApiResponse<GetAllMessageOfConversation>> {
    return apiWrapper(
        async () => {
            const response = await api.get<ApiResponse<GetAllMessageOfConversation>>(`/chat/messages/${conversationId}?limit=${limit}&before=${cursor}`);
            return response.data;
        }
    )
}

export async function uploadChatFile(file: File): Promise<ApiResponse<{ fileUrl: string }>> {
    const formData = new FormData();
    formData.append("file", file);

    return apiWrapper(
        async () => {
            const response = await api.post<ApiResponse<{ fileUrl: string }>>(`/chat/upload-file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        }
    )
}

export async function getInvoiceWithId(id: string): Promise<ApiResponse<Invoice>> {
    return apiWrapper(
        async () => {
            const response = await api.post<ApiResponse<Invoice>>(`/chat/invoice`, { id });
            return response.data
        }
    )
}

export async function getProjectWithId(id: string): Promise<ApiResponse<ProjectApiResponse>> {
    return apiWrapper(
        async () => {
            const response = await api.post<ApiResponse<ProjectApiResponse>>(`/chat/project`, { id });
            return response.data
        }
    )
}