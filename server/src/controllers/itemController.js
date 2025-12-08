const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const item = await Item.create({
      title,
      description: description || "",
      owner: req.userId,
    });
    res.status(201).json(item);
  } catch (error) {
    console.error("CREATE ITEM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.userId }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (error) {
    console.error("GET ITEMS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(403).json({ message: "Item not found" });
    }
    if (item.owner.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this item" });
    }
    res.json(item);
  } catch (error) {
    console.error("GET ITEM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const item = req.item;
    item.title = title;
    item.description = description || item.description;

    await item.save();
    res.json(item);
  } catch (error) {
    console.error("UPDATE ITEM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.deleteItem = async (req, res) => {
  try {
    await req.item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("DELETE ITEM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
