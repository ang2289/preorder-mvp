import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/index";
import SellerPage from "./pages/seller";
import AddProductPage from "./pages/seller/add";
import OrdersPage from "./pages/seller/orders";
import LoginPage from "./pages/login";
import RegisterPage from './pages/register';
import './index.css';  // 加上這行，才能啟用 Tailwind CSS
import App from './App.tsx';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/seller/add" element={<AddProductPage />} />
        <Route path="/seller/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* ❌ 已修正：移除錯誤的 SellerHome */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
