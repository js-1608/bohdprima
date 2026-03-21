import './index.css';
import './App.css';

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import AppShell from './components/AppShell';
import ProtectedRoute from './components/ProtectedRoute';
import { routes } from "./components/Route";
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <AppShell showPublicChrome={!isAdminRoute}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={(
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </AppShell>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;