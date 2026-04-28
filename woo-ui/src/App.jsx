import { useState } from "react";
import CreateOrder from "./pages/orders/CreateOrder";
import UpdateOrder from "./pages/orders/updateOrder";
import {
  CreateSimpleProduct,
  CreateVariableProduct,
  RetrieveProduct,
  FetchAllProducts,
  DuplicateProduct,
} from "./pages/products/CreateProduct";

export default function App() {
  const [section, setSection] = useState("orders");
  const [active, setActive] = useState("orders");
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs((prev) => [{ id: Date.now(), message: msg }, ...prev.slice(0, 20)]);
  };

  const handleSectionChange = (sec) => {
    setSection(sec);

    if (sec === "orders") setActive("orders");
    if (sec === "products") setActive("simple");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* SIDEBAR */}
      <div className="w-72 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-8">WooCommerce Actions</h1>

          <div className="space-y-3">
            {/* ORDERS */}
            <div>
              <button
                onClick={() => handleSectionChange("orders")}
                className={`block w-full text-left px-3 py-2 rounded ${
                  section === "orders" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Orders
              </button>

              {section === "orders" && (
                <div className="ml-4 mt-2 space-y-2 text-sm">
                  <button
                    onClick={() => setActive("orders")}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      active === "orders" ? "bg-gray-700" : "hover:bg-gray-700"
                    }`}
                  >
                    Create Order
                  </button>

                  <button
                    onClick={() => setActive("updateOrder")}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      active === "updateOrder"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    Update Order
                  </button>
                </div>
              )}
            </div>

            {/* PRODUCTS */}
            <div>
              <button
                onClick={() => handleSectionChange("products")}
                className={`block w-full text-left px-3 py-2 rounded ${
                  section === "products" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Products {section === "products" ? "" : ""}
              </button>

              {/* SUB MENU */}
              {section === "products" && (
                <div className="ml-4 mt-2 space-y-2 text-sm">
                  <button
                    onClick={() => setActive("simple")}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      active === "simple" ? "bg-gray-700" : "hover:bg-gray-700"
                    }`}
                  >
                    Create Simple
                  </button>

                  <button
                    onClick={() => setActive("variable")}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      active === "variable"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    Create Variable
                  </button>

                  <button
                    onClick={() => setActive("fetchProduct")}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      active === "fetchProduct"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    Fetch Single
                  </button>

                  <button
                    onClick={() => setActive("fetchAll")}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      active === "fetchAll"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    Fetch All
                  </button>

                  <button
                    onClick={() => setActive("duplicate")}
                    className={`block w-full text-left px-3 py-1 rounded ${
                      active === "duplicate"
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    Duplicate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-sm text-gray-400 border-t border-gray-700 pt-4">
          <p>version {__APP_VERSION__}</p>
          <p className="text-gray-500">by Inderbir Singh</p>

          <a
            href="https://github.com/Inderbir001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white"
          >
            https://github.com/Inderbir001
          </a>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold capitalize">{section} Dashboard</h1>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 overflow-hidden">
          {/* MAIN PANEL */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              {section === "orders" && active === "orders" && (
                <CreateOrder addLog={addLog} />
              )}
              {section === "orders" && active === "updateOrder" && (
                <UpdateOrder addLog={addLog} />
              )}

              {section === "products" && active === "simple" && (
                <CreateSimpleProduct addLog={addLog} />
              )}

              {section === "products" && active === "variable" && (
                <CreateVariableProduct addLog={addLog} />
              )}

              {section === "products" && active === "fetchProduct" && (
                <RetrieveProduct addLog={addLog} />
              )}

              {section === "products" && active === "fetchAll" && (
                <FetchAllProducts addLog={addLog} />
              )}

              {section === "products" && active === "duplicate" && (
                <DuplicateProduct addLog={addLog} />
              )}
            </div>
          </div>

          {/* ACTIVITY PANEL */}
          <div className="w-80 border-l border-gray-800 p-4 overflow-y-auto bg-gray-950">
            <h2 className="font-semibold mb-4">Activity</h2>

            {logs.length === 0 && (
              <p className="text-gray-500">No activity yet</p>
            )}

            <div className="space-y-2 text-sm">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="bg-gray-800 p-2 rounded border border-gray-700"
                >
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
