<h1 align="center">WooCommerce Actions (CLI + Modern Web Dashboard)</h1>

<p align="center">
  <strong>Automate WooCommerce orders & products with a powerful CLI and a sleek React dashboard.</strong>
</p>

<p align="center">
  Built for QA testing, load simulation, and automation workflows — now enhanced with a real-time interactive UI, improved UX, and activity tracking.
</p>

---

## ✨ What’s New (v3.1+)

- 🎯 **Modern Dashboard UI** with tab-based navigation
- 📊 **Activity Panel** with real-time logs
- ⏳ **Loading States & Animations** (spinners, transitions)
- 🧠 **Improved UX** (inline validation, no alerts)
- 🎨 **Refined UI/UX** with Tailwind (clean + responsive)
- 🔄 Better state handling and component structure

---

## ✨ Features

### 🛒 Orders

- Create single or bulk WooCommerce orders
- Dynamic fake customer data using Faker
- Real-time creation feedback

### 📦 Products

- Create **Simple Products**
- Create **Variable Products** (with variations)
- Bulk product generation for testing

### 🔍 Retrieve Data

- Fetch product details by ID
- View structured summary + raw JSON
- Scrollable JSON viewer for debugging

### 📊 Activity Tracking

- Real-time action logs
- Displays recent operations (orders/products)
- Helps track automation flow

### ⚡ UX Enhancements

- Button loaders with spinners
- Smooth UI transitions
- Disabled states during API calls
- Error handling with inline messages

### 🖥️ Dual Interface

- CLI (interactive terminal)
- Web UI (React dashboard)

---

## 🧠 Use Cases

- 🧪 QA Testing (populate staging stores)
- 🚀 Load Testing WooCommerce APIs
- 📦 Logistics & shipping simulation
- 🛠️ Developer automation workflows

---

## 🛠️ Tech Stack

### Backend / CLI

- Node.js & Express
- Axios
- Inquirer (CLI UX)
- Faker (test data generation)
- Ora, Chalk, Figlet (CLI styling)

### Frontend (Web UI)

- React (Vite)
- Tailwind CSS
- Component-based architecture
- Async API handling

---

## 📁 Project Structure

```text
woo-cli/
├── bin/
├── cli/
├── services/
├── utils/
├── woo-ui/
│   ├── src/
│   │   ├── pages/        # Orders, Products, Retrieve
│   │   ├── components/   # Reusable UI components
│   │   └── App.jsx       # Main dashboard layout
├── .env
└── package.json
```

---

## ⚙️ Setup

### 1. Clone repo

```bash
git clone git@github.com:Inderbir001/wooCommerce-actions.git
cd wooCommerce-actions
```

### 2. Install dependencies

```bash
npm install

cd woo-ui
npm install
cd ..
```

### 3. Environment variables

```env
BASE_URL=https://yourstore.com
CONSUMER_KEY=ck_xxxxx
CONSUMER_SECRET=cs_xxxxx
```

---

## 🚀 Usage

### 🖥️ Web Dashboard (Recommended)

```bash
cd woo-ui
npm run dev
```

👉 Features:

- Sidebar navigation (Orders / Products)
- Tab-based workflows
- Activity logs panel
- Real-time UI feedback

---

### 💻 CLI Mode

```bash
npm start
```

Interactive menu:

```text
1. Create Order
2. Create Product
3. Exit
```

---

## 🔌 API Examples

### Create Order

```bash
curl -X POST http://localhost:5000/order/create-order \
-H "Content-Type: application/json" \
-d '{"product":119,"qty":2,"count":1}'
```

### Create Simple Product

```bash
curl -X POST http://localhost:5000/products/create-simple-product \
-H "Content-Type: application/json" \
-d '{"price":"100","weight":"1","length":"10","width":"10","height":"10","count":1}'
```

---

## 🎯 Future Improvements

- 🔍 Search & filtering in UI
- 📈 Analytics dashboard
- 🔄 Retry failed API actions
- 🌐 Deployment (Vercel + Render)
- 🧩 Custom hooks for cleaner logic

---

## ⚠️ Notes

- Never commit `.env`
- Use Read/Write WooCommerce API keys
- Designed for testing/staging environments

---

## 👨‍💻 Author

**Inderbir Singh**

---

## ⭐ If you found this useful

Give it a star on GitHub — it helps a lot!

