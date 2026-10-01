import { ApiResponse } from "@/types/api";
import toast from "react-hot-toast";


type ApiCall<T> = () => Promise<ApiResponse<T>>;

interface ApiWrapperOptions {
    showToast?: boolean;
}

export async function apiWrapper<T>(
    apiCall: ApiCall<T>,
    options: ApiWrapperOptions = { showToast: false }
): Promise<ApiResponse<T>> {
    try {
        const response = await apiCall();
        const { success, message } = response;
        if (!success) {
            toast.error(message || "Something went wrong");
        }

        if (options.showToast && success) {
            toast.success(message || "Success");
        }

        return response;
    } catch (error: any) {
        if (options.showToast) {
            toast.error(error.response.data.message || "Network error");
        }

        return {
            success: false,
            statusCode: 500,
            message: error.response.data.message || "Unexpected error",
            data: null,
            meta: null,
        };
    }
}