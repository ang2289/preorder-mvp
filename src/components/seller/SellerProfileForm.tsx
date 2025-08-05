import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const SellerProfileForm = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [category, setCategory] = useState('');

  const handleUploadLogo = async () => {
    if (!logoFile) {
      alert('請選擇圖片檔案');
      return;
    }

    const fileName = `seller_${Date.now()}_${logoFile.name}`;
    const { data, error } = await supabase.storage
      .from('logos')
      .upload(`seller_logos/${fileName}`, logoFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      alert('上傳失敗：' + error.message);
    } else {
      const publicUrl = supabase.storage.from('logos').getPublicUrl(data.path).data.publicUrl;
      setLogoUrl(publicUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = '目前登入的使用者ID'; // TODO: 換成實際登入者的 user id

    const { error } = await supabase
      .from('sellers')
      .update({ logo_url: logoUrl, category })
      .eq('user_id', userId);

    if (error) {
      alert('更新失敗：' + error.message);
    } else {
      alert('商家資料已更新');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">商家 Logo 上傳</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
          className="file-input file-input-bordered w-full"
        />
        <button
          type="button"
          className="btn btn-sm mt-2"
          onClick={handleUploadLogo}
        >
          上傳圖片
        </button>
        {logoUrl && (
          <div className="mt-2">
            <img src={logoUrl} alt="Logo 預覽" className="h-24" />
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium">商家類別</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">請選擇</option>
          <option value="甜點">甜點</option>
          <option value="早餐">早餐</option>
          <option value="飲料">飲料</option>
          <option value="便當">便當</option>
          <option value="其他">其他</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        儲存商家設定
      </button>
    </form>
  );
};

export default SellerProfileForm;
