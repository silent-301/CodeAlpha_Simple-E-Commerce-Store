const express = require("express");
const router = express.Router();
const { authUser, registerUser, getUsers, deleteUser, updateUserRole } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);
router.put("/:id/role", protect, admin, updateUserRole);

module.exports = router;
