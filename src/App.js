import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
import store from "./redux/store";
import { Provider } from "react-redux";
import Layout from "./components/Layout"; // Import the Layout component
import ListWells from "./Pages/ListWells";
import WellDetails from "./Pages/WellDetails";
import JobsList from "./Pages/JobsList";
import JobDetails from "./Pages/JobDetails";
import Account from "./Pages/Account";

const Register = React.lazy(() => import("./Pages/Register"));
const Login = React.lazy(() => import("./Pages/Login"));
const Verify = React.lazy(() => import("./Pages/Verify"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword"));
const ChangePassword = React.lazy(() => import("./Pages/ChangePassword"));

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    return decoded.exp > currentTime && decoded.permissions === "login"; // Verifica permisos y expiración
  } catch {
    return false;
  }
};

const AuthenticatedRedirect = ({ children }) => {
  const authToken = useSelector((state) => state.authToken?.access_token);

  return isTokenValid(authToken) ? <Navigate to="/wells" /> : children;
};

const ProtectedRoute = ({ children }) => {
  const authToken = useSelector((state) => state.authToken?.access_token);
  
  return isTokenValid(authToken) ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/register" element={<AuthenticatedRedirect><Register /></AuthenticatedRedirect>} />
            <Route path="/login" element={<AuthenticatedRedirect><Login /></AuthenticatedRedirect>} />
            <Route path="/verifyCode" element={<AuthenticatedRedirect><Verify /></AuthenticatedRedirect>} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/wells" />} />
              <Route path="wells" element={<ListWells />} />
              <Route path="wells/:wellId" element={<WellDetails />} />
              <Route path="jobs" element={<JobsList />} />
              <Route path="jobs/:jobId" element={<JobDetails />} />
              <Route path="account" element={<Account />} />
              <Route path="*" element={<Navigate to="/wells" />} /> 
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;