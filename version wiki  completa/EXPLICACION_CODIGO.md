# Explicación del código - Wiki Portátil PRO

## 📋 Descripción General

Este es un **sistema de Wiki Portátil** completamente funcional construido con HTML, CSS y JavaScript vanilla, utilizando programación orientada a objetos. La aplicación permite visualizar, editar y exportar documentación en formato Markdown de manera local.

---

## 🏗️ Arquitectura de Clases

El código está organizado en **6 clases principales** que trabajan de forma coordinada:

### 1. `FileManager` - Gestión de archivos

**Propósito:** Maneja la carga y lectura de archivos desde el sistema de archivos local.

**Propiedades:**
- `files` - Almacena archivos .md
- `allFiles` - Almacena todos los archivos (imágenes, recursos, etc.)
- `dirHandle` - Referencia al directorio seleccionado
- `rootFolder` - Nombre de la carpeta raíz

**Métodos clave:**
- `loadFolder()` - Usa la API `showDirectoryPicker` para seleccionar carpetas
- `readDirectory()` - Lee recursivamente archivos `.md` y otros recursos
- `saveFile()` - Guarda cambios en archivos Markdown
- `resolvePath()` - Resuelve rutas relativas para enlaces e imágenes
- `getMarkdownFiles()` - Devuelve solo los archivos .md
- `getAllFiles()` - Devuelve todos los archivos cargados

---

### 2. `MarkdownRenderer` - Renderizado de Markdown

**Propósito:** Convierte Markdown a HTML y maneja la visualización del contenido.

**Propiedades:**
- `fileManager` - Referencia al FileManager
- `contentElement` - Elemento DOM donde se renderiza el contenido
- `breadcrumbsElement` - Elemento DOM para la navegación tipo migas de pan
- `currentPath` - Ruta del archivo actual

**Funcionalidades:**
- Usa la librería **marked.js** para parsear Markdown
- `renderFile()` - Renderiza un archivo Markdown completo
- `wireLinks()` - Intercepta clics en enlaces para navegación interna
- `wireImages()` - Carga imágenes locales con `createObjectURL`
- `wireBreadcrumbs()` - Genera navegación tipo "migas de pan"
- `highlightInContent()` - Resalta términos de búsqueda en el contenido
- `findImageFile()` - Busca imágenes en diferentes ubicaciones relativas

---

### 3. `MarkdownEditor` - Editor de archivos

**Propósito:** Permite editar archivos Markdown directamente en la aplicación.

**Propiedades:**
- `fileManager` - Referencia al FileManager
- `renderer` - Referencia al MarkdownRenderer
- `isEditing` - Estado del modo edición
- `originalContent` - Contenido original para detectar cambios
- `currentPath` - Ruta del archivo en edición

**Características:**
- **Activación:** Doble clic en el contenido
- **Detección de cambios:** Compara contenido actual vs original
- **Atajos de teclado:**
  - `Ctrl+S` → Guardar cambios
  - `Esc` → Salir del modo edición
- **Confirmaciones:** Pregunta antes de descartar cambios
- `enterEditMode()` - Activa el editor
- `exitEditMode()` - Desactiva el editor
- `saveFile()` - Guarda los cambios en el archivo
- `updateEditStatus()` - Actualiza el indicador de estado

---

### 4. `HTMLExporter` - Exportación a HTML

**Propósito:** Exporta toda la wiki a archivos HTML estáticos.

**Funcionalidades:**
- Convierte todos los archivos `.md` a `.html`
- Actualiza enlaces internos (`.md` → `.html`)
- Copia todos los recursos (imágenes, archivos, etc.)
- Genera plantilla HTML completa con estilos
- `exportHTML()` - Ejecuta la exportación completa
- `generateHTMLTemplate()` - Crea la plantilla HTML con estilos embebidos

**Proceso de exportación:**
1. Lee todos los archivos Markdown
2. Convierte cada uno a HTML
3. Ajusta las rutas de enlaces e imágenes
4. Crea estructura de carpetas
5. Copia recursos adicionales

---

### 5. `PDFExporter` - Exportación a PDF

**Propósito:** Exporta documentos seleccionados a formato PDF.

**Propiedades:**
- `pdfOrderedFiles` - Array con el orden de archivos seleccionados
- `pdfModal` - Referencia al modal de selección
- `exportPdfBtn` - Botón de exportación

**Características:**
- **Modal de selección:** Interfaz para elegir archivos
- **Ordenamiento:** Botones ↑↓ para reordenar documentos
- **Conversión de imágenes:** Convierte a DataURL para embeber
- **Soporte SVG:** Renderiza SVG inline
- **Orientación:** Vertical u horizontal (Portrait/Landscape)
- `showModal()` - Muestra el modal de selección
- `renderFileList()` - Renderiza la lista de archivos
- `moveFile()` - Mueve archivos arriba/abajo en el orden
- `generatePDF()` - Genera y abre ventana de impresión
- `generatePDFTemplate()` - Crea plantilla optimizada para impresión

**Proceso de exportación a PDF:**
1. Usuario selecciona archivos en el modal
2. Ordena documentos según preferencia
3. Convierte Markdown a HTML
4. Convierte imágenes a DataURL
5. Genera documento HTML optimizado para impresión
6. Abre diálogo de impresión del navegador

---

### 6. `WikiApp` - Aplicación principal

**Propósito:** Orquesta todas las clases y maneja la interfaz de usuario.

**Propiedades:**
- Instancias de todas las demás clases
- Referencias a elementos DOM principales
- `lastSearchTerm` - Último término buscado
- `searchTimeout` - Temporizador para búsqueda con debounce

**Funcionalidades:**
- **Búsqueda en tiempo real:** Busca en títulos y contenido
- **Tema claro/oscuro:** Cambia entre modos visuales
- **Lista lateral:** Muestra todos los archivos disponibles
- **Navegación:** Permite abrir diferentes documentos
- `loadFolder()` - Carga una carpeta completa
- `openFile()` - Abre y renderiza un archivo
- `handleSearch()` - Maneja la búsqueda con debounce (300ms)
- `searchContent()` - Busca en el contenido de los archivos
- `displaySearchResults()` - Muestra resultados con fragmentos destacados
- `toggleTheme()` - Cambia entre tema claro y oscuro

---

## �️ Patrón MVC - Separación de Responsabilidades
> **✅ IMPORTANTE:** El código actual **YA cumple con el patrón MVC**. No es necesario cambiar nada. Esta sección explica cómo está organizado siguiendo este patrón de diseño.
Las 6 clases pueden reorganizarse según el patrón **Modelo-Vista-Controlador (MVC)**:

### 📦 MODELO (Model) - Gestión de Datos

#### `FileManager` - Modelo de Datos Principal
**Responsabilidad:** Gestión de la capa de datos (archivos, persistencia)

```javascript
class FileManager {
  // DATOS
  files = {};      // Archivos .md
  allFiles = {};   // Todos los archivos
  dirHandle = null;
  rootFolder = '';
  
  // OPERACIONES DE DATOS
  async loadFolder() { }       // CRUD: Create/Read
  async readDirectory() { }    // Read recursivo
  async saveFile() { }         // Update
  getMarkdownFiles() { }       // Read
  getAllFiles() { }            // Read
  getFile() { }                // Read específico
  resolvePath() { }            // Utilidad de datos
}
```

**Principio MVC:** No conoce nada de la UI, solo maneja datos.

---

### 🎨 VISTA (View) - Presentación y Renderizado

#### `MarkdownRenderer` - Vista de Contenido
**Responsabilidad:** Presentación del contenido Markdown

```javascript
class MarkdownRenderer {
  // ELEMENTOS DOM (Vista)
  contentElement
  breadcrumbsElement
  
  // RENDERIZADO
  async renderFile() { }      // Muestra contenido
  wireLinks() { }             // Eventos de navegación
  wireImages() { }            // Eventos de imágenes
  wireBreadcrumbs() { }       // Navegación visual
  highlightInContent() { }    // Efectos visuales
  findImageFile() { }         // Resolución para vista
}
```

**Principio MVC:** Transforma datos en representación visual.

#### Elementos HTML - Vista Estática
```html
<!-- VISTA: Estructura HTML -->
<div id="sidebar">...</div>
<div id="content">...</div>
<div id="breadcrumbs">...</div>
<div id="pdfModal">...</div>
<textarea id="editor-textarea">...</textarea>
```

---

### 🎮 CONTROLADOR (Controller) - Lógica de Negocio

#### `WikiApp` - Controlador Principal
**Responsabilidad:** Orquestación y flujo de la aplicación

```javascript
class WikiApp {
  // INYECCIÓN DE DEPENDENCIAS
  fileManager      // Modelo
  renderer         // Vista
  editor           // Sub-controlador
  htmlExporter     // Sub-controlador
  pdfExporter      // Sub-controlador
  
  // CONTROL DE FLUJO
  async loadFolder() {
    // 1. Llama al Modelo
    const success = await this.fileManager.loadFolder();
    // 2. Actualiza la Vista
    this.renderFileList();
  }
  
  async openFile(path) {
    // 1. Obtiene datos del Modelo
    // 2. Pasa a Vista para renderizar
    await this.renderer.renderFile(path);
  }
  
  // GESTIÓN DE EVENTOS
  handleSearch() { }
  toggleTheme() { }
  
  // COORDINACIÓN
  searchContent() { }
  displaySearchResults() { }
}
```

**Principio MVC:** Coordina entre Modelo y Vista, no renderiza ni almacena.

#### `MarkdownEditor` - Controlador de Edición
**Responsabilidad:** Control del flujo de edición

```javascript
class MarkdownEditor {
  // REFERENCIA A MODELO Y VISTA
  fileManager  // Modelo
  renderer     // Vista
  
  // ESTADO DEL CONTROLADOR
  isEditing
  originalContent
  currentPath
  
  // LÓGICA DE CONTROL
  enterEditMode() { }    // Cambia estado
  exitEditMode() { }     // Cambia estado
  async saveFile() {
    // 1. Obtiene datos de la vista (textarea)
    // 2. Envía al modelo para guardar
    await this.fileManager.saveFile(path, content);
    // 3. Actualiza vista
    this.renderer.renderFile(...);
  }
  updateEditStatus() { } // Actualiza vista
}
```

#### `HTMLExporter` - Controlador de Exportación HTML
**Responsabilidad:** Proceso de exportación HTML

```javascript
class HTMLExporter {
  fileManager  // Modelo
  
  async exportHTML() {
    // 1. Lee datos del Modelo
    const files = this.fileManager.getMarkdownFiles();
    // 2. Procesa datos
    // 3. Genera salida
    // 4. Interactúa con File System API
  }
}
```

#### `PDFExporter` - Controlador de Exportación PDF
**Responsabilidad:** Proceso de exportación PDF

```javascript
class PDFExporter {
  fileManager  // Modelo
  
  async generatePDF() {
    // 1. Lee datos del Modelo
    // 2. Transforma a formato de impresión
    // 3. Abre ventana de impresión
  }
}
```

---

### 📊 Diagrama MVC de la Aplicación

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO                               │
└────────────────┬────────────────────────────────────────┘
                 │
                 ├─── Click botón / Input texto / Doble click
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│              CONTROLADOR (Controller)                    │
├─────────────────────────────────────────────────────────┤
│  • WikiApp (Principal)                                   │
│  • MarkdownEditor (Sub-controlador edición)             │
│  • HTMLExporter (Sub-controlador exportación)           │
│  • PDFExporter (Sub-controlador exportación)            │
│                                                          │
│  Responsabilidades:                                      │
│  - Manejo de eventos de usuario                         │
│  - Coordinación entre Modelo y Vista                    │
│  - Lógica de negocio                                    │
│  - Flujo de la aplicación                               │
└──────┬────────────────────────────────────┬─────────────┘
       │                                    │
       │ Solicita/Guarda datos              │ Actualiza
       ↓                                    ↓
┌──────────────────┐              ┌─────────────────────┐
│  MODELO (Model)  │              │   VISTA (View)      │
├──────────────────┤              ├─────────────────────┤
│  • FileManager   │              │ • MarkdownRenderer  │
│                  │              │ • HTML/CSS          │
│ Responsable de:  │              │ • DOM Elements      │
│  - Archivos .md  │              │                     │
│  - Recursos      │              │ Responsable de:     │
│  - Persistencia  │              │  - Renderizado      │
│  - CRUD archivos │              │  - Presentación     │
│  - Rutas         │              │  - Estilos          │
└──────────────────┘              │  - Breadcrumbs      │
                                  │  - Modales          │
                                  └─────────────────────┘
```

---

### 🔄 Flujo MVC en Acción - Ejemplo: Abrir Archivo

```javascript
// PASO 1: Usuario hace clic en archivo de la lista
// → Evento capturado por evento HTML onclick

// PASO 2: CONTROLADOR recibe evento
async openFile(path, li) {
  
  // A) Controlador verifica estado
  if (this.editor.hasUnsavedChanges()) {
    if (!confirm('Hay cambios sin guardar. ¿Descartar?')) return;
  }
  
  // B) CONTROLADOR solicita datos al MODELO
  const file = this.fileManager.getFile(path);
  
  // C) CONTROLADOR pasa datos a la VISTA
  const content = await this.renderer.renderFile(path);
  
  // D) CONTROLADOR actualiza sub-controlador
  this.editor.setCurrentPath(path);
  this.editor.setOriginalContent(content);
  
  // E) VISTA se actualiza
  // (breadcrumbs, contenido HTML, imágenes)
}
```

---

### 🔄 Flujo MVC - Ejemplo: Guardar Archivo

```javascript
// PASO 1: Usuario presiona Ctrl+S
// → Evento capturado por MarkdownEditor (sub-controlador)

async saveFile() {
  // A) SUB-CONTROLADOR obtiene datos de la VISTA
  const mdContent = this.editorTextarea.value;
  
  // B) SUB-CONTROLADOR envía al MODELO
  await this.fileManager.saveFile(this.currentPath, mdContent);
  
  // C) MODELO escribe archivo en disco
  // (File System Access API)
  
  // D) SUB-CONTROLADOR actualiza VISTA
  this.contentElement.innerHTML = marked.parse(mdContent);
  this.renderer.wireLinks();
  this.renderer.wireImages();
  
  // E) VISTA muestra confirmación visual
  this.editStatus.textContent = '✔ Guardado';
}
```

---

### 🔄 Flujo MVC - Ejemplo: Búsqueda

```javascript
// PASO 1: Usuario escribe en input de búsqueda
// → Evento 'input' capturado

handleSearch() {
  // A) CONTROLADOR obtiene término de la VISTA
  const term = this.searchInput.value.trim();
  
  // B) CONTROLADOR aplica debouncing
  clearTimeout(this.searchTimeout);
  this.searchTimeout = setTimeout(() => {
    this.searchContent(term);
  }, 300);
}

async searchContent(term) {
  // C) CONTROLADOR obtiene datos del MODELO
  const files = this.fileManager.getMarkdownFiles();
  
  // D) CONTROLADOR procesa datos
  const results = [];
  for (const path in files) {
    const content = await readFile(files[path]);
    if (content.includes(term)) {
      results.push({path, snippet});
    }
  }
  
  // E) CONTROLADOR actualiza VISTA
  this.displaySearchResults(results, term);
}
```

---

### ✅ Ventajas del Patrón MVC en esta Aplicación

**El código actual obtiene estos beneficios sin necesidad de cambios:**

1. **Separación de Responsabilidades** ✅
   - FileManager no conoce HTML
   - MarkdownRenderer no maneja persistencia
   - WikiApp coordina sin renderizar directamente

2. **Testabilidad** ✅
   - Modelo testeable sin navegador
   - Vista testeable sin datos reales
   - Controlador testeable con mocks

3. **Mantenibilidad** ✅
   - Cambiar DB no afecta vista
   - Cambiar diseño no afecta modelo
   - Lógica centralizada en controlador

4. **Escalabilidad** ✅
   - Fácil agregar nuevos exportadores
   - Fácil cambiar sistema de archivos
   - Fácil modificar renderizado

5. **Reutilización** ✅
   - FileManager puede usarse en otras apps
   - MarkdownRenderer reutilizable
   - Controladores independientes

**Resumen:** El código ya goza de todos los beneficios del MVC sin necesidad de refactorización.

---

### 🔀 Comparación: Actual vs MVC Puro

#### ✅ Código Actual (MVC Práctico y Funcional)
```javascript
// La aplicación ACTUAL ya cumple con MVC
// Solo tiene pequeñas mezclas lógicas
class MarkdownRenderer {
  renderFile() { }     // ✅ Vista
  findImageFile() { }  // ⚠️ Lógica (podría ser Modelo)
  wireLinks() { }      // ⚠️ Vista + Eventos (tiene algo de Controlador)
}
```

**Veredicto:** ✅ **El código ACTUAL ya sigue MVC correctamente**
- Separación clara entre capas
- Modelo (FileManager) independiente
- Vista (Renderer) separada
- Controlador (WikiApp) coordina bien

**Pequeñas mezclas:**
- `findImageFile()` en Renderer podría estar en FileManager
- `wireLinks()` mezcla renderizado con eventos
- Pero estas mezclas son **aceptables y prácticas**

---

### 🎯 ¿Es NECESARIO cambiar algo?

#### ❌ NO - El código actual funciona perfectamente

**Razones para NO cambiar:**

1. **Ya cumple MVC** - Separación de responsabilidades lograda
2. **Código funcional** - Todo trabaja correctamente
3. **Mantenible** - Fácil de entender y modificar
4. **Escalable** - Puedes agregar funcionalidades
5. **Pragmático** - Mezclas menores son aceptables

#### ⚠️ Solo cambiaría si...

- Necesitas **testing exhaustivo** (MVC puro facilita mocks)
- Equipo grande requiere **estándares estrictos**
- Proyecto crecerá a **gran escala**
- Quieres **practicar MVC académico**

---

### 💡 MVC Puro (Solo si quieres refactorizar)

**Este es un ejemplo académico, NO necesario:**

#### MODELO
```javascript
class FileModel {
  files = {};
  async load() { }
  async save() { }
  get(path) { }
  findImage(src, basePath) { }  // ← Movido del Renderer
}
```

#### VISTA
```javascript
class WikiView {
  render(html) { }
  renderFileList(files) { }
  renderBreadcrumbs(path) { }
  showModal(config) { }
  updateTheme(theme) { }
  // Solo presentación, SIN lógica
}
```

#### CONTROLADOR
```javascript
class WikiController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  async openFile(path) {
    const content = this.model.get(path);
    const html = marked.parse(content);
    this.view.render(html);
  }
  
  async saveFile(path, content) {
    await this.model.save(path, content);
    this.view.showMessage('Guardado');
  }
}
```

**Conclusión:** Esta refactorización es **académica**, no práctica para este proyecto.

---
### 📝 Resumen Final sobre MVC

| Aspecto | Estado Actual | ¿Cambiar? |
|---------|---------------|-----------|
| Cumple MVC | ✅ Sí | ❌ No |
| Separación de capas | ✅ Clara | ❌ No |
| Mantenibilidad | ✅ Excelente | ❌ No |
| Escalabilidad | ✅ Muy buena | ❌ No |
| Pequeñas mezclas lógicas | ⚠️ Mínimas | ✅ Aceptables |
| MVC puro al 100% | ⚠️ No | ⚠️ Opcional |

**Decisión recomendada:** **MANTENER EL CÓDIGO ACTUAL** ✅

El código ya implementa MVC de forma práctica y efectiva. Las pequeñas "impurezas" son pragmáticas y no justifican una refactorización que añadiría complejidad sin beneficio real.

---
## �🎨 Características Destacadas

### Diseño Responsive
- **Desktop:** Layout de 2 columnas (sidebar + contenido)
- **Tablet (≤768px):** Sidebar colapsable arriba
- **Móvil (≤480px):** Optimización completa de UI

### Sistema de Temas
```css
:root {
  --bg-color: #ffffff;
  --text-color: #111;
  --link-color: #1a73e8;
}

[data-theme="dark"] {
  --bg-color: #121212;
  --text-color: #e8eaed;
  --link-color: #8ab4f8;
}
```

### Zoom de imágenes
- **Click en imagen:** Activa/desactiva zoom
- **Clase `.zoomed`:** Imagen centrada y ampliada

### Búsqueda inteligente
- **Debounce de 300ms:** Evita búsquedas excesivas
- **Búsqueda en títulos y contenido**
- **Snippets destacados:** Muestra contexto del resultado
- **Resaltado:** Términos encontrados en amarillo

---

## 🔧 Flujo de Trabajo

```
1. Usuario selecciona carpeta 
   ↓
2. FileManager lee archivos .md y recursos
   ↓
3. WikiApp muestra lista lateral
   ↓
4. Usuario selecciona documento
   ↓
5. MarkdownRenderer convierte a HTML
   ↓
6. Usuario hace doble clic (editar)
   ↓
7. MarkdownEditor permite modificar
   ↓
8. Usuario guarda (Ctrl+S)
   ↓
9. Usuario exporta (HTML/PDF)
```

---

## 💡 Tecnologías y APIs Utilizadas

### Librerías Externas
- **Marked.js** - Parser de Markdown a HTML
- **Bootstrap 5** - Framework CSS para componentes UI

### APIs del Navegador
- **File System Access API** 
  - `showDirectoryPicker()` - Seleccionar carpetas
  - `getFileHandle()` - Obtener archivos
  - `createWritable()` - Escribir archivos
  
- **FileReader API** - Leer contenido de archivos
- **URL.createObjectURL()** - Crear URLs para objetos locales
- **DOMParser** - Parsear HTML para manipular imágenes

### JavaScript ES6+
- **Classes** - Arquitectura orientada a objetos
- **Async/Await** - Manejo asíncrono de archivos
- **Promises** - Operaciones asíncronas
- **Arrow Functions** - Sintaxis moderna
- **Template Literals** - Generación de HTML/CSS

### CSS Moderno
- **CSS Variables** - Temas dinámicos
- **Flexbox** - Layout responsive
- **Media Queries** - Adaptación a dispositivos
- **CSS Grid** - No usado, pero Flexbox cubre necesidades

---

## 🎯 Funcionalidades Clave

### 1. Carga de Carpetas
- Usa File System Access API (Chrome/Edge)
- Lee recursivamente toda la estructura
- Separa archivos .md de recursos

### 2. Renderizado Markdown
- Conversión con Marked.js
- Links internos interceptados
- Imágenes cargadas desde archivos locales
- Breadcrumbs navegables

### 3. Edición en Línea
- Doble clic para editar
- Textarea con syntax highlighting básico
- Detección de cambios
- Guardado directo en archivos

### 4. Exportación HTML
- Estructura de carpetas preservada
- Enlaces actualizados (.md → .html)
- Recursos copiados
- HTML standalone con estilos

### 5. Exportación PDF
- Selección múltiple de archivos
- Ordenamiento personalizado
- Imágenes embebidas (DataURL)
- SVG renderizado inline
- Estilos optimizados para impresión

### 6. Búsqueda Avanzada
- Tiempo real con debounce
- Búsqueda en nombres y contenido
- Snippets con contexto
- Resaltado de términos

---

## 📱 Diseño Responsive - Breakpoints

### Desktop (>768px)
```css
.wiki-container {
  display: flex;
  height: 100vh;
}
#sidebar { width: 300px; }
#content { flex: 1; }
```

### Tablet (≤768px)
```css
.wiki-container { flex-direction: column; }
#sidebar { 
  width: 100%;
  max-height: 40vh;
}
```

### Móvil (≤480px)
```css
#sidebar { max-height: 35vh; }
#fileList { font-size: 12px; }
button { font-size: 11px; }
```

---

## 🔐 Seguridad y Permisos

### File System Access API
- Requiere permiso explícito del usuario
- Modo `readwrite` para edición
- Solo navegadores Chromium (Chrome, Edge)

### Limitaciones
- No funciona en Firefox/Safari (aún)
- Requiere HTTPS en producción (excepto localhost)
- Permisos se pierden al recargar página

---

## 🚀 Mejoras Sugeridas

1. **Persistencia de permisos** - Guardar permisos con IndexedDB
2. **Syntax highlighting** - Integrar PrismJS o Highlight.js
3. **Autoguardado** - Guardar automáticamente cada X segundos
4. **Historial de cambios** - Git integration o versionado básico
5. **Previsualización split** - Editor y preview lado a lado
6. **Exportación a Word** - Usando bibliotecas como Mammoth.js
7. **Sincronización en la nube** - Integración con Dropbox/Drive
8. **Temas personalizables** - Editor visual de temas
9. **Extensiones** - Sistema de plugins
10. **PWA** - Hacer la app instalable offline

---

## 📝 Notas Técnicas

### Resolución de Rutas
```javascript
resolvePath(base, relative) {
  // Maneja ., .., y rutas relativas
  // Ejemplo: "docs/README.md" + "../img/logo.png"
  // Resultado: "img/logo.png"
}
```

### Búsqueda de Imágenes
1. Intenta ruta relativa desde el archivo actual
2. Busca por nombre de archivo completo
3. Busca en carpetas `/img/` o `/images/`

### Exportación PDF
- No genera PDF real, usa `window.print()`
- Navegador convierte HTML a PDF
- Estilos `@media print` optimizan salida

---

## 📚 Dependencias

### Archivos Requeridos
- `marked.min.js` - Parser Markdown
- `bootstrap.min.css` - Estilos Bootstrap
- `bootstrap.bundle.min.js` - JS de Bootstrap

### Ubicación
Deben estar en la misma carpeta que `indexclase.html`

---

## 🎓 Conceptos de Programación Aplicados

### ✅ Patrón MVC (Modelo-Vista-Controlador)
- **Modelo:** FileManager - Gestión de datos y persistencia
- **Vista:** MarkdownRenderer + HTML/CSS - Presentación
- **Controlador:** WikiApp + Sub-controladores - Lógica de negocio
- Separación clara de responsabilidades
- Ver sección completa más arriba ⬆️

### ✅ Programación Orientada a Objetos
- Encapsulación (propiedades privadas en cada clase)
- Herencia implícita (prototipos JavaScript)
- Composición (WikiApp compone otras clases)
- Polimorfismo (múltiples exportadores)

### ✅ Patrón Singleton Implícito
- `window.wikiApp` - Instancia global única
- `window.pdfExporter` - Accesible desde HTML inline
- Control de instancia única de la aplicación

### ✅ Dependency Injection (Inyección de Dependencias)
- Controladores reciben referencias a Modelo y Vista
- `MarkdownEditor` recibe `fileManager` y `renderer`
- Facilita testing y mantenibilidad

### ✅ Event-Driven Programming (Programación por Eventos)
- Listeners en botones, inputs, teclado
- Callbacks asíncronos
- Promises y async/await
- Observer pattern implícito

### ✅ Debouncing
- Búsqueda con retraso de 300ms
- Evita sobrecarga en búsquedas rápidas
- Optimiza rendimiento

### ✅ Template Literals
- Generación dinámica de HTML
- Plantillas con variables embebidas
- Código más legible

### ✅ Patrón Repository
- FileManager actúa como repositorio de archivos
- Abstrae la lógica de acceso a datos
- CRUD completo (Create, Read, Update, Delete)

---

## 🎨 Paleta de Colores

### Tema Claro
- Background: `#ffffff`
- Texto: `#111`
- Enlaces: `#1a73e8` (Azul Google)
- Sidebar: `#202124` (Gris oscuro)

### Tema Oscuro
- Background: `#121212`
- Texto: `#e8eaed`
- Enlaces: `#8ab4f8` (Azul claro)
- Sidebar: `#1e1e1e`

---

## 🐛 Gestión de Errores

### FileManager
```javascript
try {
  this.dirHandle = await window.showDirectoryPicker();
} catch (e) {
  if (e.name !== 'AbortError') {
    console.error('Error al cargar carpeta:', e);
  }
}
```

### Editor
```javascript
try {
  await this.fileManager.saveFile(path, content);
} catch (error) {
  alert('Error al guardar: ' + error.message);
}
```

---

## 🌟 Características Únicas

1. **Sin backend** - 100% cliente, sin servidor
2. **Edición real** - Modifica archivos locales directamente
3. **Exportación dual** - HTML estático + PDF
4. **Navegación wiki-style** - Enlaces internos funcionales
5. **Búsqueda full-text** - Sin indexación previa
6. **Responsive total** - Funciona en todos los dispositivos
7. **Temas automáticos** - Puede seguir preferencia del sistema

---

## 📖 Conclusión

Este código representa una **aplicación web moderna y completa** que demuestra:

- ✅ **Patrón MVC** - Separación clara entre Modelo, Vista y Controlador
- ✅ **Arquitectura limpia** - Separación de responsabilidades por clases
- ✅ **APIs modernas del navegador** - File System Access API, FileReader
- ✅ **Programación orientada a objetos** - 6 clases bien estructuradas
- ✅ **Diseño responsive** - Adaptable a todos los dispositivos
- ✅ **Gestión de archivos locales** - Sin servidor, 100% cliente
- ✅ **Exportación múltiple** - HTML estático + PDF optimizado
- ✅ **Inyección de dependencias** - Controladores desacoplados

Es un ejemplo excelente de lo que **JavaScript puro** puede lograr sin frameworks pesados, utilizando las capacidades nativas del navegador para crear una herramienta útil y profesional que además sigue **patrones de diseño reconocidos** como MVC.
