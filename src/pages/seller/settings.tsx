// src/pages/seller/settings.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function SellerSettings() {
  const [shop, setShop] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const shopId = typeof window !== 'undefined' ? localStorage.getItem('shop_id') : null

  const fetchShop = async () => {
    if (!shopId) return
    const { data } = await supabase.from('shops').select('*').eq('id', shopId).single()
    setShop(data)
  }

  const updateShop = async () => {
    if (!shopId) return
    setLoading(true)
    const { error } = await supabase
      .from('shops')
      .update(shop)
      .eq('id', shopId)
    if (error) {
      setMessage('更新失敗')
    } else {
      setMessage('更新成功')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchShop()
  }, [])

  if (!shop) return <p>載入中...</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>商店設定</h1>
      <label>商店名稱：<input value={shop.name || ''} onChange={(e) => setShop({ ...shop, name: e.target.value })} /></label><br />
      <label>Email：<input value={shop.email || ''} onChange={(e) => setShop({ ...shop, email: e.target.value })} /></label><br />
      <label>手機號碼：<input value={shop.phone || ''} onChange={(e) => setShop({ ...shop, phone: e.target.value })} /></label><br />
      <label>備註：<input value={shop.note || ''} onChange={(e) => setShop({ ...shop, note: e.target.value })} /></label><br />
      <label>
        是否需要手動確認付款：
        <input
          type="checkbox"
          checked={shop.require_manual_confirmation}
          onChange={(e) => setShop({ ...shop, require_manual_confirmation: e.target.checked })}
        />
      </label><br /><br />
      <button onClick={updateShop} disabled={loading}>儲存</button>
      {message && <p>{message}</p>}
    </div>
  )
}
