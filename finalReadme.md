<h1 align="center">WooCommerce Actions (CLI & Web UI)</h1>

<p align="center">
  <strong>A powerful Node.js toolset to automate WooCommerce orders and products creation using the REST API.</strong>
</p>

<p align="center">
  Built for automation, load testing, and bulk operations, this tool simulates real store activity using dynamic data. Version 3.0.0 now includes a streamlined React-based Web Interface alongside the traditional CLI!
</p>

---

## ✨ Features

- **🛒 Create WooCommerce Orders:** Easily generate single or multiple orders with realistic fake customer data.
- **📦 Create WooCommerce Products:** Automatically generate simple and variable products, including variations (e.g., Color and Size attributes).
- **🔁 Bulk Operations:** Create bulk orders and products for load testing and populating your staging store.
- **🎲 Dynamic Data Generation:** Utilizes `@faker-js/faker` to create realistic test data for orders and products.
- **🖥️ React Web UI (v3.0.0):** A sleek, dark-themed Vite + React frontend powered by Tailwind CSS for easy point-and-click operations.
- **🎯 Interactive CLI:** An intuitive, menu-based command-line interface powered by `inquirer`.
- **⚡ Real-time Feedback:** Visual progress indicators using `ora` spinners in the CLI.

## 🧠 Use Cases

- **QA Testing:** Quickly populate a staging store to test order and product flows.
- **Load Testing:** Stress test WooCommerce APIs with bulk data creation.
- **Logistics Simulation:** Automate shipping and logistics testing by simulating real-world store activity.

## 🛠️ Tech Stack

**Backend / CLI:**

- Node.js & Express (API Server)
- Axios (API requests)
- Inquirer (Interactive CLI prompts)
- Faker (Realistic test data generation)
- Ora, Chalk & Figlet (Terminal styling & loading spinners)

**Frontend (Web UI):**

- React (via Vite)
- Tailwind CSS (Styling)

## 📁 Project Structure

```text
woo-cli/
├── bin/
│   └── index.js           # CLI entry point
├── cli/
│   ├── actions/           # Command handlers (order, product)
│   ├── data/              # Data generation logic (faker)
│   └── mainMenu.js        # Main CLI menu prompt
├── services/
│   ├── orderService.js    # Order API logic
│   └── productService.js  # Product API logic
├── utils/
│   └── config.js          # Environment configuration
├── woo-ui/                # React Web Interface (v3.0.0)
│   ├── src/               # React Components & Pages
│   ├── package.json       # UI Dependencies
│   └── vite.config.js     # Vite configuration
├── .env                   # API credentials (Not committed)
└── package.json           # Backend/CLI Dependencies
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone git@github.com:Inderbir001/wooCommerce-actions.git
cd wooCommerce-actions
```

### 2. Install dependencies

You will need to install dependencies for both the backend/CLI and the Web UI.

```bash
# Install Backend / CLI dependencies
npm install

# Install Web UI dependencies
cd woo-ui
npm install
cd ..
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://yourstore.com
CONSUMER_KEY=ck_xxxxx
CONSUMER_SECRET=cs_xxxxx
```

## 🚀 Usage

### 🖥️ Web UI (Recommended)

To launch the modern React Web Interface:

```bash
cd woo-ui
npm run dev
```

_This will open the UI in your browser, where you can easily navigate between Orders, Simple Products, and Variable Products._

### 💻 CLI Menu

Run the CLI tool using npm from the root directory:

```bash
npm start
```

Upon starting the CLI, you will be presented with an interactive menu:

```text
? What do you want to do?
  1. Create Order
  2. Create Product
  3. Exit
```

## 🔌 API / cURL Examples

If you are interacting directly with the local Express server (running on port 5000), you can use the following endpoints:

**Create Order:**

```bash
curl -X POST http://localhost:5000/order/create-order -H "Content-Type: application/json" -d '{
  "product": 119,
  "qty": 2,
  "count": 1
}'
```

**Create Simple Product:**

```bash
curl -X POST http://localhost:5000/products/create-simple-product -H "Content-Type: application/json" -d '{
  "price": "100",
  "weight": "1",
  "length": "10",
  "width": "10",
  "height": "10",
  "count": 1
}'
```

## ⚠️ Important Notes

- **Security:** Do NOT commit your `.env` file. Ensure it is included in your `.gitignore`.
- **Credentials:** Ensure your WooCommerce API keys (`CONSUMER_KEY` and `CONSUMER_SECRET`) are valid and have `Read/Write` permissions.

## 👨‍💻 Author

**Inderbir Singh**
