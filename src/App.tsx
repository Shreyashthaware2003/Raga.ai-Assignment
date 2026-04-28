import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";
import Login from "./modules/auth/Login";
import DashboardLayout from "./modules/dashboard/DashboardLayout";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors theme="dark" />

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected / layout routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;