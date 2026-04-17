import { useState } from "react";
import { createOrder } from "../services/api";

export default function CreateOrder() {
  const [product, setProduct] = useState("");
  const [qty, setQuantity] = useState("");
  const [count, setNumOfOrders] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await createOrder({
        product: Number(product),
        qty: Number(qty),
        count: Number(count),
      });
      console.log(res.data);
      alert("Orders Got created... ✅");
    } catch (err) {
      console.log(err);
      alert("Order creation Failed... ❌");
    }

    setLoading(false);
  };
  return (
    <div>
      <h2>Create an Order</h2>

      <input
        placeholder="Product Id"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <input
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        placeholder="Number of Orders "
        value={count}
        onChange={(e) => setNumOfOrders(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating Orders.." : "Create Order"}
      </button>
    </div>
  );
}
