import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Lazy load del componente Register
const Register = React.lazy(() => import('./Pages/Register/Register'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Home = React.lazy(()=>import ('./Pages/Home/Home'))
const Main = React.lazy(()=>import ('./Pages/Main/Main'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
      </BrowserRouter>
  );
}

export default App;
