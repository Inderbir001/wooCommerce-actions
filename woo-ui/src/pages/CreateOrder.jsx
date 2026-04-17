import { useState } from "react";
import { createOrder } from "../services/api";

export default function CreateOrder() {
  const [product, setProduct] = useState("");
  const [qty, setQuantity] = useState("");
  const [count, setNumOfOrders] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdOrders, setCreatedOrders] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await createOrder({
        product: Number(product),
        qty: Number(qty),
        count: Number(count),
      });
      console.log(res.data);
      setCreatedOrders(res.data.data);
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

      {createdOrders.length > 0 && (
        <div>
          <h3>Created Orders</h3>
          <ul>
            {createdOrders.map((createdOrders) => (
              <li key={createdOrders.id}>
                {" "}
                Order Id : {createdOrders.id} | Status :
                {createdOrders.status}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
