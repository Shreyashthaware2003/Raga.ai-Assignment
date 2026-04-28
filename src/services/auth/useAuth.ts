import { useEffect, useState } from "react";

type StoredUser = {
    uid: string;
    email: string | null;
    name: string | null;
    token: string;
};

export const useAuth = () => {
    const [user, setUser] = useState<StoredUser | null>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("healthcare_user");

            setUser(stored ? JSON.parse(stored) : null);
        } catch {
            setUser(null);
        }
    }, []);

    return user;
};