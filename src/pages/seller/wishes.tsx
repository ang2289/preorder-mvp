// src/pages/seller/wishes.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const WishesPage = () => {
  const [wishes, setWishes] = useState<any[]>([])

  useEffect(() => {
    fetchWishes()
  }, [])

  const fetchWishes = async () => {
    const { data } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
    setWishes(data || [])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>願望牆（顧客許願）</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>顧客名稱</th>
            <th>願望內容</th>
            <th>分類</th>
            <th>時間</th>
          </tr>
        </thead>
        <tbody>
          {wishes.length > 0 ? (
            wishes.map((w, i) => (
              <tr key={i}>
                <td>{w.customer_name || '-'}</td>
                <td>{w.content}</td>
                <td>{w.category || '未分類'}</td>
                <td>{new Date(w.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>尚無願望資料</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default WishesPage
