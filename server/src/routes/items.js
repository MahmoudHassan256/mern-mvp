const router = require("express").Router();

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const auth = require("../middlewares/authMiddleware");
const owner = require("../middlewares/ownerMiddleware");

router.post("/", auth, createItem);
router.get("/", auth, getItems);
router.get("/:id", auth, getItemById);

router.put("/:id", auth, owner, updateItem);
router.delete("/:id", auth, owner, deleteItem);

module.exports = router;
