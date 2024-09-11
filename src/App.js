import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Lazy load del componente Register
const Register = React.lazy(() => import('./Pages/Register/Register'));
const Login = React.lazy(() => import('./Pages/Login/Login'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
      </BrowserRouter>
  );
}

export default App;
