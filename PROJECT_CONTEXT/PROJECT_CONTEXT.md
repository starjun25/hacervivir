# Hacer Vivir - Proyecto Landing Page

## Descripción del Proyecto

Proyecto freelance para una empresa familiar de casas prefabricadas. Es una landing page que muestra el catálogo de productos sin precios, enfocándose en imágenes, especificaciones técnicas y metrajes.

**Tipo de proyecto:** Landing page + Panel de administración  
**Cliente:** Empresa familiar (proyecto real en producción)  
**Desarrollador:** Ingeniero de software recién graduado  
**Objetivo:** Practicar desarrollo full-stack (backend + frontend) mientras se construye una solución real

---

## Catálogo de Productos

El sitio presenta tres categorías principales de proyectos:

### 1. Casas Campestres
- Diseños tradicionales
- Acabados rústicos
- Amplios espacios exteriores

### 2. Casas Modernas
- Diseño minimalista
- Líneas rectas y limpias
- Ventanales grandes

### 3. Otros Proyectos
Subcategorías:
- Cabañas
- Planchas
- Aulas
- Terrazas
- Bodegas
- Centros vacacionales

**Regla importante:** Cada proyecto pertenece a UNA sola categoría, no puede aparecer en múltiples.

---

## Información de Cada Proyecto

### Campos Obligatorios
- **Nombre del modelo** - Ej: "Casa Campestre La Pradera"
- **Categoría** - campestre, moderna, u otros
- **Subcategoría** - SOLO si la categoría es "otros" (cabaña, plancha, aula, etc.)
- **Área** - en metros cuadrados
- **Imágenes** - mínimo una foto

### Campos Opcionales
- **Habitaciones** - número (no aplica para bodegas, terrazas, etc.)
- **Baños** - número (no aplica para bodegas, terrazas, etc.)
- **Observaciones técnicas** - texto libre para especificaciones

### Sobre las Imágenes
- Incluyen fotos del resultado final
- Fotos del proceso de construcción
- Algunos proyectos incluyen planos
- Se almacenan en Cloudinary (servicio en la nube)
- Validación: máximo 5MB por imagen
- Formatos aceptados: JPG, JPEG, PNG, WEBP

---

## Usuarios y Acceso

**Total de usuarios:** 2 administradores
- David (davidfelipes2511@gmail.com)
- Clemencia (vipreco@hotmail.com)

**Acceso público:**
- Cualquier persona puede ver el catálogo sin login
- Solo se muestra información y fotos

**Acceso administrativo:**
- Requiere login con JWT
- Tokens válidos por 7 días (servidor)
- Timeout de sesión: 2 horas (frontend)
- Permite crear, editar y eliminar proyectos
- Panel de administración web (sin necesidad de herramientas técnicas)

---

## Stack Tecnológico

### Backend
- **Node.js** con Express
- **MongoDB Atlas** (base de datos en la nube)
- **Mongoose** (ODM para MongoDB)
- **Cloudinary** (almacenamiento de imágenes)
- **JWT** (autenticación y autorización)
- **bcryptjs** (encriptación de contraseñas)
- **Multer** (upload de archivos)
- **CORS** (comunicación entre dominios)

### Frontend
- **React 18** con Vite
- **Axios** (peticiones HTTP al backend)
- **React Router DOM** (navegación - ✅ IMPLEMENTADO)
- **Tailwind CSS** (framework CSS para diseño profesional)
- **React Icons** (iconos para la UI)

### Herramientas de Desarrollo
- **curl (CMD)** - pruebas de API con archivos (por bug de Postman)
- **Postman** - pruebas de API (endpoints sin archivos)
- **Nodemon** - reinicio automático del servidor
- **VS Code** - editor de código
- **Vite** - build tool para React

---

## Características del Producto Final

### Landing Page (Público)
- Hero section con gradiente profesional
- Catálogo visual de proyectos con cards modernas
- Filtrado por categorías en tiempo real (Todos, Campestres, Modernas, Otros)
- Vista detallada de cada proyecto con galería de imágenes
- Sección "Nosotros" con información de la empresa
- Sección "Sistema Constructivo" con ventajas ilustradas (5 iconos de colores)
- Sección "Visítanos" con Google Maps integrado
- Footer profesional con redes sociales
- Botón flotante de WhatsApp
- Separadores visuales entre secciones
- Diseño responsive (móvil y escritorio - en progreso)
- Sin precios visibles

### Panel de Administración (Privado)
- Login profesional con validaciones
- Dashboard con estadísticas en tiempo real (total proyectos, por categoría)
- Tabla profesional de proyectos (imagen, nombre, categoría, área, acciones)
- Crear nuevos proyectos con formulario profesional
- Upload de múltiples imágenes con preview
- Editar proyectos existentes (en desarrollo)
- Eliminar proyectos con confirmación
- Eliminar imágenes individuales de proyectos
- Gestión de sesión con timeout automático
- Botones de acceso rápido (Ver Sitio, Cerrar Sesión)

---

## Paleta de Colores

El proyecto utiliza una paleta personalizada basada en el logo de la empresa:

- **Navy 900** (`#1E1B4B`) - Navbar, títulos, textos principales
- **Amber 400** (`#FDB813`) - Botones CTA, badges, acentos destacados
- **Amber 500** (`#F59E0B`) - Estados hover
- **Slate 50** (`#F8FAFC`) - Fondo general de la página
- **Slate 900** (`#0F172A`) - Textos oscuros

### Iconos Sistema Constructivo (colores diferenciados):
- 💰 Economía - Amarillo (`text-amber-500`)
- ⏱️ Rapidez - Azul (`text-blue-600`)
- ✅ Calidad - Verde (`text-green-600`)
- 📄 Financiación - Morado (`text-purple-600`)
- ✏️ Diseños - Naranja (`text-orange-600`)

---

## Información de Contacto

**Dirección:** Av. Boyacá # 69b - 45, Bogotá, Colombia

**Redes Sociales:**
- WhatsApp: https://wa.me/message/MNVBF2Z46EBYK1
- Instagram: https://www.instagram.com/casas_hacervivir
- Facebook: https://www.facebook.com/share/18Ru2A9cf5/
- TikTok: https://www.tiktok.com/@hacervivir
- YouTube: https://m.youtube.com/@casasprefabricadashacervivir

---

## Decisiones de Diseño

### ¿Por qué MongoDB?
- Flexible para cambios futuros
- Fácil de escalar
- Sin necesidad de migraciones complejas

### ¿Por qué Cloudinary?
- No ocupar espacio en el servidor
- Optimización automática de imágenes
- URLs permanentes
- Plan gratuito suficiente para el proyecto

### ¿Por qué Tailwind CSS?
- Diseño moderno y profesional sin CSS personalizado
- Utilidades pre-construidas
- Responsive design simplificado
- Customización de colores de marca

### ¿Por qué Panel de Administración?
- Autonomía para la dueña de la empresa
- No depender del desarrollador para cambios de contenido
- Más profesional que usar herramientas técnicas

### Campos Opcionales (habitaciones, baños)
- Una bodega no tiene habitaciones
- Una terraza no tiene baños
- Hacer estos campos obligatorios causaría problemas
- Solución: opcionales, y el frontend no los muestra si están vacíos

---

## Fases del Proyecto

### ✅ Fase 1: Backend Base (COMPLETADA)
- Conexión a MongoDB Atlas
- Modelo de datos definido
- CRUD completo funcionando
- Validaciones implementadas
- Pruebas exitosas

### ✅ Fase 2: Backend Avanzado (COMPLETADA)
- ✅ Integración con Cloudinary
- ✅ Subida de múltiples imágenes
- ✅ Sistema de autenticación JWT
- ✅ Modelo de User con bcrypt
- ✅ Protección de rutas administrativas (middleware)
- ✅ Registro y login funcionando
- ✅ Eliminación de imágenes individuales de proyectos

### ✅ Fase 3: Frontend Público (COMPLETADA)
- ✅ Proyecto React creado con Vite
- ✅ Navbar profesional con logo y scroll suave
- ✅ Landing page completa con hero section
- ✅ Catálogo de proyectos con filtros funcionales
- ✅ Sistema de filtrado por categoría (Todos, Campestres, Modernas, Otros)
- ✅ Vista de detalle individual con galería de imágenes
- ✅ Sección "Nosotros" con información de la empresa
- ✅ Sección "Sistema Constructivo" con ventajas (iconos de colores)
- ✅ Sección "Visítanos" con Google Maps integrado
- ✅ Footer con redes sociales (WhatsApp, Instagram, Facebook, TikTok, YouTube)
- ✅ Botón flotante de WhatsApp
- ✅ Separadores visuales entre secciones
- ✅ Diseño profesional con Tailwind CSS

### 🔄 Fase 4: Panel de Administración (EN PROGRESO)
- ✅ Login UI profesional con diseño moderno
- ✅ Autenticación JWT funcionando correctamente
- ✅ Timeout de sesión automático (2 horas)
- ✅ AdminDashboard con estadísticas en tiempo real
- ✅ Tabla profesional de proyectos (imagen, nombre, categoría, área, acciones)
- ✅ Formulario CreateProject con validaciones y preview de imágenes
- ⏸️ Formulario EditProject (en progreso)
- ⏸️ Toast notifications para reemplazar alerts
- ⏸️ Diseño responsive completo (menú hamburguesa)

### 📋 Fase 5: Deploy y Producción (PENDIENTE)
- Deploy del backend (Railway/Render)
- Deploy del frontend (Vercel)
- Configuración de CORS para producción
- Dominio y hosting
- Variables de entorno en producción
- Capacitación de usuarios

---

## Componentes Principales

### Frontend Público
- **Navbar.jsx** - Navegación con scroll suave a secciones
- **Home.jsx** - Landing page con todas las secciones integradas
- **ProjectDetail.jsx** - Vista detallada con galería de imágenes

### Panel Administrativo
- **Login.jsx** - Autenticación de usuarios
- **AdminDashboard.jsx** - Panel con estadísticas y tabla de proyectos
- **CreateProject.jsx** - Formulario de creación con preview de imágenes
- **EditProject.jsx** - Formulario de edición (en desarrollo)
- **ProtectedRoute.jsx** - HOC para proteger rutas privadas

### Utilidades
- **api.js** - Cliente Axios con interceptores para auth
- **auth.js** - Funciones de validación de sesión y timeout

---

## Estado Actual

**Base de datos:** 4 proyectos activos con imágenes de Cloudinary  
**Usuarios:** 2 administradores registrados (David y Clemencia)  
**Categorías representadas:**
- 1 casa campestre
- 2 casas modernas
- 1 otros (bodega)

**Backend:** ✅ Funcionando al 100% con autenticación JWT (tokens 7 días)  
**Frontend Público:** ✅ Landing page completa y profesional  
**Panel Admin:** 🔄 Dashboard y CreateProject completados, EditProject en progreso  
**Deploy:** 📋 No iniciado

---

## Problemas Resueltos

### Problema de DNS con MongoDB Atlas
**Síntoma:** `querySrv ECONNREFUSED` al intentar conectar  
**Causa:** Router forzando IPv6 DNS (`fe80::1`) que no podía resolver consultas SRV  
**Solución:** Configurar DNS de Google (`8.8.8.8`) directamente en Node.js

```javascript
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
```

### Validación de Subcategoría
**Requisito:** Subcategoría obligatoria SOLO si categoría es "otros"  
**Solución:** Usar `required` con función condicional en el schema de Mongoose

```javascript
subcategoria: {
  type: String,
  enum: ["cabaña", "plancha", "aula", "terraza", "bodega", "centro_vacacional"],
  required: function() {
    return this.categoria === "otros";
  }
}
```

### Cloud Name Incorrecto en Cloudinary
**Síntoma:** `Invalid cloud_name dvibayiji`  
**Causa:** Typo en el cloud name (dvibayiji vs dvibayjii)  
**Solución:** Verificar el cloud name exacto en el dashboard de Cloudinary y corregirlo en `.env`

### Bug de Postman con Multer/Busboy
**Síntoma:** `Malformed part header` al subir archivos desde Postman  
**Causa:** Bug conocido de compatibilidad entre Postman y versiones de Busboy  
**Solución Temporal:** Usar `curl` desde CMD para pruebas de subida de archivos  
**Nota:** El bug no afecta al frontend - el navegador sube archivos correctamente

### Middlewares `pre()` en Mongoose
**Síntoma:** `next is not a function` en validaciones y encriptación  
**Causa:** Problemas con callbacks en middlewares `pre("save")` y `pre("validate")`  
**Solución:** Mover lógica de validación/encriptación a los controladores en lugar de usar middlewares del modelo

### Orden de Rutas DELETE en houses.routes.js
**Síntoma:** Ruta `/:id/remove-image` no funcionaba  
**Causa:** La ruta más específica debe ir ANTES de la ruta genérica `/:id`  
**Solución:**
```javascript
router.delete("/:id/remove-image", protect, removeImageFromProject); // PRIMERO
router.delete("/:id", protect, deleteProject); // DESPUÉS
```

### Problema de Autenticación en Panel Admin
**Síntoma:** Token guardado como `undefined` en localStorage, error "Token inválido o expirado"  
**Causa:** Backend devuelve estructura `response.data.data.token` pero frontend accedía a `response.data.token`  
**Solución:** Desestructurar correctamente en Login:
```javascript
const { token, user } = response.data.data;
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
```

### Configuración de Tailwind CSS
**Detalle:** Tailwind v3 usa `export default` en config, NO `module.exports`  
**Solución:** Usar sintaxis ES6 modules en `tailwind.config.js`
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'navy': { 900: '#1E1B4B' },
        'amber': { 400: '#FDB813', 500: '#F59E0B' },
      },
    },
  },
}
```

### Función getAllProjects no filtraba
**Síntoma:** Filtros de categoría no funcionaban en el frontend  
**Causa:** Función `fetchProjects()` no recibía parámetro de categoría  
**Solución:**
```javascript
const fetchProjects = async (categoria = '') => {
  const response = await getAllProjects(categoria);
  // ...
};
```

---

## API Endpoints

### Autenticación
```
POST   /api/auth/register       # Registrar nuevo usuario
POST   /api/auth/login          # Iniciar sesión
```

### Proyectos (Houses)
```
GET    /api/houses                    # Obtener todos (público)
GET    /api/houses?categoria=moderna  # Filtrar por categoría (público)
GET    /api/houses/:id                # Obtener por ID (público)
POST   /api/houses                    # Crear proyecto (protegido)
PUT    /api/houses/:id                # Actualizar proyecto (protegido)
DELETE /api/houses/:id                # Eliminar proyecto (protegido)
DELETE /api/houses/:id/remove-image   # Eliminar imagen (protegido)
```

### Upload
```
POST   /api/upload                    # Subir imagen individual
DELETE /api/upload                    # Eliminar imagen individual
```

**Nota:** Las rutas protegidas requieren header `Authorization: Bearer <token>`

---

## Comandos de Desarrollo

### Backend
```bash
cd backend
npm run dev
# Server: http://localhost:3001
```

### Frontend
```bash
cd frontend
npm run dev
# App: http://localhost:5173
```

---

## Contacto y Soporte

**Desarrollador:** Ingeniero de software recién graduado  
**Empresa Cliente:** Hacer Vivir - Casas Prefabricadas  
**Relación:** Proyecto para negocio familiar  
**Condiciones:** Sin restricciones más allá de "algo bien hecho"

---

## Próximos Pasos

1. Completar formulario EditProject
2. Implementar toast notifications (react-hot-toast)
3. Responsive design completo (menú hamburguesa en navbar)
4. Deploy a producción
5. Capacitación de usuarios administrativos
