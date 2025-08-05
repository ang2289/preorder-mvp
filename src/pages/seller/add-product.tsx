// src/pages/seller/add-product.tsx
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const router = useRouter()

  const store_id = typeof window !== 'undefined' ? localStorage.getItem('store_id') : null

  const handleAdd = async () => {
    if (!store_id) {
      alert('找不到商店 ID，請先登入')
      return
    }

    const { error } = await supabase.from('products').insert({
      shop_id: store_id,
      name,
      description,
      price: parseInt(price),
      stock: parseInt(stock),
    })

    if (error) {
      alert('新增失敗：' + error.message)
    } else {
      alert('新增成功！')
      router.push('/seller/products')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>新增商品</h1>
      <label>
        商品名稱：
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        商品描述：
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        商品單價：
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br />
      <label>
        商品庫存：
        <input value={stock} onChange={(e) => setStock(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAdd}>新增</button>
    </div>
  )
}
