const cloudinary = require("../config/cloudinary");
const streamifier = require('streamifier');

// Subir una imagen a Cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se ha enviado ninguna imagen",
      });
    }

    // Subir desde buffer usando stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "hacervivir",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Error al subir la imagen",
            error: error.message,
          });
        }

        res.json({
          success: true,
          message: "Imagen subida exitosamente",
          data: {
            url: result.secure_url,
            public_id: result.public_id,
          },
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al subir la imagen",
      error: error.message,
    });
  }
};

// Eliminar una imagen de Cloudinary
const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: "Se requiere el public_id de la imagen",
      });
    }

    await cloudinary.uploader.destroy(public_id);

    res.json({
      success: true,
      message: "Imagen eliminada exitosamente",
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
  uploadImage,
  deleteImage,
};