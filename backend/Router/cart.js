import express from "express";
import cartRoutes from "../Controller/cartController.js";
const router = express.Router();

// Cart Route
router.get("/", cartRoutes.cartItem);

// Add Item To Cart
router.get("/add", cartRoutes.addCartItem);

// Delete Cart Item
router.get("/delete", cartRoutes.deleteCartItem);

// Add Multiple Items
router.post("/add/items", cartRoutes.addMulitpleItems)

export default router;
