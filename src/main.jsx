import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router";


import './index.css'
import { getCurrentUser, hasPermission } from "./utils/auth";

import CorporateLayout from './layouts/CorporateLayout';
import Categoria from './pages/Categoria'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import Transacoes from './pages/Transacoes';



function PrivateRoute({ children, permission }) {
  const token = localStorage.getItem("token");
  const user = getCurrentUser();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  //if (permission && !hasPermission(permission)) {
  if (permission) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}


const router = createBrowserRouter([

  // ========================================
  // ROTA PÚBLICA
  // ========================================
  {
    path: "/",
    element: <Login />
  },

  // ========================================
  // ROTAS PROTEGIDAS
  // ========================================
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <CorporateLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "home",
            element: <p>Rota de home</p>
          },
          {
            path: "transacoes",
            element: <Transacoes />
          },
          {
            path: "usuarios",
            element: <p>Rota de usuários</p>
          },
          {
            path: "categoria",
            element: <Categoria />
          },
        ]
      }
    ]
  },


  // ========================================
  // QUALQUER ROTA DESCONHECIDA
  // ========================================
  {
    path: "*",
    element: <Navigate to="/" replace />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Categoria /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
