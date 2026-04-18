import { useState } from "react";
import CreateOrder from "./pages/CreateOrder";
import {
  CreateSimpleProduct,
  CreateVariableProduct,
  RetrieveProduct,
} from "./pages/CreateProduct";

function App() {
  const [active, setActive] = useState("orders");

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* SIDEBAR */}
      <div className="w-72 bg-gray-800 p-6 flex flex-col justify-between">
        {/* TOP */}
        <div>
          <h1 className="text-xl font-bold mb-8">WooCommerce Actions</h1>

          <div className="space-y-4">
            <button
              onClick={() => setActive("orders")}
              className={`block w-full text-left px-3 py-2 rounded ${
                active === "orders" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Create Orders
            </button>

            <button
              onClick={() => setActive("simple")}
              className={`block w-full text-left px-3 py-2 rounded ${
                active === "simple" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Create Simple Products
            </button>

            {/* ✅ FIXED */}
            <button
              onClick={() => setActive("variable")}
              className={`block w-full text-left px-3 py-2 rounded ${
                active === "variable" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Create Variable Products
            </button>

            {/* ✅ FIXED */}
            <button
              onClick={() => setActive("fetchProduct")}
              className={`block w-full text-left px-3 py-2 rounded ${
                active === "fetchProduct" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Fetch Product Details
            </button>
          </div>
        </div>

        {/* BOTTOM (VERSION) */}
        <div className="text-sm text-gray-400 border-t border-gray-700 pt-4">
          <p>Version 3.0.2</p>
          <p className="text-gray-500">by Inder</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          {active === "orders" && <CreateOrder />}
          {active === "simple" && <CreateSimpleProduct />}
          {active === "variable" && <CreateVariableProduct />}
          {active === "fetchProduct" && <RetrieveProduct />}
        </div>
      </div>
    </div>
  );
}

export default App;
