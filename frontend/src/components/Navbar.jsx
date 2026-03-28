import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 96;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-navy-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Hacer Vivir" className="h-20 w-auto" />
          </Link>

          {/* Links escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-navy-900 hover:text-amber-400 transition-colors font-medium text-lg"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className="text-navy-900 hover:text-amber-400 transition-colors font-medium text-lg"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('sistema-constructivo')}
              className="text-navy-900 hover:text-amber-400 transition-colors font-medium text-lg"
            >
              Sistema Constructivo
            </button>
            <button
              onClick={() => scrollToSection('visitanos')}
              className="text-navy-900 hover:text-amber-400 transition-colors font-medium text-lg"
            >
              Visítanos
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-amber-400 hover:bg-amber-500 text-navy-900 px-6 py-3 rounded-lg font-bold transition-colors shadow-md hover:shadow-lg"
            >
              Contactar
            </button>
          </div>

          {/* Botón hamburguesa (móvil) */}
          <button
            className="md:hidden text-navy-900 text-2xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-left text-navy-900 hover:text-amber-400 hover:bg-gray-50 transition-colors font-medium text-lg py-3 px-2 rounded-lg"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className="text-left text-navy-900 hover:text-amber-400 hover:bg-gray-50 transition-colors font-medium text-lg py-3 px-2 rounded-lg"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('sistema-constructivo')}
              className="text-left text-navy-900 hover:text-amber-400 hover:bg-gray-50 transition-colors font-medium text-lg py-3 px-2 rounded-lg"
            >
              Sistema Constructivo
            </button>
            <button
              onClick={() => scrollToSection('visitanos')}
              className="text-left text-navy-900 hover:text-amber-400 hover:bg-gray-50 transition-colors font-medium text-lg py-3 px-2 rounded-lg"
            >
              Visítanos
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-amber-400 hover:bg-amber-500 text-navy-900 px-6 py-3 rounded-lg font-bold transition-colors shadow-md text-left"
            >
              Contactar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
