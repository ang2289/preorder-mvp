// src/pages/seller/add.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'

const AddProductPage = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // 假設 seller_id 是固定測試用帳號
  const sellerId = '00000000-0000-0000-0000-000000000000' // 可改成登入後的 seller.id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('products').insert([
      {
        seller_id: sellerId,
        name,
        description,
        price: parseFloat(price),
        image_url: imageUrl
      }
    ])

    setLoading(false)

    if (error) {
      alert('新增失敗：' + error.message)
    } else {
      alert('商品已新增成功')
      navigate('/seller')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>新增商品</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>商品名稱：</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>商品描述：</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>價格：</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>圖片連結：</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '新增中…' : '送出'}
        </button>
      </form>
    </div>
  )
}

export default AddProductPage