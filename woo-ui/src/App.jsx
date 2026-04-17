import CreateOrder from "./pages/CreateOrder";
import { CreateSimpleProduct } from "./pages/CreateProduct";
import { CreateVariableProduct } from "./pages/CreateProduct";

function App() {
  return (
    <div>
      <CreateOrder />
      <CreateSimpleProduct />
      <CreateVariableProduct />
    </div>
  );
}

export default App;
