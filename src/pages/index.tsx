import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">歡迎使用預購平台</h1>
      <p className="text-gray-600 mb-8">請選擇以下操作：</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          className="bg-green-500 text-white py-3 rounded hover:bg-green-600"
          onClick={() => navigate('/register')}
        >
          店家註冊
        </button>
        <button
          className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          onClick={() => navigate('/login')}
        >
          店家登入
        </button>
      </div>
    </div>
  )
}
