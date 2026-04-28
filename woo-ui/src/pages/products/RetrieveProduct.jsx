import { useState } from "react";
import { retrieveProduct } from "../../services/api";

export default function RetrieveProduct({ addLog }) {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!productId) {
      setError("Enter Product ID");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await retrieveProduct({
        productId: Number(productId),
      });

      const data = result?.data?.data;
      setProduct(data);
      addLog(`Retrieved product ID ${productId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-5">Retrieve Product Data</h2>

      <div className="mb-4 flex flex-col gap-3">
        <input
          className="input w-full"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          <span>{loading ? "Fetching..." : "Fetch"}</span>
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {product && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">{product.name}</span>
              <span className="text-green-400">₹{product.price}</span>
            </div>

            <div className="text-sm text-gray-400 grid grid-cols-2 gap-2">
              <span>ID: {product.id}</span>
              <span>Status: {product.status}</span>
              <span>Type: {product.type}</span>
              <span>Stock: {product.stock_quantity}</span>
            </div>
          </div>

          <div className="bg-black p-4 rounded-xl max-h-[300px] overflow-y-auto">
            <pre className="text-green-400 text-xs">
              {JSON.stringify(product, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
