const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const { uploadImage, deleteImage } = require("../controllers/upload.controller");

// POST /api/upload - Subir una imagen
router.post("/", upload.single("image"), uploadImage);

// DELETE /api/upload - Eliminar una imagen
router.delete("/", deleteImage);

module.exports = router;