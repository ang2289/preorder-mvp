// src/pages/seller/products.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

export default function SellerProductList() {
  const [products, setProducts] = useState<any[]>([])
  const navigate = useNavigate()
  const shopId = localStorage.getItem('shop_id')

  const fetchProducts = async () => {
    if (!shopId) return
    const { data } = await supabase.from('products').select('*').eq('shop_id', shopId)
    setProducts(data || [])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const deleteProduct = async (id: string) => {
    const confirmed = confirm('確定要刪除此商品？')
    if (!confirmed) return

    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      alert('刪除失敗')
      console.error(error)
    } else {
      alert('刪除成功')
      fetchProducts()
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>商品列表</h2>
      <button onClick={() => navigate('/seller/add-product')}>新增商品</button>
      <table border={1} cellPadding={8} style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>價格</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => navigate(`/seller/edit-product?id=${p.id}`)}>編輯</button>
                <button onClick={() => deleteProduct(p.id)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
