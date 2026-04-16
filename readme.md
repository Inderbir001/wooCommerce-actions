<h1 align="center">🛒 Woo CLI — WooCommerce Automation Tool</h1>

<p align="center">
  <strong>A powerful Node.js CLI tool to create WooCommerce orders and products using the REST API.</strong>
</p>

<p align="center">
  Built for automation, testing, and bulk operations, this tool simulates real store activity using dynamic data.
</p>

---

## ✨ Features

- **🛒 Create WooCommerce Orders:** Easily generate single or multiple orders with realistic fake customer data.
- **📦 Create WooCommerce Products:** Automatically generate simple and variable products, including variations.
- **🔁 Bulk Operations:** Create bulk orders and products for load testing and populating your store.
- **🎲 Dynamic Data Generation:** Utilizes `@faker-js/faker` to create realistic test data for orders and products.
- **🎯 Interactive CLI:** An intuitive, menu-based command-line interface powered by `inquirer`.
- **⚡ Real-time Feedback:** Visual progress indicators using `ora` spinners.
- **🎨 Beautiful Output:** Styled terminal outputs with `chalk` and `figlet` for a better developer experience.

## 🧠 Use Cases

- **QA Testing:** Quickly populate a staging store to test order and product flows.
- **Load Testing:** Stress test WooCommerce APIs with bulk data creation.
- **Logistics Simulation:** Automate shipping and logistics testing by simulating real-world store activity.

## 🛠️ Tech Stack

- **Node.js**
- **Axios** (API requests)
- **Inquirer** (Interactive CLI prompts)
- **Faker** (Realistic test data generation)
- **Ora** (Loading spinners)
- **Chalk & Figlet** (Terminal styling and ASCII art)

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
├── .env                   # API credentials (Not committed)
└── package.json
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone git@github.com:Inderbir001/wooCommerce-actions.git
cd wooCommerce-actions
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://yourstore.com
CONSUMER_KEY=ck_xxxxx
CONSUMER_SECRET=cs_xxxxx
```

## 🚀 Usage

Run the CLI tool using npm:

```bash
npm start
```

Or, if linked globally:

```bash
woo-cli
```

### 🖥️ CLI Menu

Upon starting the CLI, you will be presented with an interactive menu:

```text
? What do you want to do?
  1. Create Order
  2. Create Product
  3. Exit
```

## 🔥 Example Actions

### 🛒 Create Orders

- Enter product ID
- Choose quantity per order
- Set the number of orders to generate

> Supports bulk order creation with randomized realistic customer details.

### 📦 Create Products

- Choose between `Simple` or `Variable` products.
- Automatically generates: Product name, description, SKU, and assigns the provided dimensions and price.

> Automatically creates variants with "Colour" and "Size" attributes for variable products.

## ⚠️ Important Notes

- **Security:** Do NOT commit your `.env` file. Ensure it is included in your `.gitignore`.
- **Dependencies:** Do NOT push `node_modules`.
- **Credentials:** Ensure your WooCommerce API keys (`CONSUMER_KEY` and `CONSUMER_SECRET`) are valid and have `Read/Write` permissions.

## 🚀 Future Improvements

- [ ] Auto-link newly created products directly into new orders.
- [ ] Implement a progress bar for large bulk operations.
- [ ] Support CSV imports for bulk data creation.
- [ ] Add a retry mechanism for failed API calls.
- [ ] Introduce full automation testing workflows.

## 👨‍💻 Author

**Inderbir Singh**

---

<p align="center">
  ⭐️ If you find this project useful, please consider giving it a star on GitHub!
</p>
