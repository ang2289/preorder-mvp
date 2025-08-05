import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import bcrypt from 'bcryptjs';

export default function SellerLoginPage() {
  const [shopId, setShopId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputStyle = {
    fontFamily: 'Arial, "Noto Sans TC", "Microsoft JhengHei", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 查詢店家資料
      const { data, error: fetchError } = await supabase
        .from('sellers')
        .select('*')
        .eq('seller_id', shopId)
        .maybeSingle();

      if (fetchError) {
        console.error('查詢錯誤:', fetchError);
        setError('系統錯誤，請稍後再試');
        return;
      }

      if (!data) {
        setError('找不到此店家代號');
        return;
      }

      // 驗證密碼
      const match = await bcrypt.compare(password, data.password_hash);
      if (!match) {
        setError('密碼錯誤');
        return;
      }

      // 登入成功，儲存資訊
      localStorage.setItem('seller_id', shopId);
      localStorage.setItem('store_name', data.store_name);
      
      // 導向商家後台
      navigate(`/seller/${shopId}`);
    } catch (err) {
      console.error('登入錯誤:', err);
      setError('系統錯誤，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6" style={inputStyle}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">商家登入</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              店家代號
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              placeholder="請輸入店家代號"
              required
              style={inputStyle}
              lang="zh-Hant"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              密碼
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm text-center" style={inputStyle}>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
            style={inputStyle}
          >
            {isLoading ? "登入中..." : "登入"}
          </button>

          <div className="text-center mt-4">
            <a 
              href="/register" 
              className="text-sm text-blue-600 hover:text-blue-800 transition duration-200"
              style={inputStyle}
            >
              還沒有帳號？立即註冊
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}