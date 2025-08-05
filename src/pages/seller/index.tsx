import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

const SellerHome = () => {
  const [shop, setShop] = useState<any>(null)
  const [productsCount, setProductsCount] = useState<number>(0)
  const [ordersCount, setOrdersCount] = useState<number>(0)
  const navigate = useNavigate()

  const shopId = typeof window !== 'undefined' ? localStorage.getItem('shop_id') : null

  const fetchData = async () => {
    if (!shopId) return

    const { data: shopData } = await supabase.from('shops').select('*').eq('id', shopId).single()
    const { count: products } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('shop_id', shopId)
    const { count: orders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('shop_id', shopId)

    setShop(shopData)
    setProductsCount(products || 0)
    setOrdersCount(orders || 0)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>商家後台首頁</h1>
      {shop ? (
        <div>
          <h2>{shop.name}</h2>
          <p>📱 手機：{shop.phone || '尚未設定'}</p>
          <p>📧 Email：{shop.email || '尚未設定'}</p>
          <p>📝 備註：{shop.note || '無'}</p>
        </div>
      ) : (
        <p>未登入商家</p>
      )}

      <hr />

      <div>
        <h3>📦 商品數量：{productsCount}</h3>
        <button onClick={() => navigate('/seller/products')}>商品管理</button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <h3>📋 訂單數量：{ordersCount}</h3>
        <button onClick={() => navigate('/seller/orders')}>訂單管理</button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <button onClick={() => navigate('/seller/add')}>➕ 新增商品</button>
        <button onClick={() => navigate('/seller/settings')} style={{ marginLeft: '10px' }}>
          ⚙️ 商家設定
        </button>
      </div>
    </div>
  )
}

export default SellerHome
