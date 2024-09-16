import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Lazy load del componente Register
const Register = React.lazy(() => import('./Pages/Register/Register'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Home = React.lazy(()=>import ('./Pages/Home/Home'))
const Verify = React.lazy(()=>import ('./Pages/Verify/Verify'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyCode" element={<Verify />} />
        </Routes>
      </Suspense>
      </BrowserRouter>
  );
}

export default App;
