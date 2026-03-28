import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../services/api';
import { IoArrowBack } from 'react-icons/io5';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await getProjectById(id);
      setProject(response.data.data);
    } catch (error) {
      console.error('Error al cargar proyecto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Proyecto no encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-navy-900 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-navy-900 hover:text-amber-400 transition-colors mb-8 font-medium"
        >
          <IoArrowBack className="text-xl" />
          Volver al catálogo
        </button>

        <h1 className="text-5xl font-bold text-center text-navy-900 mb-4">
          {project.nombre}
        </h1>

        <div className="flex justify-center mb-12">
          <span className="bg-amber-400 text-navy-900 px-6 py-2 rounded-full font-bold capitalize text-lg">
            {project.categoria}
            {project.subcategoria && ` - ${project.subcategoria}`}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <img
                src={project.imagenes[selectedImage]}
                alt={project.nombre}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {project.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {project.imagenes.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${project.nombre} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all ${
                      selectedImage === index
                        ? 'ring-4 ring-amber-400 shadow-lg'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">Especificaciones</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600 font-medium">Área:</span>
                  <span className="text-navy-900 font-bold text-lg">{project.area} m²</span>
                </div>
                {project.habitaciones && (
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-600 font-medium">Habitaciones:</span>
                    <span className="text-navy-900 font-bold text-lg">{project.habitaciones}</span>
                  </div>
                )}
                {project.banos && (
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-600 font-medium">Baños:</span>
                    <span className="text-navy-900 font-bold text-lg">{project.banos}</span>
                  </div>
                )}
              </div>
            </div>

            {project.observaciones && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-navy-900 mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{project.observaciones}</p>
              </div>
            )}

            
             
            <button
              onClick={() => navigate('/')}
              className="block w-full bg-navy-900 hover:bg-blue-900 text-white text-center py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Ver más proyectos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
