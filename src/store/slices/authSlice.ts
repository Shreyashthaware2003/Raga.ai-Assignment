import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
};

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthState = {
    user: AuthUser | null;
    idToken: string | null;
    isAuthenticated: boolean;
    status: AuthStatus;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    idToken: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLoading(state) {
            state.status = "loading";
            state.error = null;
        },
        setAuthUser(
            state,
            action: PayloadAction<{ user: AuthUser; idToken: string }>
        ) {
            state.user = action.payload.user;
            state.idToken = action.payload.idToken;
            state.isAuthenticated = true;
            state.status = "authenticated";
            state.error = null;
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.status = "unauthenticated";
        },
        clearAuth(state) {
            state.user = null;
            state.idToken = null;
            state.isAuthenticated = false;
            state.status = "unauthenticated";
            state.error = null;
        },
    },
});

export const { setAuthLoading, setAuthUser, setAuthError, clearAuth } =
    authSlice.actions;

export default authSlice.reducer;
