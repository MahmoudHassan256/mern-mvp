const Item = require("../models/Item");

module.exports = async function (req, res, next) {
  try {
    const itemId = req.params.id;
    const userId = req.userId;
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this item" });
    }

    req.item = item;
    next();
  } catch (error) {
    console.error("OWNER MIDDLEWARE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
