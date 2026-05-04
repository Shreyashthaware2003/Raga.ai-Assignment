import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import type { AppDispatch } from "./index";
import { auth } from "@/services/firebase";
import { clearAuth, setAuthError, setAuthLoading, setAuthUser } from "./slices/authSlice";

export const loginUser =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setAuthLoading());

            const cred = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
            const firebaseUser = cred.user;
            const idToken = await firebaseUser.getIdToken();

            dispatch(
                setAuthUser({
                    user: {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                    },
                    idToken,
                })
            );
        } catch (err: any) {
            const code = err?.code;
            let message = "Something went wrong";
            if (code === "auth/user-not-found") message = "User not found";
            if (code === "auth/wrong-password") message = "Incorrect password";
            if (code === "auth/invalid-email") message = "Invalid email";

            dispatch(setAuthError(message));
            throw err;
        }
    };

export const logoutUser = () => async (dispatch: AppDispatch) => {
    await signOut(auth);
    dispatch(clearAuth());
};

export const initAuthListener = (dispatch: AppDispatch) => {
    dispatch(setAuthLoading());

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
            dispatch(clearAuth());
            return;
        }

        const idToken = await firebaseUser.getIdToken();
        dispatch(
            setAuthUser({
                user: {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                },
                idToken,
            })
        );
    });

    return unsubscribe;
};
