// src/pages/preorder/index.tsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function PreorderPage() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedProductId, setSelectedProductId] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [note, setNote] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('自取')
  const [deliveryDate, setDeliveryDate] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*')
    setProducts(data || [])
  }

  const handleSubmit = async () => {
    const { error } = await supabase.from('customers').upsert(
      {
        name: customerName,
        phone: customerPhone,
      },
      { onConflict: ['phone'] }
    )

    if (error) {
      alert('顧客資料儲存失敗')
      return
    }

    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', customerPhone)
      .single()

    const { error: orderError } = await supabase.from('orders').insert({
      product_id: selectedProductId,
      customer_id: customer?.id,
      note,
      delivery_method: deliveryMethod,
      delivery_date: deliveryDate,
      status: '未確認',
    })

    if (orderError) {
      alert('預購失敗：' + orderError.message)
    } else {
      alert('預購成功！感謝您的訂購')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>商品預購</h1>

      <label>
        選擇商品：
        <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
          <option value="">請選擇商品</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}（${p.price}）
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        顧客姓名：
        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </label>
      <br />

      <label>
        手機號碼：
        <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
      </label>
      <br />

      <label>
        備註需求：
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <br />

      <label>
        希望取貨方式：
        <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
          <option value="自取">自取</option>
          <option value="宅配">宅配</option>
        </select>
      </label>
      <br />

      <label>
        希望取貨日期：
        <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
      </label>
      <br />

      <button onClick={handleSubmit}>送出預購</button>
    </div>
  )
}
