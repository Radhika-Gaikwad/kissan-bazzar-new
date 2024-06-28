import Food from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Item Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
}

// List food items by category
const listItemsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const items = await Food.find({ category });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
}

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
}

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => { });

    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Item Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
}

export { addFood, listItemsByCategory, listFood, removeFood };
