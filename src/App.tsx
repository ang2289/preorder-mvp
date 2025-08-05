import { Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/register';
import SellerLoginPage from './pages/sellerLogin';

function HomePage() {
  const inputStyle = {
    fontFamily: 'Arial, "Noto Sans TC", "Microsoft JhengHei", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6" style={inputStyle}>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">預購平台</h1>
        <p className="text-gray-600 text-center mb-8">歡迎使用！請選擇您要進入的身份：</p>
        
        <div className="space-y-4">
          <Link 
            to="/seller-login" 
            className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-lg shadow-sm transition duration-200"
          >
            我是商家
          </Link>
          
          <Link 
            to="/register" 
            className="block w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white text-center font-medium rounded-lg shadow-sm transition duration-200"
          >
            註冊新商家
          </Link>
          
          <Link 
            to="/customer" 
            className="block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white text-center font-medium rounded-lg shadow-sm transition duration-200"
          >
            我是顧客
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/seller-login" element={<SellerLoginPage />} />
      {/* 賣家相關路由 */}
      <Route path="/seller/:sellerId/*" element={<div>賣家後台（待開發）</div>} />
      {/* 顧客相關路由 */}
      <Route path="/customer/*" element={<div>顧客頁面（待開發）</div>} />
    </Routes>
  );
}

export default App;