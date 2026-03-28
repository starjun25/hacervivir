import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, deleteProject } from '../services/api';
import { clearSession } from '../utils/auth';
import { FaPlus, FaHome, FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    campestre: 0,
    moderna: 0,
    otros: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getAllProjects();
      const projectsData = response.data.data;
      setProjects(projectsData);
      setStats({
        total: projectsData.length,
        campestre: projectsData.filter(p => p.categoria === 'campestre').length,
        moderna: projectsData.filter(p => p.categoria === 'moderna').length,
        otros: projectsData.filter(p => p.categoria === 'otros').length,
      });
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
      toast.error('Error al cargar los proyectos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, nombre) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-gray-800">¿Eliminar "{nombre}"?</p>
        <p className="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteProject(id);
                toast.success('Proyecto eliminado exitosamente');
                fetchProjects();
              } catch (err) {
                toast.error(err.response?.data?.message || 'Error al eliminar el proyecto');
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

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-navy-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          {/* Fila superior: título + botones */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-3xl font-bold leading-tight">Panel de Administración</h1>
              <p className="text-gray-300 text-sm mt-1">Gestiona tus proyectos</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 bg-white text-navy-900 px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
              >
                <FaHome /> <span className="hidden sm:inline">Ver Sitio</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                <FaSignOutAlt /> <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-amber-400">
            <h3 className="text-gray-600 text-xs font-semibold mb-1">Total</h3>
            <p className="text-3xl font-bold text-navy-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <h3 className="text-gray-600 text-xs font-semibold mb-1">Campestres</h3>
            <p className="text-3xl font-bold text-navy-900">{stats.campestre}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <h3 className="text-gray-600 text-xs font-semibold mb-1">Modernas</h3>
            <p className="text-3xl font-bold text-navy-900">{stats.moderna}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <h3 className="text-gray-600 text-xs font-semibold mb-1">Otros</h3>
            <p className="text-3xl font-bold text-navy-900">{stats.otros}</p>
          </div>
        </div>

        {/* Botón crear proyecto */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/create')}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 px-5 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <FaPlus /> Crear Nuevo Proyecto
          </button>
        </div>

        {/* Lista de proyectos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-navy-900 text-white px-6 py-4">
            <h2 className="text-xl font-bold">Proyectos Registrados</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
              <p className="mt-4 text-gray-600">Cargando proyectos...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay proyectos registrados</p>
            </div>
          ) : (
            <>
              {/* Tabla para escritorio */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Imagen</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Área</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <img
                            src={project.imagenes[0]}
                            alt={project.nombre}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-navy-900">{project.nombre}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold capitalize">
                            {project.categoria}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{project.area} m²</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/admin/edit/${project._id}`)}
                              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                            >
                              <FaEdit /> Editar
                            </button>
                            <button
                              onClick={() => handleDelete(project._id, project.nombre)}
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                            >
                              <FaTrash /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards para móvil */}
              <div className="md:hidden divide-y divide-gray-200">
                {projects.map((project) => (
                  <div key={project._id} className="p-4 flex gap-4 items-start">
                    <img
                      src={project.imagenes[0]}
                      alt={project.nombre}
                      className="w-20 h-20 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-900 truncate">{project.nombre}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold capitalize">
                        {project.categoria}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{project.area} m²</p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => navigate(`/admin/edit/${project._id}`)}
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          <FaEdit /> Editar
                        </button>
                        <button
                          onClick={() => handleDelete(project._id, project.nombre)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          <FaTrash /> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
