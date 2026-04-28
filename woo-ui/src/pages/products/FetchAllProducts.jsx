import { useState } from "react";
import { fetchAllProducts } from "../../services/api";

export default function FetchAllProducts({ addLog }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 50;

  const paginated = products.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(products.length / perPage);

  const handleFetch = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetchAllProducts();
      const items = res.data.data || [];

      setProducts(items);
      setPage(1);
      addLog(`📦 Fetched ${items.length} products`);
    } catch (err) {
      setError("Failed to fetch products ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-5">Fetch All Products</h2>

      <button
        onClick={handleFetch}
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        <span>{loading ? "Fetching..." : "Fetch All"}</span>
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {products.length > 0 && (
        <div className="mt-6 bg-gray-900 p-4 rounded-xl flex-1 overflow-y-auto min-h-0">
          <h3 className="mb-3 text-green-400 font-semibold">
            All Products ({products.length})
          </h3>

          <p className="text-sm text-gray-400 mb-2">
            Showing {(page - 1) * perPage + 1}–
            {Math.min(page * perPage, products.length)} of {products.length}
          </p>

          <div className="space-y-3">
            {paginated.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">#{p.id}</span>
                  <span className="text-green-400">₹{p.price}</span>
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

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() =>
                setPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
