import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Data_Table } from "./components/Data_Table";
import Update from "./pages/Update";
import AppProvider from "./context/appContext";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <LogIn />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/search",
        element: <Data_Table />,
      },
      {
        path: "/update",
        element: <Update />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
