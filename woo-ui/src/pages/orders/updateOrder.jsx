import { useState } from "react";
import Select from "react-select";
import { updateOrder } from "../../services/api";

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
    backgroundColor: "#1f2937",
    borderColor: "#374151",
    color: "white",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1f2937",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#374151" : "#1f2937",
    color: "white",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
};

export default function UpdateOrder({ addLog }) {
  const [orderId, setOrderId] = useState("");
  const [selected, setSelected] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fieldGroups = {
    Basic: ["parent_id", "status", "currency", "customer_id", "customer_note"],
    Billing: [
      "billing.first_name",
      "billing.last_name",
      "billing.company",
      "billing.address_1",
      "billing.address_2",
      "billing.city",
      "billing.state",
      "billing.postcode",
      "billing.country",
      "billing.email",
      "billing.phone",
    ],
    Shipping: [
      "shipping.first_name",
      "shipping.last_name",
      "shipping.company",
      "shipping.address_1",
      "shipping.address_2",
      "shipping.city",
      "shipping.state",
      "shipping.postcode",
      "shipping.country",
    ],
    Payment: ["payment_method", "payment_method_title", "transaction_id"],
    Advanced: [
      "meta_data",
      "line_items",
      "shipping_lines",
      "fee_lines.tax_status",
      "fee_lines",
      "coupon_lines",
    ],
  };

  const toggleField = (field) => {
    setSelected((prev) => {
      if (prev.includes(field)) {
        // remove value also
        setValues((v) => {
          const copy = { ...v };
          delete copy[field];
          return copy;
        });
        return prev.filter((f) => f !== field);
      }
      return [...prev, field];
    });
  };

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => {
    const data = {};

    selected.forEach((field) => {
      let value = values[field];
      if (!value) return;

      if (
        [
          "meta_data",
          "line_items",
          "shipping_lines",
          "fee_lines",
          "coupon_lines",
        ].includes(field)
      ) {
        try {
          value = JSON.parse(value);
        } catch {
          return;
        }
      }

      const keys = field.split(".");
      let obj = data;

      keys.forEach((key, i) => {
        if (i === keys.length - 1) {
          obj[key] = value;
        } else {
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

    if (Object.keys(updateDetails).length === 0) {
      return alert("Select & fill at least one field");
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        orderId: Number(orderId),
        updateDetails,
      };

      console.log("🔥 Payload:", payload);

      await updateOrder(payload);

      addLog(`✏️ Updated Order #${orderId}`);
    } catch (err) {
      console.error(err);
      setError("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl flex flex-col gap-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-semibold">Update Order</h2>

      {/* ORDER ID */}
      <input
        className="input"
        placeholder="Order ID (required)"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      {/* CHECKBOXES */}
      {Object.entries(fieldGroups).map(([group, fields]) => (
        <div key={group}>
          <h3 className="text-blue-400 mt-4 mb-2">{group}</h3>
          <div className="grid grid-cols-2 gap-2">
            {fields.map((field) => (
              <label key={field} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(field)}
                  onChange={() => toggleField(field)}
                />
                <span className="text-sm">{field}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* DYNAMIC INPUTS */}
      {selected.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="text-green-400">Fill Selected Fields</h3>

          {selected.map((field) => {
            // ✅ STATUS DROPDOWN
            if (field === "status") {
              return (
                <select
                  key={field}
                  className="input"
                  value={values[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                >
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              );
            }

            // ✅ TAX STATUS
            if (field === "fee_lines.tax_status") {
              return (
                <select
                  key={field}
                  className="input"
                  value={values[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                >
                  <option value="">Select tax status</option>
                  {TAX_STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              );
            }

            // ✅ CURRENCY FIXED
            if (field === "currency") {
              return (
                <Select
                  key={field}
                  options={currencyOptions}
                  styles={selectStyles}
                  placeholder="Search currency..."
                  value={
                    currencyOptions.find((c) => c.value === values[field]) ||
                    null
                  }
                  onChange={(opt) => handleChange(field, opt ? opt.value : "")}
                  isClearable
                />
              );
            }

            // JSON
            if (
              [
                "meta_data",
                "line_items",
                "shipping_lines",
                "fee_lines",
                "coupon_lines",
              ].includes(field)
            ) {
              return (
                <textarea
                  key={field}
                  className="input h-24"
                  placeholder={`Enter ${field} (JSON)`}
                  value={values[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              );
            }

            // default
            return (
              <input
                key={field}
                className="input"
                placeholder={`Enter ${field}`}
                value={values[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            );
          })}
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={handleUpdate}
        className="btn-primary mt-4"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Order"}
      </button>

      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
