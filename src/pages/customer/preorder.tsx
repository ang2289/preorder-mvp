// src/pages/customer/preorder.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function CustomerPreorderForm() {
  const [products, setProducts] = useState<any[]>([])
  const [form, setForm] = useState({
    name: '',
    phone: '',
    note: '',
    delivery_date: '',
    product_id: '',
    quantity: 1,
  })
  const navigate = useNavigate()

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*')
    setProducts(data || [])
  }

  const handleSubmit = async () => {
    const { name, phone, product_id, quantity, delivery_date } = form

    if (!name || !phone || !product_id || !delivery_date) {
      alert('請填寫完整資訊')
      return
    }

    // 檢查顧客是否已存在
    let { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', phone)
      .single()

    if (!customer) {
      const { data: newCustomer } = await supabase
        .from('customers')
        .insert([{ name, phone, note: form.note }])
        .select()
        .single()
      customer = newCustomer
    }

    // 取得商品價格
    const selectedProduct = products.find((p) => p.id === form.product_id)
    const total_price = selectedProduct ? selectedProduct.price * form.quantity : 0

    // 建立訂單
    const { error } = await supabase.from('orders').insert([{
      customer_id: customer.id,
      product_id: form.product_id,
      quantity: form.quantity,
      delivery_date: form.delivery_date,
      note: form.note,
      total_price,
      shop_id: selectedProduct.shop_id,
      status: 'pending',
    }])

    if (error) {
      alert('建立失敗')
      console.error(error)
    } else {
      alert('預購成功！')
      navigate('/')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h2>商品預購表單</h2>

      <div>
        <label>姓名：</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label>手機：</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div>
        <label>備註：</label>
        <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
      </div>
      <div>
        <label>預購商品：</label>
        <select
          value={form.product_id}
          onChange={(e) => setForm({ ...form, product_id: e.target.value })}
        >
          <option value="">請選擇商品</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}（${p.price}）</option>
          ))}
        </select>
      </div>
      <div>
        <label>數量：</label>
        <input
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
          min={1}
        />
      </div>
      <div>
        <label>希望送達日期：</label>
        <input
          type="date"
          value={form.delivery_date}
          onChange={(e) => setForm({ ...form, delivery_date: e.target.value })}
        />
      </div>

      <button onClick={handleSubmit}>送出預購</button>
    </div>
  )
}
