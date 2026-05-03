import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";
import Login from "./modules/auth/Login";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./app/routes/ProtectedRoute";
import Home from "./modules/analytics/Analytics";
import Analytics from "./modules/analytics/Analytics";
import PatientDetails from "./modules/patient-details/PatientDetails";
import Dashboard from "./modules/dashboard/Dashboard";

function App() {

  const isAuthenticated = localStorage.getItem('healthcare_user');

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


        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="patient-details" element={<PatientDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;