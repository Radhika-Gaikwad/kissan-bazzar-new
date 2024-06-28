import express from "express";
import multer from "multer";
import { addFood, listItemsByCategory, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Image storage engine setup
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST route to add a new food item
foodRouter.post("/add", upload.single("image"), addFood);

// GET route to list all food items
foodRouter.get("/list", listFood);

// GET route to list food items by category
foodRouter.get("/list/:category", listItemsByCategory);

// POST route to remove a food item
foodRouter.post("/remove", removeFood);

export default foodRouter;
