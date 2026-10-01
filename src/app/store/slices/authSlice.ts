import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getCurrentUser, loginApi, LoginRequest, User } from "@/app/api/backend/auth";

interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: null,
	loading: true, // Start with loading true on initial load
	error: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart(state) {
			state.loading = true;
			state.error = null;
		},
		loginSuccess(state, action: PayloadAction<User>) {
			state.loading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
			state.error = null;
		},
		loginFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.isAuthenticated = false;
			state.user = null;
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.loading = false;
			state.error = null;
			localStorage.removeItem("token");
		},
		setUser(state, action: PayloadAction<User | null>) {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
			state.loading = false;
			state.error = null;
		},
		// Add a new action to handle fetch start
		fetchUserStart(state) {
			state.loading = true;
			state.error = null;
		}
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	setUser,
	fetchUserStart
} = authSlice.actions;

export default authSlice.reducer;

// =====================
// Thunk: Login
// =====================
export const loginThunk =
	(body: LoginRequest) => async (dispatch: AppDispatch) => {
		try {
			dispatch(loginStart());
			const res = await loginApi(body);

			if (res && res.data) {
				dispatch(loginSuccess(res.data.user));
				localStorage.setItem("token", res.data.token);
			} else {
				dispatch(loginFailure(res.message));
			}
		} catch (error) {
			dispatch(loginFailure("Login failed"));
		}
	};

// =====================
// Thunk: Fetch User (on refresh or first load)
// =====================
export const fetchUser = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchUserStart()); // Use the specific action for fetch start

		const res = await getCurrentUser();

		if (res && res.data) {
			dispatch(setUser(res.data));
		} else {
			dispatch(setUser(null));
		}
	} catch (error) {
		console.error("Failed to fetch user:", error);
		dispatch(setUser(null)); // Set user to null instead of loginFailure
	}
};