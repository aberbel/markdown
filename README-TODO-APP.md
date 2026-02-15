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
cd markdown
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
markdown/
├── public/
│   └── index.html              # HTML base de la aplicación
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── TodoInput.js        # Componente input para nuevas tareas
│   │   ├── TodoInput.css       # Estilos del input
│   │   ├── TodoList.js         # Componente contenedor de la lista
│   │   ├── TodoList.css        # Estilos de la lista
│   │   ├── TodoItem.js         # Componente de tarea individual
│   │   ├── TodoItem.css        # Estilos de cada tarea
│   │   ├── FilterButtons.js    # Componente de botones de filtro
│   │   └── FilterButtons.css   # Estilos de los filtros
│   ├── App.js                  # Componente principal con lógica de estado
│   ├── App.css                 # Estilos globales de la aplicación
│   └── index.js                # Punto de entrada de React
├── package.json                # Dependencias y scripts del proyecto
├── .gitignore                  # Archivos ignorados por Git
└── README.md                   # Este archivo
```

### 📝 Descripción de Componentes

#### `App.js` - Componente Principal
El cerebro de la aplicación que gestiona:
- Estado global de las tareas (`todos`)
- Estado del filtro actual (`filter`)
- Funciones para agregar, completar y eliminar tareas
- Persistencia en localStorage
- Contadores de tareas

#### `TodoInput.js` - Input de Nuevas Tareas
- Campo de texto para escribir nuevas tareas
- Validación para evitar tareas vacías
- Botón para agregar tareas
- Soporte para tecla Enter

#### `TodoList.js` - Contenedor de Lista
- Renderiza la lista completa de tareas
- Mapea cada tarea a un componente `TodoItem`
- Gestiona las animaciones de entrada

#### `TodoItem.js` - Tarea Individual
- Checkbox personalizado para marcar como completada
- Texto de la tarea con estilo tachado si está completada
- Botón de eliminar con icono
- Animaciones de hover y estado

#### `FilterButtons.js` - Botones de Filtrado
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
Lanza el corredor de pruebas en modo interactivo.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.
Optimiza React para el mejor rendimiento.

La compilación está minificada y los nombres de archivo incluyen hashes.
¡Tu aplicación está lista para ser desplegada!

### `npm run eject`
**Nota: esta es una operación unidireccional. ¡Una vez que hagas `eject`, no podrás volver atrás!**

Si no estás satisfecho con las opciones de configuración, puedes hacer `eject` en cualquier momento.

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

- **React 18.2.0**: Biblioteca de JavaScript para construir interfaces de usuario
- **React Hooks**: useState y useEffect para gestión de estado y efectos
- **CSS3**: Variables CSS, Flexbox, Grid, Animaciones
- **localStorage**: Para persistencia de datos en el navegador
- **Create React App**: Configuración y herramientas de desarrollo

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
cd markdown
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
