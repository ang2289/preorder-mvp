// src/pages/seller/orders.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const navigate = useNavigate()

  const shopId = localStorage.getItem('shop_id')

  const fetchOrders = async () => {
    if (!shopId) return

    let query = supabase
      .from('orders')
      .select('*, customer:customers(name, phone)')
      .eq('shop_id', shopId)

    if (filterStatus !== 'all') {
      query = query.eq('status', filterStatus)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) {
      console.error('載入失敗', error)
    } else {
      setOrders(data)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [filterStatus])

  return (
    <div style={{ padding: 20 }}>
      <h1>訂單管理</h1>

      <div style={{ marginBottom: 10 }}>
        <label>篩選狀態：</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">全部</option>
          <option value="pending">待確認</option>
          <option value="confirmed">已確認</option>
          <option value="shipped">已出貨</option>
          <option value="cancelled">已取消</option>
        </select>
      </div>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>顧客</th>
            <th>金額</th>
            <th>狀態</th>
            <th>建立時間</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan={5}>無訂單</td></tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer?.name} / {o.customer?.phone}</td>
                <td>${o.total_price}</td>
                <td>{o.status}</td>
                <td>{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button onClick={() => navigate('/')}>回首頁</button>
    </div>
  )
}
