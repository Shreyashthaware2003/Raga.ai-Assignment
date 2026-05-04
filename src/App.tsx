import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";
import Login from "./modules/auth/Login";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./app/routes/ProtectedRoute";
import Analytics from "./modules/analytics/Analytics";
import PatientDetails from "./modules/patient-details/PatientDetails";
import Dashboard from "./modules/dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { initAuthListener } from "./store/authActions";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, status } = useAppSelector((s) => s.auth);

  useEffect(() => {
    const unsub = initAuthListener(dispatch);
    return () => unsub();
  }, [dispatch]);

  if (status === "loading" || status === "idle") return null;

  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors theme="dark" />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="patient-details" element={<PatientDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
