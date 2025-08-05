// src/pages/seller/login.tsx
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function SellerLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleLogin = async () => {
    const { email, password } = form
    if (!email || !password) {
      alert('請填寫 Email 和密碼')
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('登入失敗：' + error.message)
    } else {
      // 假設登入成功後從使用者資料取得店家資料
      const user = data.user
      const { data: shop } = await supabase
        .from('shops')
        .select('*')
        .eq('email', user.email)
        .single()

      if (shop) {
        localStorage.setItem('shop_id', shop.id)
        alert('登入成功！')
        navigate('/seller/dashboard')
      } else {
        alert('無此店家資料')
      }
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>店家登入</h2>
      <div>
        <label>Email：</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label>密碼：</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <button onClick={handleLogin}>登入</button>
    </div>
  )
}
