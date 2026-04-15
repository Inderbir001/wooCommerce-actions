# 🚀 Woo CLI — WooCommerce Automation Tool

A powerful **Node.js CLI tool** to create **WooCommerce orders and products** using the REST API.

Built for **automation, testing, and bulk operations**, this tool simulates real store activity using dynamic data.

---

## ✨ Features

* 🛒 Create WooCommerce Orders
* 📦 Create WooCommerce Products
* 🔁 Bulk Order Creation (load testing)
* 🎲 Random Data Generation using Faker
* 🎯 Interactive CLI (menu-based)
* ⚡ Spinner feedback with Ora
* 🎨 Styled terminal output (Chalk + Figlet)

---

## 🧠 Use Cases

* QA Testing (order + product flows)
* Load testing WooCommerce APIs
* Automation for shipping & logistics testing
* Simulating real-world store activity

---

## 🛠️ Tech Stack

* Node.js
* Axios (API calls)
* Inquirer (CLI interaction)
* Faker (test data generation)
* Ora (loading spinner)
* Chalk & Figlet (UI styling)

---

## 📁 Project Structure

```
woo-cli/
├── bin/
│   └── index.js          # CLI entry point
├── services/
│   ├── orderService.js   # Order API logic
│   └── createProduct.js  # Product API logic
├── utils/
│   └── config.js         # Environment config
├── .env                  # API credentials
├── package.json
```

---

## ⚙️ Setup

### 1. Clone the repo

```
git clone git@github.com:Inderbir001/wooCommerce-actions.git
cd wooCommerce-actions
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup environment variables

Create a `.env` file:

```
BASE_URL=https://yourstore.com
CONSUMER_KEY=ck_xxxxx
CONSUMER_SECRET=cs_xxxxx
```

---

## 🚀 Usage

### Run CLI

```
npm start
```

OR (if linked globally):

```
woo-cli
```

---

## 🖥️ CLI Menu

```
🛒 Create Order
📦 Create Product
❌ Exit
```

---

## 🛒 Create Orders

* Enter customer details
* Provide product ID
* Choose quantity
* Set number of orders

👉 Supports **bulk order creation**

---

## 📦 Create Products

* Automatically generates:

  * Product name
  * Description
  * SKU
  * Price

👉 Uses Faker for realistic test data

---

## 🔥 Example Output

```
✔ Creating 5 orders...
✅ Order 1: 101
✅ Order 2: 102
✅ Order 3: 103
```

---

## ⚠️ Important Notes

* Do NOT commit `.env` file
* Do NOT push `node_modules`
* Ensure WooCommerce API keys are valid

---

## 🚀 Future Improvements

* 🔗 Auto create product → use in order
* 📊 Progress bar for bulk operations
* 📁 CSV import for bulk data
* 🔁 Retry failed API calls
* 🧪 Full automation testing workflows

---

## 👨‍💻 Author

**Inderbir Singh**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to contribute!
