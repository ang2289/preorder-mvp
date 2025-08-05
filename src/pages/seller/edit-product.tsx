// src/pages/seller/edit-product.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabaseClient'

export default function EditProductPage() {
  const router = useRouter()
  const { id } = router.query

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
    if (error) {
      alert('讀取失敗：' + error.message)
    } else if (data) {
      setName(data.name)
      setDescription(data.description)
      setPrice(data.price.toString())
      setStock(data.stock.toString())
    }
  }

  const handleUpdate = async () => {
    const { error } = await supabase.from('products').update({
      name,
      description,
      price: parseInt(price),
      stock: parseInt(stock),
    }).eq('id', id)

    if (error) {
      alert('更新失敗：' + error.message)
    } else {
      alert('更新成功！')
      router.push('/seller/products')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>編輯商品</h1>
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
      <button onClick={handleUpdate}>更新</button>
    </div>
  )
}
