const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controllers/productCtrls");
//

const router = express.Router();

// API
router.get("/all-products", getAllProducts);
router.get("/product/:id", getOneProduct);
router.post("/product", addOneProduct);
router.put("/product/:id", deleteOneProduct);
router.delete("/product/:id", updateOneProduct);

module.exports = router;
