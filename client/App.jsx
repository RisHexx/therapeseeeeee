import "./global.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Feed from "./pages/Feed";
import Journal from "./pages/Journal";
import Directory from "./pages/Directory";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/auth/AuthProvider";
import RequireAdmin from "./components/auth/RequireAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")).render(<App />);
