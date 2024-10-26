import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import store from "./redux/store";
import { Provider } from "react-redux";

const Register = React.lazy(() => import("./Pages/Register/Register"));
const Login = React.lazy(() => import("./Pages/Login/Login"));
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Verify = React.lazy(() => import("./Pages/Verify/Verify"));
const ListWells = React.lazy(() => import("./Pages/ListWells/ListWells"));
const ForgotPassword = React.lazy(
  () => import("./Pages/ForgotPassword/ForgotPassword")
);
const ChangePassword = React.lazy(
  () => import("./Pages/ChangePassword/ChangePassword")
);
const LandingPage = React.lazy(() => import("./Pages/LandingPage/LandingPage"));

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

const AuthenticatedRedirect = ({ children }) => {
  const authToken = useSelector((state) => state.authToken?.access_token);

  return isTokenValid(authToken) ? <Navigate to="/home" /> : children;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listWells" element={<ListWells />} />
            <Route
              path="/login"
              element={
                <AuthenticatedRedirect>
                  <Login />
                </AuthenticatedRedirect>
              }
            />
            <Route
              path="/verifyCode"
              element={
                <AuthenticatedRedirect>
                  <Verify />
                </AuthenticatedRedirect>
              }
            />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
