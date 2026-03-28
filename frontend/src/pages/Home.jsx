import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects } from '../services/api';
import { FaDollarSign, FaClock, FaCheckCircle, FaHandshake, FaPencilAlt } from 'react-icons/fa';
import { IoLogoWhatsapp, IoLogoInstagram, IoLogoFacebook, IoLogoTiktok, IoLogoYoutube } from 'react-icons/io5';
import logo from '../assets/logo.png';

const HERO_IMAGES = [
  'https://res.cloudinary.com/dvibayjii/image/upload/v1774661995/chalet_qbgndy.png',
  'https://res.cloudinary.com/dvibayjii/image/upload/v1774661995/CampestreDosPisos_gscwji.png',
  'https://res.cloudinary.com/dvibayjii/image/upload/v1772751002/hacervivir/pdwmkxscikdgrh6voi5x.jpg',
  'https://res.cloudinary.com/dvibayjii/image/upload/v1774663437/casa_de_dos_pisos_pyupqf.jpg',
];

function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async (categoria = '') => {
    try {
      setLoading(true);
      const response = await getAllProjects(categoria);
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">

      {/* Hero Section con carrusel de fondo */}
      <section id="inicio" className="relative h-[500px] md:h-[600px] overflow-hidden">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <img src={img} alt={`Hero ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-navy-900 opacity-60"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Hacer Vivir - Casas Prefabricadas
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow">
            Construimos el hogar de tus sueños con calidad, diseño y compromiso
          </p>
          <div className="flex gap-2 mt-8">
            {HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-amber-400 w-6' : 'bg-white opacity-60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      {/* Título Nuestros Proyectos */}
      <div className="py-10 bg-slate-50">
        <h2 className="text-4xl font-bold text-center text-navy-900">
          Nuestros Proyectos
        </h2>
      </div>

      {/* Filtros */}
      <section className="bg-white shadow-md border-t-2 border-b-2 border-gray-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => { setSelectedCategory(''); fetchProjects(); }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === ''
                  ? 'bg-amber-400 text-navy-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => { setSelectedCategory('campestre'); fetchProjects('campestre'); }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'campestre'
                  ? 'bg-amber-400 text-navy-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Casas Campestres
            </button>
            <button
              onClick={() => { setSelectedCategory('moderna'); fetchProjects('moderna'); }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'moderna'
                  ? 'bg-amber-400 text-navy-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Casas Modernas
            </button>
            <button
              onClick={() => { setSelectedCategory('otros'); fetchProjects('otros'); }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === 'otros'
                  ? 'bg-amber-400 text-navy-900 shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Otros Proyectos
            </button>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
              <p className="mt-4 text-gray-600">Cargando proyectos...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No hay proyectos disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => navigate(`/project/${project._id}`)}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={project.imagenes[0]} alt={project.nombre} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-amber-400 text-navy-900 px-3 py-1 rounded-full text-sm font-bold capitalize">
                      {project.categoria}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy-900 mb-2">{project.nombre}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="font-semibold mr-2">Área:</span>{project.area} m²</p>
                      {project.habitaciones && (
                        <p><span className="font-semibold mr-2">Habitaciones:</span>{project.habitaciones}</p>
                      )}
                      {project.banos && (
                        <p><span className="font-semibold mr-2">Baños:</span>{project.banos}</p>
                      )}
                    </div>
                    <button className="mt-4 w-full bg-navy-900 text-white py-2 rounded-lg hover:bg-blue-900 transition-colors font-medium">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Separador */}
      <div className="h-1 bg-gradient-to-r from-transparent via-navy-900 to-transparent"></div>

      {/* Nosotros */}
      <section id="nosotros" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-8">Nosotros</h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            Prefabricados Hacer Vivir es una empresa privada que hace parte del gremio de la construcción,
            comprometida con sus clientes para ofrecer altos estándares de calidad y servicio en la construcción
            de casas, superando sus expectativas.
          </p>
        </div>
      </section>

      {/* Separador ondulado */}
      <div className="relative h-16">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,64 C240,20 480,108 720,64 C960,20 1200,108 1440,64 L1440,120 L0,120 Z" fill="#1E1B4B" opacity="0.1" />
        </svg>
      </div>

      {/* Sistema Constructivo */}
      <section id="sistema-constructivo" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-4">
            Ventajas de las Casas Prefabricadas
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Nuestro sistema constructivo ofrece múltiples beneficios
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <FaDollarSign className="text-6xl text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">Economía</h3>
              <p className="text-gray-600">
                Por ser un sistema de construcción industrializado los costos son más bajos que los tradicionales.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <FaClock className="text-6xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">Rapidez</h3>
              <p className="text-gray-600">
                Este sistema permite que el tiempo de fabricación y montaje sea mucho menor al tradicional.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <FaCheckCircle className="text-6xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">Calidad y Respaldo</h3>
              <p className="text-gray-600">
                Nuestra construcción tiene garantía estructural de por vida, gracias a la calidad de los materiales.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <FaHandshake className="text-6xl text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">Métodos de Pago</h3>
              <p className="text-gray-600">
                Aceptamos tarjetas de crédito y débito para que puedas adquirir tu proyecto de la manera más cómoda.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <FaPencilAlt className="text-6xl text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">Diseños</h3>
              <p className="text-gray-600">
                Nuestro portafolio ofrece una gran variedad de diseños que se adaptan a la necesidad de cada cliente,
                desde un nivel, dos niveles o tipo chalet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      {/* Visítanos */}
      <section id="visitanos" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-8">Visítanos</h2>
          <p className="text-center text-lg text-gray-700 mb-8">Av. Boyacá # 69b - 45, Bogotá</p>
          <div className="max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6227817599344!2d-74.11361082507!3d4.692456595323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9c5d8c8c8c8d%3A0x8c8c8c8c8c8c8c8c!2sAv.%20Boyac%C3%A1%20%2369b-45%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1234567890123!5m2!1ses!2sco"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={logo} alt="Hacer Vivir" className="h-16 mb-4 bg-white p-2 rounded" />
              <p className="text-gray-300">
                Construimos el hogar de tus sueños con calidad, diseño y compromiso.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p className="text-gray-300 mb-2">Av. Boyacá # 69b - 45</p>
              <p className="text-gray-300 mb-4">Bogotá, Colombia</p>
              <p className="text-gray-300 mb-1">📞 Fijo: (601) 224 2988</p>
              <p className="text-gray-300 mb-1">📱 312 523 2746</p>
              <p className="text-gray-300">📱 320 240 3705</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="https://wa.me/message/MNVBF2Z46EBYK1" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-amber-400 transition-colors">
                  <IoLogoWhatsapp />
                </a>
                <a href="https://www.instagram.com/casas_hacervivir?igsh=bzIweXF1ejYzdTJv" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-amber-400 transition-colors">
                  <IoLogoInstagram />
                </a>
                <a href="https://www.facebook.com/share/18Ru2A9cf5/" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-amber-400 transition-colors">
                  <IoLogoFacebook />
                </a>
                <a href="https://www.tiktok.com/@hacervivir?_r=1&_t=ZS-94aclt6NL9A" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-amber-400 transition-colors">
                  <IoLogoTiktok />
                </a>
                <a href="https://m.youtube.com/@casasprefabricadashacervivir" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-amber-400 transition-colors">
                  <IoLogoYoutube />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">© 2025 Hacer Vivir - Casas Prefabricadas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/message/MNVBF2Z46EBYK1" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50">
        <IoLogoWhatsapp className="text-3xl" />
      </a>
    </div>
  );
}

export default Home;
