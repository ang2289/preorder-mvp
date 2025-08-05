// src/pages/seller/dashboard.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function SellerDashboard() {
  const [shop, setShop] = useState<any>(null)
  const navigate = useNavigate()

  const shopId = typeof window !== 'undefined' ? localStorage.getItem('shop_id') : null

  useEffect(() => {
    if (!shopId) {
      alert('請先登入')
      navigate('/seller/login')
    } else {
      fetchShop(shopId)
    }
  }, [shopId])

  const fetchShop = async (id: string) => {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      console.error(error)
      alert('取得店家資料失敗')
    } else {
      setShop(data)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>商家後台</h2>
      {shop && (
        <div>
          <p>商店名稱：{shop.name}</p>
          <p>Email：{shop.email}</p>
          <p>手機：{shop.phone || '未提供'}</p>
          <p>備註：{shop.note || '無'}</p>
        </div>
      )}
      <hr />
      <button onClick={() => navigate('/seller/products')}>商品管理</button>
      <button onClick={() => navigate('/seller/orders')}>訂單管理</button>
      <button onClick={() => navigate('/seller/customers')}>顧客管理</button>
    </div>
  )
}
