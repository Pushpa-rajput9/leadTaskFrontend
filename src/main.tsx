import { StrictMode } from "react";
import React from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";
import App from './pages/App';
import './index.css';
import Layout from "./Layout";
import LeadList from "./pages/LeadList";
import AddLead from "./pages/AddLead";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
    {/* <Route index element={<App />} /> */}
      <Route  path="" element={<LeadList />} />
      <Route path="lead/new" element={<AddLead />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);