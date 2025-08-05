# 專案名稱
通用預購平台（Generic Preorder Platform）

# 技術堆疊
- 前端：React + TypeScript
- 樣式：Tailwind CSS
- 後端：Supabase（資料庫 + 驗證 + 儲存）
- 路由：React Router DOM v6

# 資料表主架構（Supabase）
## shops（商家）
- id（手動輸入，不能重複）
- name（商家名稱）
- email
- phone
- description（商家簡介）
- address（地址）
- is_verified（boolean，是否經濟部核可）
- is_trial（boolean，是否使用過14天試用）
- trial_start_date（日期）
- subscription_status（enum: trial, active, expired）
- created_at（timestamp）
- password（哈希後儲存）

## customers（顧客）
...

## orders（訂單）
- 加上：price（單價）、delivery_date（希望到貨日）、payment_method（匯款、自取、貨到付款）

## payments（匯款記錄）
...

# 路由結構
- /              → 首頁（有商家註冊與登入按鈕）
- /register      → 商家註冊頁
- /login         → 商家登入頁
- /seller        → 商家後台首頁
- /seller/add    → 商家新增商品
- /seller/orders → 訂單管理頁

# 命名風格
- 檔案：小駝峰命名（addProductPage.tsx）
- 元件：大駝峰命名（AddProductPage）
- 函式／變數：小駝峰命名（handleRegister）

# UI 規範
- Tailwind 為主，間距要適中（避免太擠）
- 手機版為優先（mobile-first）
- 表單每個欄位上下至少 `mb-4` 間距
