import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth-context';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-brand-off min-h-screen">{children}</div>;
}

function AppRoutes() {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-brand-off flex items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Landing />
          </>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={session ? <ProtectedLayout><Dashboard /></ProtectedLayout> : <Navigate to="/login" />} />
      <Route path="/analytics" element={session ? <ProtectedLayout><Analytics /></ProtectedLayout> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
