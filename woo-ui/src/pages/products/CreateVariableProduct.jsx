import { useState } from "react";
import { createVariableProduct } from "../../services/api";
import ProductInput from "./ProductInput";

export default function CreateVariableProduct({ addLog }) {
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!price || !weight || !length || !width || !height || !count)
      return alert("Fill all fields");

    setLoading(true);
    setError("");

    try {
      const res = await createVariableProduct({
        price: String(price),
        weight: Number(weight),
        length: Number(length),
        width: Number(width),
        height: Number(height),
        count: Number(count),
      });

      const items = res.data.data || [];
      setProducts(items);
      addLog(`🟣 Created ${items.length} variable products`);
    } catch (err) {
      setError("Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-5">Create Variable Product</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <ProductInput placeholder="Price" value={price} setValue={setPrice} />
        <ProductInput
          placeholder="Weight"
          value={weight}
          setValue={setWeight}
        />
        <ProductInput
          placeholder="Length"
          value={length}
          setValue={setLength}
        />
        <ProductInput placeholder="Width" value={width} setValue={setWidth} />
        <ProductInput
          placeholder="Height"
          value={height}
          setValue={setHeight}
        />
        <ProductInput placeholder="Count" value={count} setValue={setCount} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}{" "}
        {loading ? "Creating..." : "Create"}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {products.length > 0 && (
        <div className="mt-6 bg-gray-900 p-4 rounded-xl h-[400px] overflow-y-auto">
          <h3 className="mb-3 text-purple-400 font-semibold">
            Created Variable Products
          </h3>

          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Product #{p.id}</span>
                  <span className="text-purple-400">₹{p.price}</span>
                </div>

                <div className="text-sm text-gray-400 grid grid-cols-2 gap-2">
                  <span>Name: {p.name}</span>
                  <span>Status: {p.status}</span>
                  <span>Type: {p.type}</span>
                  <span>Stock: {p.stock_quantity}</span>
                  <span>Variants: {p.variations?.length || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
