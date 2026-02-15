# 📝 Lista de Tareas - React

Una aplicación completa y moderna de lista de tareas (Todo List) desarrollada con React, que incluye todas las funcionalidades esenciales para gestionar tus tareas diarias de manera eficiente.

## 🎯 Características Principales

### ✨ Funcionalidades Core
- ✅ **Agregar tareas**: Input intuitivo para crear nuevas tareas rápidamente
- 📋 **Listar tareas**: Visualización clara de todas tus tareas con su estado
- ☑️ **Marcar como completada**: Checkbox elegante para marcar/desmarcar tareas
- 🗑️ **Eliminar tareas**: Botón individual para eliminar tareas específicas
- 📊 **Contador inteligente**: Muestra el número de tareas pendientes y completadas
- 🔍 **Filtros avanzados**: Filtra por todas, activas o completadas
- 🧹 **Limpiar completadas**: Elimina todas las tareas completadas con un solo clic
- 💾 **Persistencia de datos**: Tus tareas se guardan automáticamente en localStorage

### 🎨 Diseño y Experiencia de Usuario
- 🌈 **Interfaz moderna y atractiva**: Colores vibrantes con degradados
- 📱 **Totalmente responsive**: Funciona perfectamente en móvil, tablet y desktop
- ✨ **Animaciones suaves**: Transiciones fluidas al agregar, completar y eliminar tareas
- 🎯 **UX optimizada**: Interfaz intuitiva y fácil de usar
- 🖱️ **Efectos hover**: Retroalimentación visual en todos los elementos interactivos

### 🔧 Características Técnicas
- ⚛️ **React Hooks**: Uso de useState y useEffect para gestión de estado
- 🧩 **Componentes modulares**: Arquitectura organizada y reutilizable
- ✅ **Validación de inputs**: No permite tareas vacías
- 🆔 **IDs únicos**: Cada tarea tiene un identificador único basado en timestamp
- 📦 **localStorage API**: Persistencia de datos sin necesidad de backend
- 💻 **Código limpio**: Bien comentado y siguiendo mejores prácticas

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14.0 o superior)
- **npm** (generalmente viene con Node.js)

Para verificar si tienes Node.js y npm instalados, ejecuta:

```bash
node --version
npm --version
```

## 🚀 Instalación

Sigue estos pasos para instalar y ejecutar la aplicación:

### 1. Clonar o descargar el repositorio

```bash
git clone <url-del-repositorio>
cd todo-list-react
```

### 2. Instalar las dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias listadas en `package.json`:
- React (v18.2.0)
- React-DOM (v18.2.0)
- React-Scripts (v5.0.1)

### 3. Ejecutar la aplicación

```bash
npm start
```

Esto iniciará el servidor de desarrollo y abrirá automáticamente la aplicación en tu navegador en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
todo-list-react/
├── public/
│   └── index.html              # HTML base de la aplicación
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── TodoInput.jsx       # Componente input para nuevas tareas
│   │   ├── TodoInput.css       # Estilos del input
│   │   ├── TodoList.jsx        # Componente contenedor de la lista
│   │   ├── TodoList.css        # Estilos de la lista
│   │   ├── TodoItem.jsx        # Componente de tarea individual
│   │   ├── TodoItem.css        # Estilos de cada tarea
│   │   ├── FilterButtons.jsx   # Componente de botones de filtro
│   │   └── FilterButtons.css   # Estilos de los filtros
│   ├── App.jsx                 # Componente principal con lógica de estado
│   ├── App.css                 # Estilos globales de la aplicación
│   ├── index.jsx               # Punto de entrada de React
│   └── setupTests.js           # Configuración de tests
├── test/                       # Tests separados del código fuente
│   ├── App.test.jsx            # Tests del componente App
│   └── components/             # Tests de componentes
│       ├── TodoInput.test.jsx
│       ├── TodoList.test.jsx
│       ├── TodoItem.test.jsx
│       └── FilterButtons.test.jsx
├── vite.config.js              # Configuración de Vite y Vitest
├── package.json                # Dependencias y scripts del proyecto
├── .gitignore                  # Archivos ignorados por Git
└── README.md                   # Este archivo
```

### 📝 Descripción de Componentes

#### `App.jsx` - Componente Principal
El cerebro de la aplicación que gestiona:
- Estado global de las tareas (`todos`)
- Estado del filtro actual (`filter`)
- Funciones para agregar, completar y eliminar tareas
- Persistencia en localStorage
- Contadores de tareas

#### `TodoInput.jsx` - Input de Nuevas Tareas
- Campo de texto para escribir nuevas tareas
- Validación para evitar tareas vacías
- Botón para agregar tareas
- Soporte para tecla Enter

#### `TodoList.jsx` - Contenedor de Lista
- Renderiza la lista completa de tareas
- Mapea cada tarea a un componente `TodoItem`
- Gestiona las animaciones de entrada

#### `TodoItem.jsx` - Tarea Individual
- Checkbox personalizado para marcar como completada
- Texto de la tarea con estilo tachado si está completada
- Botón de eliminar con icono
- Animaciones de hover y estado

#### `FilterButtons.jsx` - Botones de Filtrado
- Tres botones para filtrar: Todas, Activas, Completadas
- Indicador visual del filtro activo
- Botón adicional para limpiar tareas completadas

## 🛠️ Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`
Ejecuta la aplicación en modo desarrollo.
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

La página se recargará automáticamente si realizas cambios.
También verás errores de lint en la consola.

### `npm test`
Lanza el corredor de pruebas en modo interactivo con Vitest.
Los tests se volverán a ejecutar automáticamente cuando realices cambios.

### `npm run test:run`
Ejecuta todos los tests una sola vez (útil para CI/CD).

### `npm run test:ui`
Abre una interfaz gráfica interactiva para visualizar y ejecutar tests.
Muy útil para desarrollo y debugging de tests.

### `npm run test:coverage`
Ejecuta los tests y genera un reporte de cobertura de código.
El reporte se genera en formato HTML en la carpeta `coverage/`.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.
Optimiza React para el mejor rendimiento.

La compilación está minificada y los nombres de archivo incluyen hashes.
¡Tu aplicación está lista para ser desplegada!

### `npm run eject`
**Nota: esta es una operación unidireccional. ¡Una vez que hagas `eject`, no podrás volver atrás!**

Si no estás satisfecho con las opciones de configuración, puedes hacer `eject` en cualquier momento.

## 🧪 Testing

Esta aplicación cuenta con una suite completa de tests unitarios y de integración utilizando las mejores herramientas modernas de testing para React.

### Tecnologías de Testing

- **Vitest**: Framework de testing rápido y moderno, compatible con Vite
- **Happy DOM**: Entorno DOM ligero y rápido para ejecutar tests
- **React Testing Library**: Biblioteca para testing de componentes React
- **@testing-library/jest-dom**: Matchers personalizados para mejorar assertions
- **@testing-library/user-event**: Simulación realista de interacciones de usuario

### Estructura de Tests

```
src/
├── App.test.jsx                    # Tests de integración del componente principal (21 tests)
└── components/
    ├── TodoInput.test.jsx          # Tests del input de tareas (8 tests)
    ├── TodoList.test.jsx           # Tests del contenedor de lista (6 tests)
    ├── TodoItem.test.jsx           # Tests de tarea individual (7 tests)
    └── FilterButtons.test.jsx      # Tests de botones de filtro (10 tests)
```

### Cobertura de Tests

La aplicación cuenta con **52 tests** que cubren:

#### App.test.jsx (Tests de Integración)
- ✅ Renderizado correcto del componente
- ✅ Visualización de título y componentes principales
- ✅ Estado vacío inicial
- ✅ Agregar nuevas tareas
- ✅ Marcar tareas como completadas
- ✅ Eliminar tareas
- ✅ Filtrado de tareas (todas/activas/completadas)
- ✅ Contador de tareas pendientes y completadas
- ✅ Persistencia en localStorage
- ✅ Carga de tareas desde localStorage
- ✅ Limpiar tareas completadas
- ✅ Estados vacíos con filtros
- ✅ Manejo de errores de localStorage
- ✅ Pluralización correcta de contadores

#### TodoInput.test.jsx
- ✅ Renderizado de input y botón
- ✅ Validación de tareas vacías
- ✅ Validación de espacios en blanco
- ✅ Llamada correcta a callbacks
- ✅ Limpieza del input después de agregar
- ✅ Soporte para tecla Enter
- ✅ Estado del botón según contenido

#### TodoList.test.jsx
- ✅ Renderizado de lista vacía
- ✅ Renderizado de múltiples tareas
- ✅ Paso correcto de props
- ✅ Visualización de tareas completadas
- ✅ Visualización de tareas pendientes
- ✅ Mezcla de tareas completadas y pendientes

#### TodoItem.test.jsx
- ✅ Renderizado de tarea pendiente
- ✅ Renderizado de tarea completada
- ✅ Funcionalidad del checkbox
- ✅ Funcionalidad del botón eliminar
- ✅ Aplicación de clases CSS
- ✅ Visualización correcta del texto

#### FilterButtons.test.jsx
- ✅ Renderizado de los tres botones de filtro
- ✅ Estado activo por defecto
- ✅ Cambio de filtros
- ✅ Indicadores visuales de filtro activo
- ✅ Visibilidad del botón limpiar completadas
- ✅ Funcionalidad de limpiar completadas

### Métricas de Cobertura

La suite de tests alcanza una **cobertura del 98.21%**:

```
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   98.21 |    97.22 |     100 |      98 |                   
 src               |     100 |      100 |     100 |     100 |                   
  App.jsx          |     100 |      100 |     100 |     100 |                   
 src/components    |   95.45 |    91.66 |     100 |   95.45 |                   
  FilterButtons.jsx|     100 |      100 |     100 |     100 |                   
  TodoInput.jsx    |    90.9 |       50 |     100 |    90.9 |                   
  TodoItem.jsx     |     100 |      100 |     100 |     100 |                   
  TodoList.jsx     |     100 |      100 |     100 |     100 |                   
-------------------|---------|----------|---------|---------|-------------------
```

✅ **Supera el threshold de 80% requerido**

### Ejecutar Tests

```bash
# Tests en modo watch (desarrollo)
npm test

# Ejecutar todos los tests una vez
npm run test:run

# Tests con interfaz gráfica
npm run test:ui

# Tests con reporte de cobertura
npm run test:coverage
```

### Ver Reporte de Cobertura

Después de ejecutar `npm run test:coverage`, puedes ver un reporte HTML detallado:

1. Abre el archivo `coverage/index.html` en tu navegador
2. Navega por los archivos para ver líneas cubiertas y no cubiertas
3. Identifica áreas que necesitan más tests

### Configuración de Tests

Los tests están configurados en:
- **vite.config.js**: Configuración de Vitest y coverage
- **src/setupTests.js**: Setup global de tests, mocks de localStorage

### Mejores Prácticas Implementadas

- ✅ Tests independientes y aislados
- ✅ Mock de localStorage para evitar efectos secundarios
- ✅ Uso de userEvent para interacciones realistas
- ✅ Queries accesibles (getByRole, getByText, etc.)
- ✅ Tests descriptivos con nombres claros
- ✅ Organización con describe/it
- ✅ Limpieza automática entre tests
- ✅ Cobertura completa de casos de uso
- ✅ Tests de casos límite y errores

## 💡 Cómo Usar la Aplicación

### Agregar una Tarea
1. Escribe tu tarea en el campo de texto
2. Presiona el botón "➕ Agregar" o la tecla Enter
3. La tarea aparecerá en la lista

### Marcar como Completada
- Haz clic en el checkbox de la tarea
- El texto se tachará y el fondo cambiará de color
- El contador se actualizará automáticamente

### Eliminar una Tarea
- Haz clic en el botón 🗑️ al final de cada tarea
- La tarea se eliminará con una animación suave

### Filtrar Tareas
- **Todas**: Muestra todas las tareas
- **Activas**: Solo tareas pendientes
- **Completadas**: Solo tareas completadas

### Limpiar Completadas
- Haz clic en "🗑️ Limpiar completadas"
- Todas las tareas marcadas como completadas se eliminarán

## 🎨 Personalización

### Colores
Los colores se definen mediante variables CSS en `App.css`:

```css
:root {
  --primary-color: #6366f1;      /* Color principal */
  --success-color: #10b981;      /* Color de éxito */
  --danger-color: #ef4444;       /* Color de peligro */
  --text-color: #1f2937;         /* Color de texto */
  /* ... más variables */
}
```

Puedes modificar estas variables para cambiar la apariencia de toda la aplicación.

### Estilos
Cada componente tiene su propio archivo CSS para facilitar la personalización:
- `App.css`: Estilos globales y contenedor principal
- `TodoInput.css`: Estilos del input y botón agregar
- `TodoList.css`: Estilos del contenedor de lista
- `TodoItem.css`: Estilos de cada tarea individual
- `FilterButtons.css`: Estilos de los botones de filtro

## 🌐 Tecnologías Utilizadas

### Producción
- **React 18.2.0**: Biblioteca de JavaScript para construir interfaces de usuario
- **React Hooks**: useState y useEffect para gestión de estado y efectos
- **CSS3**: Variables CSS, Flexbox, Grid, Animaciones
- **localStorage**: Para persistencia de datos en el navegador
- **Create React App**: Configuración y herramientas de desarrollo

### Testing y Desarrollo
- **Vitest**: Framework de testing moderno y rápido
- **Happy DOM**: Entorno DOM ligero para tests
- **React Testing Library**: Testing de componentes con enfoque en accesibilidad
- **@testing-library/jest-dom**: Matchers personalizados para assertions
- **@testing-library/user-event**: Simulación realista de eventos de usuario
- **@vitejs/plugin-react**: Plugin de Vite para soporte de React
- **@vitest/ui**: Interfaz gráfica para visualizar tests
- **@vitest/coverage-v8**: Reportes de cobertura de código

## 📱 Compatibilidad

La aplicación es compatible con:
- ✅ Chrome (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Edge (última versión)
- ✅ Navegadores móviles (iOS Safari, Chrome Mobile)

## 🚀 Mejoras Futuras

Algunas ideas para expandir la funcionalidad:

- [ ] **Edición de tareas**: Permitir editar el texto de tareas existentes
- [ ] **Categorías**: Organizar tareas por categorías o proyectos
- [ ] **Fechas límite**: Agregar fechas de vencimiento a las tareas
- [ ] **Prioridades**: Sistema de priorización (alta, media, baja)
- [ ] **Búsqueda**: Buscar tareas por texto
- [ ] **Ordenamiento**: Ordenar por fecha, prioridad, alfabético
- [ ] **Temas**: Modo oscuro/claro
- [ ] **Backend**: Sincronización con servidor para acceso multi-dispositivo
- [ ] **Notificaciones**: Recordatorios para tareas pendientes
- [ ] **Subtareas**: Soporte para tareas anidadas
- [ ] **Estadísticas**: Gráficos de productividad
- [ ] **Exportar/Importar**: Exportar tareas a JSON/CSV

## 🐛 Solución de Problemas

### La aplicación no inicia
- Verifica que Node.js esté instalado: `node --version`
- Asegúrate de haber ejecutado `npm install`
- Elimina `node_modules` y `package-lock.json`, luego ejecuta `npm install` nuevamente

### Las tareas no se guardan
- Verifica que localStorage esté habilitado en tu navegador
- Comprueba la consola del navegador (F12) para ver errores
- Asegúrate de no estar en modo incógnito (localStorage puede estar deshabilitado)

### Errores de compilación
- Verifica que todas las dependencias estén instaladas
- Asegúrate de estar usando una versión compatible de Node.js (14+)
- Revisa la consola para mensajes de error específicos

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

## 👨‍💻 Desarrollo

### Clonar para desarrollo
```bash
git clone <url-del-repositorio>
cd todo-list-react
npm install
npm start
```

### Contribuir
Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🙏 Agradecimientos

- Create React App por la configuración base
- La comunidad de React por la documentación y recursos
- Emojis de Unicode para los iconos

---

**¡Disfruta organizando tus tareas! 🎉📝✨**

*Desarrollado con ❤️ usando React*
