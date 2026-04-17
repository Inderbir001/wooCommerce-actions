import { useState } from "react";
import { createSimpleProduct, createVariableProduct } from "../services/api";

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
  const [createdProducts, setCreatedProducts] = useState([]);

  const handleSubmit = async () => {
    if (!price || !weight || !length || !width || !height || !count)
      return alert("Fill all fields");

    setLoading(true);

    try {
      const res = await createSimpleProduct({
        price: String(price),
        weight: Number(weight),
        length: Number(length),
        width: Number(width),
        height: Number(height),
        count: Number(count),
      });

      setCreatedProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Simple product creation failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
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
        className="btn-primary w-full"
      >
        {loading ? "Creating..." : "Create Products"}
      </button>

      {createdProducts.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold">Created Products</h3>

          {createdProducts.map((p) => (
            <div key={p.id} className="card-row">
              <span>#{p.id}</span>
              <span className="text-blue-400">{p.name}</span>
            </div>
          ))}
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
  const [createdProducts, setCreatedProducts] = useState([]);

  const handleSubmit = async () => {
    if (!price || !weight || !length || !width || !height || !count)
      return alert("Fill all fields");

    setLoading(true);

    try {
      const res = await createVariableProduct({
        price: String(price),
        weight: Number(weight),
        length: Number(length),
        width: Number(width),
        height: Number(height),
        count: Number(count),
      });

      setCreatedProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Variable product creation failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
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
        className="btn-primary w-full"
      >
        {loading ? "Creating..." : "Create Variable Products"}
      </button>

      {createdProducts.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold">Created Variable Products</h3>

          {createdProducts.map((p) => (
            <div key={p.id} className="card-row">
              <span>#{p.id}</span>
              <span className="text-purple-400">{p.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
