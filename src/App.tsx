import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";
import Login from "./modules/auth/Login";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./app/routes/ProtectedRoute";
import Home from "./modules/home/home";
import Analytics from "./modules/analytics/Analytics";
import PatientDetails from "./modules/patient-details/PatientDetails";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors theme="dark" />

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/patient-details" element={<PatientDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;