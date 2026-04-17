import { useState } from "react";
import { createSimpleProduct } from "../services/api";
import { createVariableProduct } from "../services/api";

export function CreateSimpleProduct() {
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [count, setNumOfOrders] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdProducts, setCreatedProducts] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await createSimpleProduct({
        price: String(price),
        weight: Number(weight),
        length: Number(length),
        width: Number(width),
        height: Number(height),
        count: Number(count),
      });

      setCreatedProducts(response.data.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      alert("Product Creation Failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <p></p>
      <h2>Create Simple Product</h2>
      <input
        placeholder="Enter the price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        placeholder="Enter the weight"
        value={weight}
        onChange={(e) => {
          setWeight(e.target.value);
        }}
      />
      <input
        placeholder="Enter the length"
        value={length}
        onChange={(e) => {
          setLength(e.target.value);
        }}
      />{" "}
      <input
        placeholder="Enter the width"
        value={width}
        onChange={(e) => {
          setWidth(e.target.value);
        }}
      />{" "}
      <input
        placeholder="Enter the height"
        value={height}
        onChange={(e) => {
          setHeight(e.target.value);
        }}
      />
      <input
        placeholder="Enter the number of products you want to create?"
        value={count}
        onChange={(e) => {
          setNumOfOrders(e.target.value);
        }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating Products" : "Create"}
      </button>
      {createdProducts.length > 0 && (
        <div>
          <h3>Created Products:</h3>
          <ul>
            {createdProducts.map((createdProducts) => (
              <li key={createdProducts.id}>
                Product ID: {createdProducts.id} | Status:{" "}
                {createdProducts.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function CreateVariableProduct() {
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [count, setNumOfOrders] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdProducts, setCreatedProducts] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await createVariableProduct({
        price: String(price),
        weight: Number(weight),
        length: Number(length),
        width: Number(width),
        height: Number(height),
        count: Number(count),
      });
      console.log(response.data);
      setCreatedProducts(response.data.data);
    } catch (err) {
      console.log(err);
      alert("Product Creation Failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <p></p>
      <h2>Create Variable Product</h2>
      <input
        placeholder="Enter the price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        placeholder="Enter the weight"
        value={weight}
        onChange={(e) => {
          setWeight(e.target.value);
        }}
      />
      <input
        placeholder="Enter the length"
        value={length}
        onChange={(e) => {
          setLength(e.target.value);
        }}
      />{" "}
      <input
        placeholder="Enter the width"
        value={width}
        onChange={(e) => {
          setWidth(e.target.value);
        }}
      />{" "}
      <input
        placeholder="Enter the height"
        value={height}
        onChange={(e) => {
          setHeight(e.target.value);
        }}
      />
      <input
        placeholder="Enter the number of products you want to create?"
        value={count}
        onChange={(e) => {
          setNumOfOrders(e.target.value);
        }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating Products" : "Create"}
      </button>
      {createdProducts.length > 0 && (
        <div>
          <h3>Created Variable Products:</h3>
          <ul>
            {createdProducts.map((createdProducts) => (
              <li key={createdProducts.id}>
                Product ID: {createdProducts.id} | Name: {createdProducts.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
