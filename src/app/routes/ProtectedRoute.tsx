import { useAppSelector } from '@/store/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const { isAuthenticated, status } = useAppSelector((s) => s.auth);

    if (status === "loading" || status === "idle") return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
}
