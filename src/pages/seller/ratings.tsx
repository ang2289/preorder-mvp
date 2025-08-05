// src/pages/seller/ratings.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const RatingsPage = () => {
  const [ratings, setRatings] = useState<any[]>([])

  useEffect(() => {
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    const { data } = await supabase
      .from('ratings')
      .select('*')
      .order('created_at', { ascending: false })
    setRatings(data || [])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>顧客評價牆</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>顧客名稱</th>
            <th>商品</th>
            <th>星等</th>
            <th>留言</th>
            <th>建立時間</th>
          </tr>
        </thead>
        <tbody>
          {ratings.length > 0 ? (
            ratings.map((r, i) => (
              <tr key={i}>
                <td>{r.customer_name || '-'}</td>
                <td>{r.product_name || '-'}</td>
                <td>{r.stars || '-'}</td>
                <td>{r.message}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>尚無評價資料</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RatingsPage
