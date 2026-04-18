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

export function CreateSimpleProduct() {
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

      setProducts(res.data.data || []);
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

      <button onClick={handleSubmit} className="btn-primary w-full">
        {loading ? "Creating..." : "Create"}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* 🔥 SCROLLABLE RESULTS */}
      {products.length > 0 && (
        <div className="mt-6 bg-gray-900 p-4 rounded-xl h-[400px] overflow-y-auto">
          <h3 className="mb-3 text-blue-400 font-semibold">Created Products</h3>

          {products.map((p) => (
            <div key={p.id} className="card-row">
              <span>#{p.id}</span>
              <span>{p.name}</span>
              <span className="text-green-400">₹{p.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RetrieveProduct() {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!productId) return alert("Enter Product ID");

    setLoading(true);
    setError("");

    try {
      const result = await retrieveProduct({
        productId: Number(productId),
      });

      setProduct(result.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-5">Retrieve Product Data</h2>

      {/* INPUT */}
      <div className="flex gap-3 mb-4">
        <input
          className="input flex-1"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary px-6"
        >
          {loading ? "Fetching..." : "Fetch"}
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* CONTENT AREA */}
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
          {/* 🔹 LEFT: SUMMARY */}
          <div className="bg-gray-900 p-4 rounded-xl space-y-2">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Product Summary
            </h3>

            <p>
              <b>ID:</b> {product.id}
            </p>
            <p>
              <b>Name:</b> {product.name}
            </p>
            <p>
              <b>Price:</b> ₹{product.price}
            </p>
            <p>
              <b>Stock:</b> {product.stock_quantity}
            </p>
            <p>
              <b>Status:</b> {product.status}
            </p>
            <p>
              <b>Type:</b> {product.type}
            </p>
          </div>

          {/* 🔹 RIGHT: SCROLLABLE JSON */}
          <div className="bg-black p-4 rounded-xl h-[500px] overflow-y-auto">
            <h3 className="text-green-400 mb-3 font-semibold">
              Full API Response
            </h3>

            <pre className="text-green-300 text-xs whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(product, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= VARIABLE PRODUCT ================= */

export function CreateVariableProduct() {
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

      setProducts(res.data.data || []);
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

      <button onClick={handleSubmit} className="btn-primary w-full">
        {loading ? "Creating..." : "Create"}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* 🔥 SCROLLABLE */}
      {products.length > 0 && (
        <div className="mt-6 bg-gray-900 p-4 rounded-xl h-[400px] overflow-y-auto">
          <h3 className="mb-3 text-purple-400 font-semibold">
            Created Variable Products
          </h3>

          {products.map((p) => (
            <div key={p.id} className="card-row">
              <span>#{p.id}</span>
              <span>{p.name}</span>
              <span className="text-green-400">₹{p.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
