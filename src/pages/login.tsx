import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function LoginPage() {
  const [shopId, setShopId] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!shopId.trim()) {
      setError('請輸入店家 ID')
      return
    }

    // 檢查 Supabase 是否有這個 shop
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('id', shopId)
      .single()

    if (error || !data) {
      setError('找不到這個店家，請確認 ID 是否正確')
      return
    }

    localStorage.setItem('shop_id', shopId)
    navigate('/seller')
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">店家登入</h1>
      <label className="block mb-2">請輸入店家 ID：</label>
      <input
        type="text"
        value={shopId}
        onChange={(e) => setShopId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="例如：demo-shop"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        登入
      </button>
    </div>
  )
}
