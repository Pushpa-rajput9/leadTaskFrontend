import { Outlet } from "react-router-dom";
import React from 'react';
import Header from "./pages/Header";

function Layout() {
  return (
    <div className="flex ">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;