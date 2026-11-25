'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [settings, setSettings] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Upload loading states
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingCta, setUploadingCta] = useState(false);
  const [uploadingProduct, setUploadingProduct] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/site-settings').then((r) => r.json()),
      fetch('/api/products').then((r) => r.json()),
    ]).then(([s, p]) => {
      setSettings(s);
      setProducts(p);
      setLoading(false);
    });
  }, []);

  const upload = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!data.url) {
      alert('Upload failed');
      return null;
    }
    return data.url;
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        alert('Saved successfully!');
      } else {
        alert('Failed to save');
      }
    } catch (err) {
      alert('Error saving');
    }
    setSaving(false);
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.imageUrl) {
      alert('Please fill all product fields');
      return;
    }

    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newProduct.name,
        price: Number(newProduct.price),
        imageUrl: newProduct.imageUrl,
      }),
    });

    setNewProduct({ name: '', price: '', imageUrl: '' });
    const updated = await fetch('/api/products').then((r) => r.json());
    setProducts(updated);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;

    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter((p) => p._id !== id));
  };

  if (loading || !settings) {
    return <div className="p-10 text-center">Loading admin...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 pb-20">
      {/* Sticky Save Button */}
      <div className="flex items-center justify-between sticky top-0 bg-white py-4 z-10 border-b mb-6">
        <h1 className="text-2xl font-bold">Site Admin</h1>
        <button
          onClick={saveSettings}
          disabled={saving}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Business Name + Logo */}
      <section className="bg-white border rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-semibold">Business Info</h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Business Name</label>
          <input
            value={settings.businessName || ''}
            onChange={(e) =>
              setSettings({ ...settings, businessName: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Logo</label>
          {settings.logoUrl && (
            <img
              src={settings.logoUrl}
              alt="Logo"
              className="h-16 w-16 rounded-full object-cover mb-3"
            />
          )}
          <input
            type="file"
            accept="image/*"
            disabled={uploadingLogo}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploadingLogo(true);
              const url = await upload(file, 'logo');
              if (url) {
                setSettings({ ...settings, logoUrl: url });
              }
              setUploadingLogo(false);
            }}
          />
          {uploadingLogo && (
            <p className="text-sm text-blue-600 mt-2">Uploading logo...</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            After uploading, click <strong>Save Changes</strong> at the top
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white border rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-semibold">Hero Section</h2>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={settings.hero?.mediaType === 'image'}
              onChange={() =>
                setSettings({
                  ...settings,
                  hero: { ...settings.hero, mediaType: 'image' },
                })
              }
            />
            Image
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={settings.hero?.mediaType === 'video'}
              onChange={() =>
                setSettings({
                  ...settings,
                  hero: { ...settings.hero, mediaType: 'video' },
                })
              }
            />
            Video
          </label>
        </div>

        {settings.hero?.mediaUrl && (
          <div>
            {settings.hero.mediaType === 'video' ? (
              <video
                src={settings.hero.mediaUrl}
                className="h-48 w-full rounded-lg object-cover"
                controls
              />
            ) : (
              <img
                src={settings.hero.mediaUrl}
                alt="Hero"
                className="h-48 w-full rounded-lg object-cover"
              />
            )}
          </div>
        )}

        <input
          type="file"
          accept={settings.hero?.mediaType === 'video' ? 'video/*' : 'image/*'}
          disabled={uploadingHero}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploadingHero(true);
            const url = await upload(file, 'hero');
            if (url) {
              setSettings({
                ...settings,
                hero: { ...settings.hero, mediaUrl: url },
              });
            }
            setUploadingHero(false);
          }}
        />
        {uploadingHero && (
          <p className="text-sm text-blue-600">Uploading hero media...</p>
        )}

        <div>
          <label className="block text-sm text-gray-600 mb-1">Title</label>
          <input
            value={settings.hero?.title || ''}
            onChange={(e) =>
              setSettings({
                ...settings,
                hero: { ...settings.hero, title: e.target.value },
              })
            }
            className="w-full border rounded-lg px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            value={settings.hero?.description || ''}
            onChange={(e) =>
              setSettings({
                ...settings,
                hero: { ...settings.hero, description: e.target.value },
              })
            }
            className="w-full border rounded-lg px-4 py-2.5 h-28"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">About Section</h2>
        <textarea
          value={settings.aboutText || ''}
          onChange={(e) =>
            setSettings({ ...settings, aboutText: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2.5 h-32"
        />
      </section>

      {/* CTA Image */}
      <section className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">CTA Section Image</h2>
        {settings.ctaImageUrl && (
          <img
            src={settings.ctaImageUrl}
            alt="CTA"
            className="h-48 w-full rounded-lg object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          disabled={uploadingCta}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploadingCta(true);
            const url = await upload(file, 'cta');
            if (url) {
              setSettings({ ...settings, ctaImageUrl: url });
            }
            setUploadingCta(false);
          }}
        />
        {uploadingCta && (
          <p className="text-sm text-blue-600">Uploading CTA image...</p>
        )}
      </section>

      {/* Featured Products */}
      <section className="bg-white border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold">Featured Products</h2>

        <div className="border rounded-xl p-5 bg-gray-50 space-y-4">
          <h3 className="font-medium">Add New Product</h3>

          {newProduct.imageUrl && (
            <img
              src={newProduct.imageUrl}
              alt="Preview"
              className="h-32 rounded-lg object-cover"
            />
          )}

          <input
            type="file"
            accept="image/*"
            disabled={uploadingProduct}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploadingProduct(true);
              const url = await upload(file, 'products');
              if (url) {
                setNewProduct({ ...newProduct, imageUrl: url });
              }
              setUploadingProduct(false);
            }}
          />
          {uploadingProduct && (
            <p className="text-sm text-blue-600">Uploading product image...</p>
          )}

          <input
            placeholder="Product title"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2.5"
          />

          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2.5"
          />

          <button
            onClick={addProduct}
            className="bg-black text-white px-5 py-2.5 rounded-lg text-sm"
          >
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-3">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  ₦{Number(product.price).toLocaleString()}
                </p>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-600 text-xs mt-3"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}