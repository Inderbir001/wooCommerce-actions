const {
  createProduct,
  createVariableProduct,
} = require("./services/productService");

async function test() {
  try {
    console.log("🚀 Testing Simple Product...\n");

    await createProduct(
      {
        price: "100",
        weight: "1",
        length: "10",
        width: "10",
        height: "10",
      },
      1,
    );

    console.log("\n🚀 Testing Variable Product...\n");

   await createVariableProduct(
  {
    price: "200",
    weight: "2",
    length: "20",
    width: "20",
    height: "20",
  },
  {
    price: "200",
    weight: "2",
    length: "20",
    width: "20",
    height: "20",
  },
  1
);

    console.log("\n✅ All tests completed");
  } catch (err) {
    console.log("❌ Test failed:");
    console.log(err.message);
  }
}

test();
