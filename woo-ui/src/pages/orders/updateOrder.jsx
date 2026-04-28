import { useState } from "react";
import Select from "react-select";
import { updateOrder } from "../../services/api";

// 🧠 Label mapping (fix ugly keys)
const LABELS = {
  parent_id: "Parent ID",
  status: "Order Status",
  currency: "Currency",
  customer_id: "Customer ID",
  customer_note: "Customer Note",
  "billing.first_name": "First Name",
  "billing.last_name": "Last Name",
  "billing.address_1": "Address Line 1",
  "billing.city": "City",
  "shipping.first_name": "Shipping First Name",
  payment_method: "Payment Method",
  payment_method_title: "Payment Title",
};
const currencyOptions = [
  { value: "AED", label: "AED - UAE Dirham 🇦🇪" },
  { value: "AFN", label: "AFN - Afghan Afghani 🇦🇫" },
  { value: "ALL", label: "ALL - Albanian Lek 🇦🇱" },
  { value: "AMD", label: "AMD - Armenian Dram 🇦🇲" },
  { value: "ANG", label: "ANG - Netherlands Antillean Guilder 🇳🇱" },
  { value: "AOA", label: "AOA - Angolan Kwanza 🇦🇴" },
  { value: "ARS", label: "ARS - Argentine Peso 🇦🇷" },
  { value: "AUD", label: "AUD - Australian Dollar 🇦🇺" },
  { value: "AWG", label: "AWG - Aruban Florin 🇦🇼" },
  { value: "AZN", label: "AZN - Azerbaijani Manat 🇦🇿" },
  { value: "BAM", label: "BAM - Bosnia Convertible Mark 🇧🇦" },
  { value: "BBD", label: "BBD - Barbados Dollar 🇧🇧" },
  { value: "BDT", label: "BDT - Bangladeshi Taka 🇧🇩" },
  { value: "BGN", label: "BGN - Bulgarian Lev 🇧🇬" },
  { value: "BHD", label: "BHD - Bahraini Dinar 🇧🇭" },
  { value: "BIF", label: "BIF - Burundian Franc 🇧🇮" },
  { value: "BMD", label: "BMD - Bermudian Dollar 🇧🇲" },
  { value: "BND", label: "BND - Brunei Dollar 🇧🇳" },
  { value: "BOB", label: "BOB - Bolivian Boliviano 🇧🇴" },
  { value: "BRL", label: "BRL - Brazilian Real 🇧🇷" },
  { value: "BSD", label: "BSD - Bahamian Dollar 🇧🇸" },
  { value: "BTC", label: "BTC - Bitcoin ₿" },
  { value: "BTN", label: "BTN - Bhutanese Ngultrum 🇧🇹" },
  { value: "BWP", label: "BWP - Botswana Pula 🇧🇼" },
  { value: "BYR", label: "BYR - Belarusian Ruble 🇧🇾" },
  { value: "BZD", label: "BZD - Belize Dollar 🇧🇿" },
  { value: "CAD", label: "CAD - Canadian Dollar 🇨🇦" },
  { value: "CDF", label: "CDF - Congolese Franc 🇨🇩" },
  { value: "CHF", label: "CHF - Swiss Franc 🇨🇭" },
  { value: "CLP", label: "CLP - Chilean Peso 🇨🇱" },
  { value: "CNY", label: "CNY - Chinese Yuan 🇨🇳" },
  { value: "COP", label: "COP - Colombian Peso 🇨🇴" },
  { value: "CRC", label: "CRC - Costa Rican Colón 🇨🇷" },
  { value: "CUC", label: "CUC - Cuban Convertible Peso 🇨🇺" },
  { value: "CUP", label: "CUP - Cuban Peso 🇨🇺" },
  { value: "CVE", label: "CVE - Cape Verde Escudo 🇨🇻" },
  { value: "CZK", label: "CZK - Czech Koruna 🇨🇿" },
  { value: "DKK", label: "DKK - Danish Krone 🇩🇰" },
  { value: "DOP", label: "DOP - Dominican Peso 🇩🇴" },
  { value: "DZD", label: "DZD - Algerian Dinar 🇩🇿" },
  { value: "EGP", label: "EGP - Egyptian Pound 🇪🇬" },
  { value: "ETB", label: "ETB - Ethiopian Birr 🇪🇹" },
  { value: "EUR", label: "EUR - Euro 🇪🇺" },
  { value: "FJD", label: "FJD - Fijian Dollar 🇫🇯" },
  { value: "GBP", label: "GBP - British Pound 🇬🇧" },
  { value: "GHS", label: "GHS - Ghanaian Cedi 🇬🇭" },
  { value: "HKD", label: "HKD - Hong Kong Dollar 🇭🇰" },
  { value: "HUF", label: "HUF - Hungarian Forint 🇭🇺" },
  { value: "IDR", label: "IDR - Indonesian Rupiah 🇮🇩" },
  { value: "ILS", label: "ILS - Israeli Shekel 🇮🇱" },
  { value: "INR", label: "INR - Indian Rupee 🇮🇳" },
  { value: "JPY", label: "JPY - Japanese Yen 🇯🇵" },
  { value: "KES", label: "KES - Kenyan Shilling 🇰🇪" },
  { value: "KRW", label: "KRW - South Korean Won 🇰🇷" },
  { value: "KWD", label: "KWD - Kuwaiti Dinar 🇰🇼" },
  { value: "LKR", label: "LKR - Sri Lankan Rupee 🇱🇰" },
  { value: "MAD", label: "MAD - Moroccan Dirham 🇲🇦" },
  { value: "MXN", label: "MXN - Mexican Peso 🇲🇽" },
  { value: "MYR", label: "MYR - Malaysian Ringgit 🇲🇾" },
  { value: "NGN", label: "NGN - Nigerian Naira 🇳🇬" },
  { value: "NOK", label: "NOK - Norwegian Krone 🇳🇴" },
  { value: "NPR", label: "NPR - Nepalese Rupee 🇳🇵" },
  { value: "NZD", label: "NZD - New Zealand Dollar 🇳🇿" },
  { value: "OMR", label: "OMR - Omani Rial 🇴🇲" },
  { value: "PKR", label: "PKR - Pakistani Rupee 🇵🇰" },
  { value: "PLN", label: "PLN - Polish Zloty 🇵🇱" },
  { value: "QAR", label: "QAR - Qatari Riyal 🇶🇦" },
  { value: "RON", label: "RON - Romanian Leu 🇷🇴" },
  { value: "RUB", label: "RUB - Russian Ruble 🇷🇺" },
  { value: "SAR", label: "SAR - Saudi Riyal 🇸🇦" },
  { value: "SEK", label: "SEK - Swedish Krona 🇸🇪" },
  { value: "SGD", label: "SGD - Singapore Dollar 🇸🇬" },
  { value: "THB", label: "THB - Thai Baht 🇹🇭" },
  { value: "TRY", label: "TRY - Turkish Lira 🇹🇷" },
  { value: "TWD", label: "TWD - Taiwan Dollar 🇹🇼" },
  { value: "UAH", label: "UAH - Ukrainian Hryvnia 🇺🇦" },
  { value: "USD", label: "USD - US Dollar 🇺🇸" },
  { value: "VND", label: "VND - Vietnamese Dong 🇻🇳" },
  { value: "ZAR", label: "ZAR - South African Rand 🇿🇦" },
  { value: "ZMW", label: "ZMW - Zambian Kwacha 🇿🇲" },
];
// same options (unchanged)
const STATUS_OPTIONS = [
  "pending",
  "processing",
  "on-hold",
  "completed",
  "cancelled",
  "refunded",
  "failed",
  "trash",
];
const TAX_STATUS_OPTIONS = ["taxable", "none"];

const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#111827",
    borderColor: "#374151",
    borderRadius: "0.75rem",
    padding: "2px",
  }),
  menu: (base) => ({ ...base, backgroundColor: "#111827" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#1f2937" : "#111827",
    color: "white",
  }),
  singleValue: (base) => ({ ...base, color: "white" }),
};

export default function UpdateOrder({ addLog }) {
  const [orderId, setOrderId] = useState("");
  const [selected, setSelected] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const fieldGroups = {
    Basic: ["parent_id", "status", "currency", "customer_id", "customer_note"],
    Billing: [
      "billing.first_name",
      "billing.last_name",
      "billing.address_1",
      "billing.city",
    ],
    Shipping: [
      "shipping.first_name",
      "shipping.last_name",
      "shipping.address_1",
      "shipping.city",
    ],
    Payment: ["payment_method", "payment_method_title"],
    Advanced: ["meta_data", "line_items", "fee_lines.tax_status"],
  };

  const toggleField = (field) => {
    setSelected((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );
  };

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => {
    const data = {};
    selected.forEach((field) => {
      let value = values[field];
      if (!value) return;

      const keys = field.split(".");
      let obj = data;

      keys.forEach((key, i) => {
        if (i === keys.length - 1) obj[key] = value;
        else {
          obj[key] = obj[key] || {};
          obj = obj[key];
        }
      });
    });
    return data;
  };

  const handleUpdate = async () => {
    if (!orderId) return alert("Order ID required");

    const updateDetails = buildPayload();
    if (Object.keys(updateDetails).length === 0)
      return alert("Select at least one field");

    setLoading(true);
    try {
      await updateOrder({
        orderId: Number(orderId),
        updateDetails,
      });
      addLog(`Updated Order #${orderId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-white">Update Order</h2>
        <p className="text-sm text-gray-400">
          Select fields and update only what you need
        </p>
      </div>

      {/* SECTIONS */}
      {Object.entries(fieldGroups).map(([group, fields]) => (
        <div
          key={group}
          className="bg-gray-900/70 border border-gray-700 rounded-2xl p-5 space-y-4"
        >
          <h3 className="text-blue-400 font-semibold">{group}</h3>

          <div className="grid md:grid-cols-2 gap-3">
            {fields.map((field) => (
              <label
                key={field}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(field)}
                  onChange={() => toggleField(field)}
                />
                <span className="text-sm text-gray-300">
                  {LABELS[field] || field}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* INPUTS */}
      {selected.length > 0 && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 space-y-4">
          <h3 className="text-green-400 font-semibold">Fill Selected Fields</h3>

          {selected.map((field) => {
            if (field === "status") {
              return (
                <select
                  key={field}
                  className="input"
                  onChange={(e) => handleChange(field, e.target.value)}
                >
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              );
            }

            if (field === "fee_lines.tax_status") {
              return (
                <select
                  key={field}
                  className="input"
                  onChange={(e) => handleChange(field, e.target.value)}
                >
                  <option value="">Tax status</option>
                  {TAX_STATUS_OPTIONS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              );
            }

            if (field === "currency") {
              return (
                <Select
                  key={field}
                  styles={selectStyles}
                  placeholder="Search currency..."
                  options={currencyOptions}
                  onChange={(opt) => handleChange(field, opt ? opt.value : "")}
                />
              );
            }

            return (
              <input
                key={field}
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={LABELS[field] || field}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            );
          })}
        </div>
      )}

      {/* ORDER ID */}
      <input
        className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Order ID (required)"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      {/* BUTTON */}
      <button
        onClick={handleUpdate}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold shadow-lg hover:opacity-90 transition"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Order"}
      </button>
    </div>
  );
}
