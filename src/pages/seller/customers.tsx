// src/pages/seller/customers.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const CustomersPage = () => {
  const [customers, setCustomers] = useState<any[]>([])
  const shopId = typeof window !== 'undefined' ? localStorage.getItem('shop_id') : null

  const fetchCustomers = async () => {
    if (!shopId) return
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('shop_id', shopId)
      .order('created_at', { ascending: false })
    setCustomers(data || [])
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>顧客資料</h1>
      {customers.length === 0 && <p>尚無顧客資料</p>}
      {customers.length > 0 && (
        <table border={1} cellPadding={8} style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>姓名</th>
              <th>Email</th>
              <th>手機</th>
              <th>備註</th>
              <th>建立時間</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.note}</td>
                <td>{new Date(c.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CustomersPage
