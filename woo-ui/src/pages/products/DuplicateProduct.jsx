import { useState } from "react";
import { duplicateProducts } from "../../services/api";

export default function DuplicateProduct({ addLog }) {
  const [productId, setProductId] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!productId || !count) return alert("Fill all fields");

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await duplicateProducts({
        productId: Number(productId),
        numOfProducts: Number(count),
      });

      const items = res.data.data || [];
      setProducts(items);
      addLog(`🧬 Duplicated ${items.length} products from ID ${productId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to duplicate ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-5">Duplicate Product</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="input"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          className="input"
          placeholder="Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        {loading ? "Duplicating..." : "Duplicate"}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {products.length > 0 && (
        <div className="mt-6 bg-gray-900 p-4 rounded-xl h-[400px] overflow-y-auto">
          <h3 className="mb-3 text-yellow-400 font-semibold">
            Duplicated Products
          </h3>

          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">#{p.id}</span>
                  <span className="text-yellow-400">₹{p.price}</span>
                </div>

                <div className="text-sm text-gray-400 grid grid-cols-2 gap-2">
                  <span>Name: {p.name}</span>
                  <span>Status: {p.status}</span>
                  <span>Type: {p.type}</span>
                  <span>Stock: {p.stock_quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
