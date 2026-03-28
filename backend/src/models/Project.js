const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del proyecto es obligatorio"],
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: {
        values: ["campestre", "moderna", "otros"],
        message: "La categoría debe ser campestre, moderna u otros",
      },
    }, 
    subcategoria: {
      type: String,
      enum: {
        values: ["cabaña", "plancha", "aula", "terraza", "bodega", "centro_vacacional"],
        message: "Subcategoría no válida",
      },
      required: function() {
        return this.categoria === "otros";
      }
    }, // <--- Cierra aquí subcategoria, elimina el validate que está abajo
    area: {
      type: Number,
      required: [true, "El área es obligatoria"],
      min: [1, "El área debe ser mayor a 0"],
    },
    habitaciones: {
      type: Number,
      min: [0, "El número de habitaciones no puede ser negativo"],
    },
    banos: {
      type: Number,
      min: [0, "El número de baños no puede ser negativo"],
    },
    imagenes: {
      type: [String],
      validate: {
        validator: (val) => val.length >= 1,
        message: "Debe tener al menos una imagen",
      },
    },
    observaciones: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;