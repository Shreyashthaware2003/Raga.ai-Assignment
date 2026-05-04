import { useAppSelector } from "@/store/hooks";

type StoredUser = {
    uid: string;
    email: string | null;
    name: string | null;
    token: string;
};

export const useAuth = () => {
    const { user, idToken } = useAppSelector((state) => state.auth);

    if (!user || !idToken) {
        return null;
    }

    const mappedUser: StoredUser = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: idToken,
    };

    return mappedUser;
};
