0´´´{# Hacer Vivir - Guía Técnica

## Tabla de Contenidos
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Modelo de Datos](#modelo-de-datos)
- [API Endpoints](#api-endpoints)
- [Arquitectura del Backend](#arquitectura-del-backend)
- [Sistema de Autenticación](#sistema-de-autenticación)
- [Integración con Cloudinary](#integración-con-cloudinary)
- [Frontend con React y Tailwind](#frontend-con-react-y-tailwind)
- [Flujo de una Petición](#flujo-de-una-petición)
- [Testing con Postman](#testing-con-postman)
- [Troubleshooting](#troubleshooting)

---

## Estructura del Proyecto

```
HACERVIVIR/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                  # Configuración de MongoDB
│   │   │   └── cloudinary.js          # Configuración de Cloudinary
│   │   ├── controllers/
│   │   │   ├── project.controller.js  # Lógica de proyectos
│   │   │   ├── upload.controller.js   # Lógica de uploads
│   │   │   └── auth.controller.js     # Lógica de autenticación
│   │   ├── middlewares/
│   │   │   ├── upload.middleware.js   # Multer config
│   │   │   └── auth.middleware.js     # Protección de rutas
│   │   ├── models/
│   │   │   ├── Project.js             # Schema de proyectos
│   │   │   └── User.js                # Schema de usuarios
│   │   ├── routes/
│   │   │   ├── houses.routes.js       # Rutas de proyectos
│   │   │   ├── upload.routes.js       # Rutas de uploads
│   │   │   └── auth.routes.js         # Rutas de auth
│   │   ├── app.js                     # Configuración de Express
│   │   └── server.js                  # Punto de entrada
│   ├── .env                           # Variables de entorno
│   ├── nodemon.json                   # Configuración de Nodemon
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.png               # Logo de la empresa
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Barra de navegación
│   │   │   └── ProtectedRoute.jsx     # HOC para rutas privadas
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Landing page
│   │   │   ├── ProjectDetail.jsx      # Detalle de proyecto
│   │   │   ├── Login.jsx              # Página de login
│   │   │   ├── AdminDashboard.jsx     # Panel admin
│   │   │   ├── CreateProject.jsx      # Crear proyecto
│   │   │   └── EditProject.jsx        # Editar proyecto
│   │   ├── services/
│   │   │   └── api.js                 # Cliente Axios
│   │   ├── utils/
│   │   │   └── auth.js                # Utilidades de autenticación
│   │   ├── App.jsx                    # Componente raíz
│   │   ├── index.css                  # Estilos globales + Tailwind
│   │   └── main.jsx                   # Punto de entrada
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js             # Configuración de Tailwind
│   ├── postcss.config.js              # PostCSS config
│   └── vite.config.js                 # Configuración de Vite
│
└── README.md
```

---

## Instalación y Configuración

### Requisitos Previos
- Node.js v18+ instalado
- Cuenta en MongoDB Atlas
- Cuenta en Cloudinary
- Editor de código (VS Code recomendado)
- Postman para testing

### Instalación del Backend

1. **Navegar al proyecto:**
```bash
cd C:\Users\Asus\Desktop\hacervivir\backend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno (.env):**
```env
# Server
PORT=3001

# MongoDB Atlas
MONGODB_URI=mongodb+srv://davidfelipes2511_db_user:MYuLAyKjGewhGX9i@cluster0.9hvmxp2.mongodb.net/hacervivir?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=dvibayjii
CLOUDINARY_API_KEY=383146979663239
CLOUDINARY_API_SECRET=7hBFiClEVAblF-Sc2vdXj3zODnE

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_12345
```

4. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

Deberías ver:
```
Backend corriendo en http://localhost:3001
MongoDB conectado correctamente
```

### Instalación del Frontend

1. **Navegar al frontend:**
```bash
cd C:\Users\Asus\Desktop\hacervivir\frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar desarrollo:**
```bash
npm run dev
```

Frontend corre en `http://localhost:5173`

---

## Modelo de Datos

### Schema de Project (Project.js)

```javascript
{
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  
  categoria: {
    type: String,
    required: true,
    enum: ["campestre", "moderna", "otros"]
  },
  
  subcategoria: {
    type: String,
    enum: ["cabaña", "plancha", "aula", "terraza", "bodega", "centro_vacacional"],
    required: function() {
      return this.categoria === "otros";
    }
  },
  
  area: {
    type: Number,
    required: true,
    min: 1
  },
  
  habitaciones: {
    type: Number,
    min: 0
  },
  
  banos: {
    type: Number,
    min: 0
  },
  
  imagenes: {
    type: [String],
    validate: {
      validator: (val) => val.length >= 1,
      message: "Debe tener al menos una imagen"
    }
  },
  
  observaciones: {
    type: String,
    trim: true
  },
  
  // Timestamps automáticos
  createdAt: Date,
  updatedAt: Date
}
```

### Schema de User (User.js)

```javascript
{
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // No se devuelve en queries por defecto
  },
  
  role: {
    type: String,
    enum: ["admin"],
    default: "admin"
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**Método del modelo:**
```javascript
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

---

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Autenticación

#### POST /api/auth/register
Registrar nuevo usuario administrador.

**Request:**
```json
{
  "nombre": "David",
  "email": "davidfelipes2511@gmail.com",
  "password": "Nach03074"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": "69a8d54109642a24b0293fbd",
    "nombre": "David",
    "email": "davidfelipes2511@gmail.com"
  }
}
```

#### POST /api/auth/login
Iniciar sesión.

**Request:**
```json
{
  "email": "davidfelipes2511@gmail.com",
  "password": "Nach03074"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "69a8d54109642a24b0293fbd",
      "nombre": "David",
      "email": "davidfelipes2511@gmail.com"
    }
  }
}
```

**Nota:** El token expira en 7 días.

---

### Proyectos (Houses)

#### GET /api/houses
Obtener todos los proyectos (público).

**Query Parameters:**
- `categoria` (opcional): campestre, moderna, otros

**Ejemplos:**
```
GET /api/houses
GET /api/houses?categoria=campestre
```

**Response (200):**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "698fd6b57cb1a9d68c68a7b0",
      "nombre": "Casa Moderna Horizon",
      "categoria": "moderna",
      "area": 220,
      "habitaciones": 4,
      "banos": 2,
      "imagenes": [
        "https://res.cloudinary.com/dvibayjii/image/upload/v123/hacervivir/imagen.jpg"
      ],
      "observaciones": "Diseño minimalista...",
      "createdAt": "2026-02-14T00:34:58.499Z",
      "updatedAt": "2026-02-14T00:39:50.705Z"
    }
  ]
}
```

#### GET /api/houses/:id
Obtener proyecto por ID (público).

**Response (200):**
```json
{
  "success": true,
  "data": { /* proyecto completo */ }
}
```

#### POST /api/houses
Crear proyecto (protegido - requiere token).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
nombre: Casa Test
categoria: campestre
area: 150
habitaciones: 3
banos: 2
observaciones: Proyecto de prueba
images: [archivo1.jpg, archivo2.jpg]
```

**Response (201):**
```json
{
  "success": true,
  "message": "Proyecto creado exitosamente",
  "data": { /* proyecto creado con URLs de Cloudinary */ }
}
```

#### PUT /api/houses/:id
Actualizar proyecto (protegido - requiere token).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data (solo campos a actualizar):**
```
area: 180
habitaciones: 4
images: [nuevaImagen.jpg]  // Opcional, se agregan a las existentes
```

**Response (200):**
```json
{
  "success": true,
  "message": "Proyecto actualizado exitosamente",
  "data": { /* proyecto actualizado */ }
}
```

#### DELETE /api/houses/:id
Eliminar proyecto (protegido - requiere token).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Proyecto eliminado exitosamente"
}
```

**Nota:** También elimina las imágenes de Cloudinary.

#### DELETE /api/houses/:id/remove-image
Eliminar imagen específica de un proyecto (protegido).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
imageUrl: https://res.cloudinary.com/dvibayjii/image/upload/.../imagen.jpg
```

**Response (200):**
```json
{
  "success": true,
  "message": "Imagen eliminada exitosamente",
  "data": { /* proyecto actualizado sin la imagen */ }
}
```

**IMPORTANTE:** Esta ruta DEBE estar ANTES de `DELETE /:id` en houses.routes.js:
```javascript
router.delete("/:id/remove-image", protect, removeImageFromProject); // PRIMERO
router.delete("/:id", protect, deleteProject); // DESPUÉS
```

---

### Upload

#### POST /api/upload
Subir imagen individual a Cloudinary (protegido).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
image: [archivo.jpg]
```

**Response (200):**
```json
{
  "success": true,
  "message": "Imagen subida exitosamente",
  "data": {
    "url": "https://res.cloudinary.com/dvibayjii/image/upload/v123/hacervivir/imagen.jpg",
    "public_id": "hacervivir/imagen"
  }
}
```

#### DELETE /api/upload
Eliminar imagen de Cloudinary (protegido).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "public_id": "hacervivir/imagen"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Imagen eliminada exitosamente"
}
```

---

## Arquitectura del Backend

### Capas de la Aplicación

```
┌─────────────────────────────────────┐
│   Cliente (Browser/Postman)         │
└──────────────┬──────────────────────┘
               │ HTTP Request
               ▼
┌─────────────────────────────────────┐
│   server.js (Puerto 3001)           │
│   - Inicia Express                  │
│   - Conecta a MongoDB               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   app.js                            │
│   - Middlewares (CORS, JSON)        │
│   - Enrutamiento principal          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Rutas (houses/auth/upload)        │
│   - Define endpoints                │
│   - Aplica middlewares              │
│   - Mapea a controladores           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Middlewares (auth/upload)         │
│   - Valida JWT                      │
│   - Procesa archivos                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Controladores                     │
│   - Lógica de negocio               │
│   - Manejo de errores               │
│   - Usa modelos                     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Modelos (Project/User)            │
│   - Schemas de Mongoose             │
│   - Validaciones                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   MongoDB Atlas + Cloudinary        │
│   - Almacenamiento de datos         │
│   - Almacenamiento de imágenes      │
└─────────────────────────────────────┘
```

---

## Sistema de Autenticación

### Flujo de Autenticación

1. **Registro de Usuario:**
   - POST /api/auth/register con credenciales
   - Backend encripta password con bcrypt (10 rounds)
   - Guarda usuario en MongoDB
   - Devuelve datos del usuario (sin password)

2. **Login:**
   - POST /api/auth/login con email y password
   - Backend busca usuario por email
   - Compara password con bcrypt.compare()
   - Genera JWT token con expiración de 7 días
   - Devuelve token y datos del usuario

3. **Peticiones Autenticadas:**
   - Cliente incluye header `Authorization: Bearer <token>`
   - Middleware `auth.middleware.js` intercepta la petición
   - Verifica y decodifica el token con jwt.verify()
   - Adjunta usuario a `req.user`
   - Permite continuar al controlador

4. **Frontend - Gestión de Sesión:**
   - Al hacer login, guarda token en localStorage
   - Guarda timestamp con `saveLoginTime()`
   - Axios interceptor agrega token automáticamente
   - ProtectedRoute verifica expiración cada 2 horas
   - Si expira, limpia sesión y redirige a login

### Middleware de Protección

**Archivo:** `src/middlewares/auth.middleware.js`

```javascript
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Verificar header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No estás autorizado. Token no proporcionado.",
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};

module.exports = { protect };
```

### Encriptación de Contraseñas

En `auth.controller.js`:

```javascript
const bcrypt = require("bcryptjs");

// Encriptar antes de guardar
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

user = new User({
  nombre,
  email,
  password: hashedPassword,
});
```

### Generación de JWT

```javascript
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
```

---

## Integración con Cloudinary

### Configuración

**Archivo:** `src/config/cloudinary.js`

```javascript
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

### Middleware de Multer

**Archivo:** `src/middlewares/upload.middleware.js`

```javascript
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;
```

### Upload a Cloudinary

En `upload.controller.js`:

```javascript
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "hacervivir",
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Usar en controlador
const result = await uploadToCloudinary(req.file.buffer);
const imageUrl = result.secure_url;
```

### Eliminación de Cloudinary

```javascript
// Extraer public_id de URL
const extractPublicId = (url) => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1].split('.')[0];
  const folder = parts[parts.length - 2];
  return `${folder}/${filename}`;
};

// Eliminar
const publicId = extractPublicId(imageUrl);
await cloudinary.uploader.destroy(publicId);
```

---

## Frontend con React y Tailwind

### Configuración de Tailwind CSS

**Archivo:** `tailwind.config.js`

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#1E1B4B'
        },
        'amber': {
          400: '#FDB813',
          500: '#F59E0B'
        },
      },
    },
  },
  plugins: [],
}
```

**Archivo:** `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos globales adicionales */
```

### Paleta de Colores

| Color | Clase Tailwind | Hex | Uso |
|-------|---------------|-----|-----|
| Navy 900 | `bg-navy-900` `text-navy-900` | `#1E1B4B` | Navbar, títulos principales |
| Amber 400 | `bg-amber-400` `text-amber-400` | `#FDB813` | Botones CTA, badges |
| Amber 500 | `bg-amber-500` | `#F59E0B` | Hover states |
| Slate 50 | `bg-slate-50` | `#F8FAFC` | Fondo general |

### Servicio de API

**Archivo:** `src/services/api.js`

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Proyectos
export const getAllProjects = (categoria = '') => {
  const params = categoria ? `?categoria=${categoria}` : '';
  return api.get(`/houses${params}`);
};

export const getProjectById = (id) => {
  return api.get(`/houses/${id}`);
};

export const createProject = (formData) => {
  return api.post('/houses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProject = (id, formData) => {
  return api.put(`/houses/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProject = (id) => {
  return api.delete(`/houses/${id}`);
};

export const removeImageFromProject = (projectId, imageUrl) => {
  return api.delete(`/houses/${projectId}/remove-image?imageUrl=${encodeURIComponent(imageUrl)}`);
};

// Autenticación
export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export default api;
```

### Utilidades de Autenticación

**Archivo:** `src/utils/auth.js`

```javascript
const SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 horas en milisegundos

export const saveLoginTime = () => {
  localStorage.setItem('loginTime', Date.now().toString());
};

export const isTokenExpired = () => {
  const loginTime = localStorage.getItem('loginTime');
  if (!loginTime) return true;
  
  const currentTime = Date.now();
  const elapsedTime = currentTime - parseInt(loginTime);
  
  return elapsedTime > SESSION_TIMEOUT;
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('loginTime');
};
```

### Componente ProtectedRoute

**Archivo:** `src/components/ProtectedRoute.jsx`

```javascript
import { Navigate } from 'react-router-dom';
import { isTokenExpired, clearSession } from '../utils/auth';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired()) {
    clearSession();
    alert('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

### Estructura de Componentes

#### Navbar.jsx
- Sticky top-0
- Logo PNG centrado
- Links con scroll suave: Inicio, Nosotros, Sistema Constructivo, Visítanos
- Botón "Contactar" con fondo amarillo
- Responsive (pendiente menú hamburguesa)

#### Home.jsx (Landing Page)
Secciones:
1. **Hero** - Gradiente navy-900, título principal, descripción
2. **Filtros** - Botones: Todos, Campestres, Modernas, Otros (funcionales)
3. **Catálogo** - Grid responsive de tarjetas con proyectos
4. **Nosotros** - Información de la empresa
5. **Sistema Constructivo** - 5 ventajas con iconos de colores
6. **Visítanos** - Google Maps integrado
7. **Footer** - Redes sociales y copyright

#### ProjectDetail.jsx
- Nombre grande centrado en navy-900
- Badge de categoría en amarillo
- Galería: imagen principal + miniaturas clickeables
- Cards de especificaciones: área, habitaciones, baños
- Observaciones si existen
- Botón "Volver al catálogo"

#### Login.jsx
- Gradiente de fondo (navy-900 a blue-900)
- Card blanco con logo
- Inputs profesionales con focus en amarillo
- Spinner de carga
- Mensajes de error en rojo
- **Lógica crítica:**
```javascript
const { token, user } = response.data.data; // IMPORTANTE: data.data
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
saveLoginTime();
navigate('/admin');
```

#### AdminDashboard.jsx
- Header con "Ver Sitio" y "Cerrar Sesión"
- Estadísticas: Total, Campestres, Modernas, Otros (con bordes de color)
- Botón "Crear Nuevo Proyecto"
- Tabla profesional:
  - Columnas: Imagen, Nombre, Categoría, Área, Acciones
  - Acciones: Editar (azul), Eliminar (rojo)
  - Confirmación antes de eliminar

#### CreateProject.jsx
- Formulario profesional con Tailwind
- Campos organizados en grid
- Upload de imágenes con:
  - Drag & drop zone
  - Preview de miniaturas
  - Botón X para remover individual
  - Validación de tamaño (5MB)
- Botones: "Crear Proyecto" (amarillo), "Cancelar" (gris)

#### EditProject.jsx (en desarrollo)
Similar a CreateProject pero:
- Pre-carga datos del proyecto
- Muestra imágenes existentes
- Permite agregar nuevas imágenes
- Permite eliminar imágenes existentes

---

## Flujo de una Petición

### Ejemplo Completo: Crear Proyecto desde Frontend

**1. Usuario completa formulario en CreateProject.jsx:**
```javascript
const formData = new FormData();
formData.append('nombre', 'Casa Nueva');
formData.append('categoria', 'campestre');
formData.append('area', 150);
images.forEach(img => formData.append('images', img));
```

**2. Frontend envía petición:**
```javascript
await createProject(formData);
// POST http://localhost:3001/api/houses
// Header: Authorization: Bearer eyJhbGciOiJ...
// Content-Type: multipart/form-data
```

**3. Axios interceptor agrega token:**
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**4. Backend recibe en server.js:**
```javascript
// Express escucha en puerto 3001
app.listen(3001);
```

**5. app.js aplica middlewares:**
```javascript
app.use(cors());
app.use(express.json());
app.use("/api/houses", housesRoutes);
```

**6. houses.routes.js mapea ruta:**
```javascript
router.post("/", protect, upload.array("images", 10), createProject);
// Primero: protect (valida JWT)
// Segundo: upload.array (procesa imágenes con Multer)
// Tercero: createProject (controlador)
```

**7. Middleware protect valida token:**
```javascript
const decoded = jwt.verify(token, JWT_SECRET);
req.user = await User.findById(decoded.id);
next(); // Continúa a Multer
```

**8. Middleware Multer procesa archivos:**
```javascript
// Convierte archivos a buffer en memoria
req.files = [{ buffer: <Buffer>, mimetype: 'image/jpeg' }]
next(); // Continúa al controlador
```

**9. project.controller.js ejecuta lógica:**
```javascript
// Sube imágenes a Cloudinary
const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
const results = await Promise.all(uploadPromises);
const imageUrls = results.map(r => r.secure_url);

// Crea proyecto con URLs
const project = await Project.create({
  ...req.body,
  imagenes: imageUrls
});

res.status(201).json({ success: true, data: project });
```

**10. Project.js valida y guarda:**
```javascript
// Mongoose valida schema
// Genera _id, timestamps
// Guarda en MongoDB Atlas
```

**11. Respuesta al frontend:**
```javascript
{
  success: true,
  data: {
    _id: "...",
    nombre: "Casa Nueva",
    imagenes: ["https://res.cloudinary.com/..."],
    createdAt: "2026-03-26T..."
  }
}
```

**12. Frontend actualiza UI:**
```javascript
navigate('/admin'); // Redirige al dashboard
// Dashboard llama getAllProjects() y muestra proyecto nuevo
```

---

## Testing con Postman

### Configuración Inicial

**Variables de Colección:**
```
base_url: http://localhost:3001/api
token: (se actualiza después de login)
```

### Peticiones Esenciales

#### 1. Login
```
POST {{base_url}}/auth/login
Body (JSON):
{
  "email": "davidfelipes2511@gmail.com",
  "password": "Nach03074"
}

Test Script:
pm.test("Login exitoso", () => {
  const response = pm.response.json();
  pm.collectionVariables.set("token", response.data.token);
});
```

#### 2. Ver Proyectos
```
GET {{base_url}}/houses
```

#### 3. Crear Proyecto (CON TOKEN)
```
POST {{base_url}}/houses
Headers:
  Authorization: Bearer {{token}}
Body (form-data):
  nombre: Casa Test
  categoria: campestre
  area: 150
  images: [archivo.jpg]
```

#### 4. Eliminar Imagen
```
DELETE {{base_url}}/houses/:id/remove-image?imageUrl=<url>
Headers:
  Authorization: Bearer {{token}}
```

### Bug de Postman con Multer

**Síntoma:** `Malformed part header` al subir archivos

**Workaround:** Usar curl en CMD:
```bash
curl -X POST http://localhost:3001/api/houses ^
  -H "Authorization: Bearer TOKEN" ^
  -F nombre="Casa Test" ^
  -F categoria=campestre ^
  -F area=150 ^
  -F images=@imagen.jpg
```

**Nota:** Este bug NO afecta al navegador.

---

## Troubleshooting

### Error: Token undefined en localStorage

**Síntoma:** localStorage.getItem('token') devuelve "undefined" (string)

**Causa:** Backend devuelve `response.data.data.token` pero frontend accede `response.data.token`

**Solución:**
```javascript
// Login.jsx - CORRECTO
const { token, user } = response.data.data;
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
```

### Error: Filtros no funcionan

**Síntoma:** Filtros de categoría no filtran proyectos

**Causa:** Función fetchProjects() no recibe parámetro categoria

**Solución:**
```javascript
const fetchProjects = async (categoria = '') => {
  const response = await getAllProjects(categoria);
  setProjects(response.data.data);
};
```

### Error: CORS en producción

**Solución:** Configurar origen específico en app.js:
```javascript
app.use(cors({
  origin: ['https://tu-frontend.vercel.app'],
  credentials: true
}));
```

### Error: Orden de rutas DELETE

**Síntoma:** Ruta `/:id/remove-image` no funciona

**Causa:** Ruta más genérica `/:id` intercepta primero

**Solución CRÍTICA:**
```javascript
// houses.routes.js - ORDEN IMPORTANTÍSIMO
router.delete("/:id/remove-image", protect, removeImageFromProject); // PRIMERO
router.delete("/:id", protect, deleteProject); // DESPUÉS
```

### Error: Tailwind no aplica estilos

**Verificar:**
1. `tailwind.config.js` usa `export default` (NO `module.exports`)
2. `index.css` tiene las directivas @tailwind
3. Reiniciar servidor Vite

### Error: next is not a function

**Causa:** Middleware pre() mal implementado en schema

**Solución:** Mover lógica a controladores en vez de middlewares del modelo

---

## Dependencias del Proyecto

### Backend - Producción
```json
{
  "bcryptjs": "^2.4.3",
  "cloudinary": "^2.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.2.4",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^9.2.0",
  "multer": "^1.4.5-lts.1",
  "streamifier": "^0.1.1"
}
```

### Backend - Desarrollo
```json
{
  "nodemon": "^3.1.11"
}
```

### Frontend - Producción
```json
{
  "axios": "^1.6.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-icons": "^5.0.0",
  "react-router-dom": "^6.0.0"
}
```

### Frontend - Desarrollo
```json
{
  "@vitejs/plugin-react": "^4.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "tailwindcss": "^3.4.0",
  "vite": "^7.3.1"
}
```

---

## Comandos Útiles

### NPM
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
npm run build
```

### Git
```bash
git init
git add .
git commit -m "mensaje"
git push origin main
```

### Debugging
```bash
# Ver procesos usando puerto
netstat -ano | findstr :3001

# Matar proceso
taskkill /PID <pid> /F

# Limpiar caché DNS
ipconfig /flushdns
```

---

## Buenas Prácticas Implementadas

✅ Arquitectura MVC separada  
✅ Variables de entorno para secretos  
✅ Validaciones en modelo y controlador  
✅ Manejo consistente de errores  
✅ Respuestas JSON estandarizadas  
✅ Códigos HTTP apropiados  
✅ Autenticación JWT con expiración  
✅ Encriptación bcrypt de contraseñas  
✅ Protección de rutas con middleware  
✅ Upload de imágenes a cloud (Cloudinary)  
✅ Limpieza de recursos al eliminar  
✅ Interceptores Axios para auth automática  
✅ Timeout de sesión en frontend  
✅ Componentes reutilizables  
✅ Tailwind para diseño consistente  
✅ React Router para navegación  

---

## Próximos Pasos Técnicos

### Alta Prioridad
1. **Completar EditProject.jsx** - Formulario de edición con gestión de imágenes
2. **Toast Notifications** - Reemplazar alerts con react-hot-toast
3. **Responsive Design** - Menú hamburguesa, ajustes mobile

### Media Prioridad
4. **Validaciones mejoradas** - Feedback visual en formularios
5. **Loading states** - Skeletons en lugar de spinners genéricos
6. **Error boundaries** - Manejo de errores en React

### Deploy
7. **Backend** - Railway/Render con variables de entorno
8. **Frontend** - Vercel con VITE_API_URL
9. **CORS** - Configurar para dominio de producción
10. **Testing** - Pruebas E2E antes de lanzar

---

## Recursos y Documentación

### Oficial
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [Cloudinary Node SDK](https://cloudinary.com/documentation/node_integration)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

---

**Última actualización:** Marzo 26, 2026  
**Versión del backend:** 3.0.0  
**Versión del frontend:** 1.0.0  
**Estado:** Fase 3 completada (Landing) - Fase 4 en progreso (Admin Panel)
