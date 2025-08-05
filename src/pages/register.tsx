// src/pages/register.tsx

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    seller_id: "",
    store_name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    password: "",
    is_verified: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: any = {};
    if (!form.seller_id) e.seller_id = "請輸入店家代號";
    if (!form.store_name) e.store_name = "請輸入店家名稱";
    if (form.password.length < 6) e.password = "密碼至少 6 碼";
    return e;
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);

    try {
      // 加密密碼
      const hashedPassword = await bcrypt.hash(form.password, 10);

      const { error } = await supabase.from("sellers").insert({
        seller_id: form.seller_id,
        store_name: form.store_name,
        phone: form.phone,
        address: form.address,
        description: form.description,
        email: form.email,
        password_hash: hashedPassword, // 使用加密後的密碼
        created_at: new Date().toISOString(),
        is_verified: form.is_verified,
      });

      if (error) {
        if (error.code === '23505') { // 唯一性約束違反
          setErrors({ seller_id: "此店家代號已被使用" });
        } else {
          alert("註冊失敗：" + error.message);
        }
      } else {
        alert("註冊成功！");
        navigate("/seller/" + form.seller_id);
      }
    } catch (err) {
      console.error("註冊錯誤:", err);
      alert("系統錯誤，請稍後再試");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    fontFamily: 'Arial, "Noto Sans TC", "Microsoft JhengHei", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6" style={inputStyle}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">商家註冊</h1>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">店家代號 *</label>
          <input
            type="text"
            name="seller_id"
            value={form.seller_id}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="rxv001"
            style={inputStyle}
            lang="zh-Hant"
          />
          {errors.seller_id && <p className="mt-1 text-red-500 text-sm">{errors.seller_id}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">店家名稱 *</label>
          <input
            type="text"
            name="store_name"
            value={form.store_name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="RxV 雙寶小舖"
            style={inputStyle}
            lang="zh-Hant"
          />
          {errors.store_name && <p className="mt-1 text-red-500 text-sm">{errors.store_name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="store@example.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">電話</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="0912345678"
            style={inputStyle}
            lang="zh-Hant"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">地址</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="台北市信義區信義路五段7號"
            style={inputStyle}
            lang="zh-Hant"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">商家簡介</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[100px]"
            placeholder="請簡單介紹您的店家..."
            style={inputStyle}
            lang="zh-Hant"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">密碼 *</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="請輸入至少6碼密碼"
            style={inputStyle}
          />
          {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="flex items-center py-2">
          <input
            type="checkbox"
            name="is_verified"
            checked={form.is_verified}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-200"
          />
          <span className="ml-3 text-sm text-gray-700" style={inputStyle}>已通過經濟部核可</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed mt-6"
          style={inputStyle}
        >
          {submitting ? "註冊中..." : "註冊店家"}
        </button>
      </form>
    </div>
  );
}