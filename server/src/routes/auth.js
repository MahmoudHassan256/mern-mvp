const router = require("express").Router();

const { register, me, login } = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

module.exports = router;
