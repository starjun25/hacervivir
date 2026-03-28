const Project = require("../models/Project");

// Obtener todos los proyectos con filtros opcionales
const getAllProjects = async (req, res) => {
  try {
    const { categoria, subcategoria } = req.query;
    
    let filtros = {};
    if (categoria) filtros.categoria = categoria;
    if (subcategoria) filtros.subcategoria = subcategoria;

    const projects = await Project.find(filtros).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los proyectos",
      error: error.message,
    });
  }
};

// Obtener un proyecto por ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Proyecto no encontrado",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el proyecto",
      error: error.message,
    });
  }
};

// Crear un proyecto nuevo
const createProject = async (req, res) => {
  try {
    // Validar que vengan imágenes
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debes subir al menos una imagen",
      });
    }

    // Subir todas las imágenes a Cloudinary
    const cloudinary = require("../config/cloudinary");
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const streamifier = require("streamifier");
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "hacervivir",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    // Crear el proyecto con las URLs de las imágenes
    const projectData = {
      ...req.body,
      imagenes: imageUrls,
    };

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: "Proyecto creado exitosamente",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al crear el proyecto",
      error: error.message,
    });
  }
};

// Actualizar un proyecto
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buscar el proyecto actual
    const currentProject = await Project.findById(id);
    
    if (!currentProject) {
      return res.status(404).json({
        success: false,
        message: "Proyecto no encontrado",
      });
    }

    // Si vienen nuevas imágenes, subirlas a Cloudinary
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      const cloudinary = require("../config/cloudinary");
      const streamifier = require("streamifier");
      
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "hacervivir",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      });

      newImageUrls = await Promise.all(uploadPromises);
    }

    // Preparar datos para actualizar
    const updateData = { ...req.body };
    
    // Si hay nuevas imágenes, agregar a las existentes
    if (newImageUrls.length > 0) {
      updateData.imagenes = [...currentProject.imagenes, ...newImageUrls];
    }

    // Actualizar el proyecto
    const project = await Project.findByIdAndUpdate(
  id,
  updateData,
  { returnDocument: 'after', runValidators: true }
);

    res.json({
      success: true,
      message: "Proyecto actualizado exitosamente",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al actualizar el proyecto",
      error: error.message,
    });
  }
};

// Eliminar un proyecto
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buscar el proyecto antes de eliminarlo
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Proyecto no encontrado",
      });
    }

    // Eliminar imágenes de Cloudinary
    const cloudinary = require("../config/cloudinary");
    
    if (project.imagenes && project.imagenes.length > 0) {
      // Extraer public_ids de las URLs de Cloudinary
      const deletePromises = project.imagenes
        .filter(url => url.includes('cloudinary.com')) // Solo las de Cloudinary
        .map(url => {
          // Extraer public_id de la URL
          // URL: https://res.cloudinary.com/dvibayjii/image/upload/v123456/hacervivir/imagen.jpg
          // public_id: hacervivir/imagen
          const parts = url.split('/');
          const filename = parts[parts.length - 1].split('.')[0];
          const folder = parts[parts.length - 2];
          const publicId = `${folder}/${filename}`;
          
          return cloudinary.uploader.destroy(publicId);
        });

      await Promise.all(deletePromises);
    }

    // Eliminar el proyecto de MongoDB
    await Project.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Proyecto y sus imágenes eliminados exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el proyecto",
      error: error.message,
    });
  }
};

   
    const removeImageFromProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.query;

    
    

    // Buscar el proyecto
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Proyecto no encontrado",
      });
    }

    // Verificar que la imagen existe en el proyecto
    if (!project.imagenes.includes(imageUrl)) {
      return res.status(400).json({
        success: false,
        message: "La imagen no pertenece a este proyecto",
      });
    }

    // No permitir eliminar si es la única imagen
    if (project.imagenes.length === 1) {
      return res.status(400).json({
        success: false,
        message: "No puedes eliminar la última imagen. El proyecto debe tener al menos una imagen.",
      });
    }

    // Eliminar de Cloudinary si es una URL de Cloudinary
    if (imageUrl.includes('cloudinary.com')) {
      const cloudinary = require("../config/cloudinary");
      const parts = imageUrl.split('/');
      const filename = parts[parts.length - 1].split('.')[0];
      const folder = parts[parts.length - 2];
      const publicId = `${folder}/${filename}`;
      
      await cloudinary.uploader.destroy(publicId);
    }

    // Eliminar la URL del array de imágenes
    project.imagenes = project.imagenes.filter(img => img !== imageUrl);
    await project.save();

    res.json({
      success: true,
      message: "Imagen eliminada exitosamente",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar la imagen",
      error: error.message,
    });
  }
};
    module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  removeImageFromProject,
};
