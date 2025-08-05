import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">歡迎使用預購平台！</h1>
      <p className="mb-8">請點下方按鈕進入商家登入頁面</p>
      <button
        onClick={() => navigate('/login')}
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
      >
        進入商家頁
      </button>
    </div>
  )
}

