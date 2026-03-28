const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const protect = require("../middlewares/auth.middleware");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  removeImageFromProject,
} = require("../controllers/project.controller");

// GET /api/houses - Obtener todos los proyectos (PÚBLICA)
router.get("/", getAllProjects);

// GET /api/houses/:id - Obtener un proyecto por ID (PÚBLICA)
router.get("/:id", getProjectById);

// POST /api/houses - Crear proyecto (PROTEGIDA)
router.post("/", protect, upload.array("images", 10), createProject);

// PUT /api/houses/:id - Actualizar proyecto (PROTEGIDA)
router.put("/:id", protect, upload.array("images", 10), updateProject);

// DELETE /api/houses/:id/remove-image - Eliminar imagen individual (PROTEGIDA)
router.delete("/:id/remove-image", protect, removeImageFromProject);

// DELETE /api/houses/:id - Eliminar proyecto (PROTEGIDA)
router.delete("/:id", protect, deleteProject);

module.exports = router;