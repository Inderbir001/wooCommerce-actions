import { useState } from "react";
import CreateOrder from "./pages/CreateOrder";
import {
  CreateSimpleProduct,
  CreateVariableProduct,
  RetrieveProduct,
  FetchAllProducts,
} from "./pages/CreateProduct";

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
    if (sec === "products") setActive("fetchAll"); // 🔥 better default
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* SIDEBAR */}
      <div className="w-72 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-8">WooCommerce Actions</h1>

          <div className="space-y-3">
            <button
              onClick={() => handleSectionChange("orders")}
              className={`block w-full text-left px-3 py-2 rounded ${
                section === "orders" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Orders
            </button>

            <button
              onClick={() => handleSectionChange("products")}
              className={`block w-full text-left px-3 py-2 rounded ${
                section === "products" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Products
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-400 border-t border-gray-700 pt-4">
          <p>Version 3.1.3</p>
          <p className="text-gray-500">by Inder</p>
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
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* TABS */}
            <div className="flex gap-3 border-b border-gray-800 pb-2">
              {section === "orders" && (
                <button
                  onClick={() => setActive("orders")}
                  className={`px-4 py-2 rounded-t ${
                    active === "orders"
                      ? "bg-gray-800 border border-gray-700 border-b-0"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Create Orders
                </button>
              )}

              {section === "products" && (
                <>
                  <button
                    onClick={() => setActive("simple")}
                    className={`px-4 py-2 rounded-t ${active === "simple" ? "bg-gray-800 border border-gray-700 border-b-0" : "text-gray-400 hover:text-white"}`}
                  >
                    Create Simple
                  </button>

                  <button
                    onClick={() => setActive("variable")}
                    className={`px-4 py-2 rounded-t ${active === "variable" ? "bg-gray-800 border border-gray-700 border-b-0" : "text-gray-400 hover:text-white"}`}
                  >
                    Variable
                  </button>

                  <button
                    onClick={() => setActive("fetchProduct")}
                    className={`px-4 py-2 rounded-t ${active === "fetchProduct" ? "bg-gray-800 border border-gray-700 border-b-0" : "text-gray-400 hover:text-white"}`}
                  >
                    Single
                  </button>

                  <button
                    onClick={() => setActive("fetchAll")}
                    className={`px-4 py-2 rounded-t ${active === "fetchAll" ? "bg-gray-800 border border-gray-700 border-b-0" : "text-gray-400 hover:text-white"}`}
                  >
                    Fetch All
                  </button>
                </>
              )}
            </div>

            {/* CONTENT */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              {section === "orders" && active === "orders" && (
                <CreateOrder addLog={addLog} />
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

              {/* 🔥 THIS WAS MISSING */}
              {section === "products" && active === "fetchAll" && (
                <FetchAllProducts addLog={addLog} />
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
