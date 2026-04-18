import { useState } from "react";
import {
  createSimpleProduct,
  createVariableProduct,
  retrieveProduct,
} from "../services/api";

/* REUSABLE INPUT */
function Input({ placeholder, value, setValue }) {
  return (
    <input
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

/* ================= SIMPLE PRODUCT ================= */

export function CreateSimpleProduct({ addLog }) {
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
      const res = await createSimpleProduct({
        price: String(price),
        weight: Number(weight),
        length: Number(length),
        width: Number(width),
        height: Number(height),
        count: Number(count),
      });

      const items = res.data.data || [];
      setProducts(items);
      addLog(`✅ Created ${items.length} simple products`);
    } catch (err) {
      setError("Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-5">Create Simple Product</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <Input placeholder="Price" value={price} setValue={setPrice} />
        <Input placeholder="Weight" value={weight} setValue={setWeight} />
        <Input placeholder="Length" value={length} setValue={setLength} />
        <Input placeholder="Width" value={width} setValue={setWidth} />
        <Input placeholder="Height" value={height} setValue={setHeight} />
        <Input placeholder="Count" value={count} setValue={setCount} />
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
          <h3 className="mb-3 text-blue-400 font-semibold">Created Products</h3>

          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Product #{p.id}</span>
                  <span className="text-green-400">₹{p.price}</span>
                </div>

                <div className="text-sm text-gray-400 grid grid-cols-2 gap-2">
                  <span>Name: {p.name}</span>
                  <span>Status: {p.status}</span>
                  <span>Type: {p.type}</span>
                  <span>Stock: {p.stock_quantity}</span>
                  <span>SKU: {p.sku || "N/A"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= RETRIEVE PRODUCT ================= */

export function RetrieveProduct({ addLog }) {
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

      {/* INPUT + BUTTON (FIXED) */}
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

      {/* ERROR */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* RESULT */}
      {product && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          {/* SUMMARY */}
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

          {/* JSON */}
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

/* ================= VARIABLE PRODUCT ================= */

export function CreateVariableProduct({ addLog }) {
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
        <Input placeholder="Price" value={price} setValue={setPrice} />
        <Input placeholder="Weight" value={weight} setValue={setWeight} />
        <Input placeholder="Length" value={length} setValue={setLength} />
        <Input placeholder="Width" value={width} setValue={setWidth} />
        <Input placeholder="Height" value={height} setValue={setHeight} />
        <Input placeholder="Count" value={count} setValue={setCount} />
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
