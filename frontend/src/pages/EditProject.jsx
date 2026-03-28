import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject, removeImageFromProject } from '../services/api';
import { FaArrowLeft, FaUpload, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'campestre',
    subcategoria: '',
    area: '',
    habitaciones: '',
    banos: '',
    observaciones: '',
  });
  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(id);
        const project = response.data.data;

        setFormData({
          nombre: project.nombre,
          categoria: project.categoria,
          subcategoria: project.subcategoria || '',
          area: project.area,
          habitaciones: project.habitaciones || '',
          banos: project.banos || '',
          observaciones: project.observaciones || '',
        });
        setCurrentImages(project.imagenes);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error('Error al cargar el proyecto');
        setError('Error al cargar proyecto');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;
    const invalidFiles = files.filter(file => file.size > maxSize);

    if (invalidFiles.length > 0) {
      toast.error(`Imágenes que superan 5MB: ${invalidFiles.map(f => f.name).join(', ')}`);
      e.target.value = '';
      return;
    }

    setNewImages(files);
    setNewImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index));
  };

  const handleRemoveCurrentImage = (imageUrl) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-gray-800">¿Eliminar esta imagen?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await removeImageFromProject(id, imageUrl);
                setCurrentImages(prev => prev.filter(img => img !== imageUrl));
                toast.success('Imagen eliminada exitosamente');
              } catch (err) {
                toast.error(err.response?.data?.message || 'Error al eliminar imagen');
              }
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const data = new FormData();
      data.append('nombre', formData.nombre);
      data.append('categoria', formData.categoria);
      if (formData.subcategoria) data.append('subcategoria', formData.subcategoria);
      data.append('area', formData.area);
      if (formData.habitaciones) data.append('habitaciones', formData.habitaciones);
      if (formData.banos) data.append('banos', formData.banos);
      if (formData.observaciones) data.append('observaciones', formData.observaciones);

      newImages.forEach((image) => {
        data.append('images', image);
      });

      await updateProject(id, data);
      toast.success('Proyecto actualizado exitosamente');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al actualizar proyecto';
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold text-navy-900">Editar Proyecto</h1>
          <p className="text-gray-600 mt-2">Modifica la información del proyecto</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Imágenes actuales */}
          {currentImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">
                Imágenes Actuales ({currentImages.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCurrentImage(img)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                />
              </div>
            </div>

            {/* Nuevas imágenes */}
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Agregar Nuevas Imágenes (opcional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="newImages"
                />
                <label htmlFor="newImages" className="cursor-pointer">
                  <FaUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-1">Click para agregar imágenes</p>
                  <p className="text-sm text-gray-400">Se agregarán a las existentes · Máx 5MB</p>
                </label>
              </div>

              {newImagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {newImagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Nueva ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes className="text-xs" />
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
                disabled={saving}
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Guardando...' : 'Guardar Cambios'}
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

export default EditProject;
