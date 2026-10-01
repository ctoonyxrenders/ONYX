import { ApiResponse, UserApiResponse, CreateClientBody, GetAllClientsApiResponse, RegisterClientBody, Invoice, InvoiceResponse, CreateInvoiceBody, EditInvoiceBody, InviteResponse, UpdateAdminBody, ProjectApiResponse, CreateProjectBody, AdminInsightsApiResponse, ProjectContentMessage, InvoiceContentMessage } from "@/types/api";
// import { ApiResponse, UserApiResponse, CreateClientBody, GetAllClientsApiResponse, RegisterClientBody, CreateProjectBody, ProjectApiResponse, UpdateAdminBody } from "@/types/api";
import { apiWrapper } from "./wrapper-api";
import api from "./axios";


const COLLECTION_BASE = "/admin-only"


export async function createClientApi(body: CreateClientBody): Promise<ApiResponse<UserApiResponse>> {
    return apiWrapper(
        async () => {
            const res = await api.post<ApiResponse<UserApiResponse>>(`${COLLECTION_BASE}/create-client`, body);
            return res.data
        },
        { showToast: true }
    )
}

export async function getClientsApi(page: number, limit: number): Promise<ApiResponse<GetAllClientsApiResponse>> {
    return apiWrapper<GetAllClientsApiResponse>(
        async () => {
            const res = await api.get<ApiResponse<GetAllClientsApiResponse>>(`${COLLECTION_BASE}/all-clients?page=${page}&limit=${limit}`)
            return res.data
        }
    )
}

export async function deleteClient(id: string): Promise<ApiResponse<null>> {
    return apiWrapper<null>(
        async () => {
            const res = await api.delete<ApiResponse<null>>(`${COLLECTION_BASE}/client/${id}`);
            return res.data
        },
        { showToast: true }
    )
}

export async function inviteClientApi(body: { email: string, day: number }): Promise<ApiResponse<null>> {
    return apiWrapper<null>(
        async () => {
            const res = await api.post<ApiResponse<null>>(`${COLLECTION_BASE}/invite-client`, body);
            return res.data;
        },
        { showToast: true }
    )
}



export async function registerClientApi(body: RegisterClientBody): Promise<ApiResponse<UserApiResponse>> {
    return apiWrapper<UserApiResponse>(
        async () => {
            const res = await api.post<ApiResponse<UserApiResponse>>(`auth/register-client`, body);
            return res.data;
        },
        { showToast: true }
    );
}

export async function getAllClientsForProjectsApi(): Promise<ApiResponse<UserApiResponse[]>> {
    return apiWrapper<UserApiResponse[]>(
        async () => {
            const res = await api.get<ApiResponse<UserApiResponse[]>>(`${COLLECTION_BASE}/all-clients-projects`)
            return res.data
        }
    )
}

export async function getAdminProfile(): Promise<ApiResponse<UserApiResponse>> {
    return apiWrapper<UserApiResponse>(
        async () => {
            const res = await api.get<ApiResponse<UserApiResponse>>(`${COLLECTION_BASE}/profile`);
            return res.data
        }
    )
}

export async function getInvoices(page: number, limit: number): Promise<ApiResponse<InvoiceResponse>> {
    return apiWrapper<InvoiceResponse>(
        async () => {
            const res = await api.get<ApiResponse<InvoiceResponse>>(`${COLLECTION_BASE}/all-invoices?page=${page}&limit=${limit}`)
            return res.data
        }
    )
}
export async function createInvoice(body: CreateInvoiceBody): Promise<ApiResponse<Invoice>> {
    return apiWrapper<Invoice>(
        async () => {
            const res = await api.post<ApiResponse<Invoice>>(`${COLLECTION_BASE}/create-invoice`, body)
            return res.data
        },
    )
}

export async function updateAdminProfileApi(body: UpdateAdminBody): Promise<ApiResponse<UserApiResponse>> {
    return apiWrapper<UserApiResponse>(
        async () => {
            const res = await api.patch<ApiResponse<UserApiResponse>>(`${COLLECTION_BASE}/profile`, body);
            return res.data;
        },
        { showToast: true }
    )
}

export async function createProjectApi(body: CreateProjectBody): Promise<ApiResponse<ProjectApiResponse>> {
    return apiWrapper<ProjectApiResponse>(
        async () => {
            const res = await api.post<ApiResponse<ProjectApiResponse>>(`${COLLECTION_BASE}/create-project`, body);
            return res.data
        }
    )
}

export async function getAllProjects(page: number, limit: number): Promise<ApiResponse<ProjectApiResponse[]>> {
    return apiWrapper<ProjectApiResponse[]>(
        async () => {
            const res = await api.get<ApiResponse<ProjectApiResponse[]>>(`${COLLECTION_BASE}/all-project?page=${page}&limit=${limit}`)
            return res.data
        }
    )
}

export async function deleteInvoice(id: string): Promise<ApiResponse<Invoice>> {
    return apiWrapper<Invoice>(
        async () => {
            const res = await api.delete<ApiResponse<Invoice>>(`${COLLECTION_BASE}/invoice/${id}`)
            return res.data
        }
    )
}

export async function editInvoice(id: string, body: EditInvoiceBody): Promise<ApiResponse<Invoice>> {
    return apiWrapper<Invoice>(
        async () => {
            const res = await api.put<ApiResponse<Invoice>>(`${COLLECTION_BASE}/invoice/${id}`, body)
            return res.data
        }
    )
}

export async function getInvites(): Promise<ApiResponse<InviteResponse>> {
    return apiWrapper<InviteResponse>(
        async () => {
            const res = await api.get<ApiResponse<InviteResponse>>(`${COLLECTION_BASE}/all-invites`)
            return res.data
        }
    )
}
export async function deleteInvite(id: string): Promise<ApiResponse<null>> {
    return apiWrapper<null>(
        async () => {
            const res = await api.delete<ApiResponse<null>>(`${COLLECTION_BASE}/invite/${id}`)
            return res.data
        }
    )
}
export async function updateProjectApi(projectId: string, body: CreateProjectBody): Promise<ApiResponse<null>> {
    return apiWrapper(
        async () => {
            const res = await api.put<ApiResponse<null>>(`${COLLECTION_BASE}/project/${projectId}`, body);
            return res.data
        }
        ,
        { showToast: true }
    )
}

export async function deleteProjectApi(projectId: string): Promise<ApiResponse<null>> {
    return apiWrapper(
        async () => {
            const res = await api.delete<ApiResponse<null>>(`${COLLECTION_BASE}/project/${projectId}`);
            return res.data;
        },
        { showToast: true }
    )
}

export async function getAdminInsightsApi(): Promise<ApiResponse<AdminInsightsApiResponse>> {
    return apiWrapper<AdminInsightsApiResponse>(
        async () => {
            const res = await api.get<ApiResponse<AdminInsightsApiResponse>>(`${COLLECTION_BASE}/insights`)
            return res.data
        }
    )
}

export async function sendProjectMessage(clientId: string, messageContent: ProjectContentMessage): Promise<ApiResponse<{ conversationId: string, clientId: string }>> {
    return apiWrapper(
        async () => {
            const res = await api.post<ApiResponse<{ conversationId: string, clientId: string }>>(`/chat/send-project-message`, { clientId, messageContent });
            return res.data
        }
    )
}

export async function sendInvoiceMessage(projectId: string, messageContent: InvoiceContentMessage): Promise<ApiResponse<{ conversationId: string, clientId: string }>> {
    return apiWrapper(
        async () => {
            const res = await api.post<ApiResponse<{ conversationId: string, clientId: string }>>(`/chat/send-invoice-message`, { projectId, messageContent });
            return res.data
        }
    )
}