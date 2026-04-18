import { useState } from "react";
import { createOrder } from "../services/api";

export default function CreateOrder({ addLog }) {
  const [product, setProduct] = useState("");
  const [qty, setQuantity] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdOrders, setCreatedOrders] = useState([]);

  const handleSubmit = async () => {
    if (!product || !qty || !count) return alert("Fill all fields");

    setLoading(true);

    try {
      const res = await createOrder({
        product: Number(product),
        qty: Number(qty),
        count: Number(count),
      });

      setCreatedOrders(res.data.data || []);
      addLog(`Created ${res.data.data.length} orders`);
    } catch (err) {
      console.error(err);
      alert("Order creation failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-5">Create Orders</h2>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          className="input"
          placeholder="Product ID"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <input
          className="input"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          className="input"
          placeholder="No. of Orders"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        <span>{loading ? "Creating..." : "Create Orders"}</span>
      </button>

      {/* RESULTS */}
      {createdOrders.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Created Orders</h3>

          <div className="space-y-2">
            {createdOrders.map((order) => (
              <div key={order.id} className="card-row">
                <span>Order #{order.id}</span>
                <span className="text-green-400">{order.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
