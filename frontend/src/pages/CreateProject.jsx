import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/api';
import { FaArrowLeft, FaUpload, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'campestre',
    subcategoria: '',
    area: '',
    habitaciones: '',
    banos: '',
    observaciones: '',
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);

    if (invalidFiles.length > 0) {
      toast.error('Algunas imágenes superan el tamaño máximo de 5MB');
      return;
    }

    setError('');
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error('Debes agregar al menos una imagen');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      });

      images.forEach(image => formDataToSend.append('images', image));

      await createProject(formDataToSend);
      toast.success('Proyecto creado exitosamente');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al crear el proyecto';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-navy-900 hover:text-amber-400 transition-colors mb-4 font-medium"
          >
            <FaArrowLeft /> Volver al Panel
          </button>
          <h1 className="text-4xl font-bold text-navy-900">Crear Nuevo Proyecto</h1>
          <p className="text-gray-600 mt-2">Completa la información del proyecto</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Nombre del Proyecto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all outline-none"
                placeholder="Ej: Casa Campestre El Roble"
              />
            </div>

            {/* Categoría y Subcategoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Categoría *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all outline-none"
                >
                  <option value="campestre">Campestre</option>
                  <option value="moderna">Moderna</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              {formData.categoria === 'otros' && (
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Subcategoría *
                  </label>
                  <select
                    name="subcategoria"
                    value={formData.subcategoria}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all outline-none"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="cabaña">Cabaña</option>
                    <option value="plancha">Plancha</option>
                    <option value="aula">Aula</option>
                    <option value="terraza">Terraza</option>
                    <option value="bodega">Bodega</option>
                    <option value="centro_vacacional">Centro Vacacional</option>
                  </select>
                </div>
              )}
            </div>

            {/* Área, Habitaciones, Baños */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Área (m²) *
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all outline-none"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Habitaciones (opcional)
                </label>
                <input
                  type="number"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all outline-none"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Baños (opcional)
                </label>
                <input
                  type="number"
                  name="banos"
                  value={formData.banos}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all outline-none"
                  placeholder="2"
                />
              </div>
            </div>

            {/* Imágenes */}
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Imágenes *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="images"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <FaUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-1">Click para seleccionar imágenes</p>
                  <p className="text-sm text-gray-400">Máximo 5MB por imagen</p>
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Observaciones */}
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Observaciones (opcional)
              </label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all outline-none resize-none"
                placeholder="Describe características especiales del proyecto..."
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creando...' : 'Crear Proyecto'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
