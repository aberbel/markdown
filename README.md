# Wiki Portátil PRO

Una aplicación web moderna y completa para gestionar wikis locales con capacidades avanzadas de visualización, edición y exportación.

## 🎯 Características Principales

### 📂 Gestión de Carpetas
- Carga carpetas completas de markdown directamente desde tu sistema de archivos
- Navega por la estructura de directorios automáticamente
- Soporte para subcarpetas ilimitadas

### ✏️ Editor Integrado
- Editor de texto en tiempo real
- Visualización en vivo de markdown renderizado
- Edición lado a lado (Editor/Visualización)
- Detect automático de cambios sin guardar

### 📄 Formatos Soportados
- **Markdown (.md)**: Renderizado completo con todas las características
- **Imágenes**: PNG, JPG, SVG (incrustadas en el contenido)
- **Tablas**: Soporte completo
- **Código**: Bloques de código con formateo
- **Links**: Enlaces internos y externos

### 🖼️ Manejo de Imágenes
- **SVG**: Se incrustan como elementos vectoriales de verdad (editable)
- **PNG/JPG**: Se convierten a Data URIs para portabilidad
- **Búsqueda inteligente**: Encuentra imágenes en carpetas `img/`, `images/`, o rutas relativas
- **Responsivo**: Las imágenes se adaptan automáticamente al ancho de pantalla
- **Zoom**: Haz clic en cualquier imagen para ampliarla

### 🔍 Búsqueda y Filtrado
- Búsqueda en tiempo real por nombre de archivo y contenido
- Filtrado de resultados instantáneo
- Resaltado de términos encontrados en el contenidofile:///C:/Users/Casa/Desktop/html/markdown/version%20wiki%20%20completa/indexcompleto.html

### 🌓 Tema Oscuro/Claro
- Cambia entre modo claro y modo oscuro
- Preferencias guardadas localmente
- Perfectamente optimizado para lecturas largas en ambos temas

### 💾 Exportación

#### HTML Exportable
- Exporta documentos completos a HTML estándar
- Incluye todas las imágenes incrustadas (PNG/JPG como data URIs, SVG inline)
- Una carpeta seleccionada = un HTML completo
- Perfectamente formateado y listo para compartir

#### PDF Imprimible
- Exporte uno o varios documentos a PDF
- Orientación configurable (Vertical/Horizontal)
- Encabezados y numeración de páginas automáticos
- Imágenes completamente incluidas
- Tablas con saltos de página automáticos
- Estilos optimizados para impresión

### 📋 Migas de Pan
- Navegación jerárquica visual
- Salta fácilmente entre documentos en la misma rama

### 📱 Interfaz Responsive
- Diseño adaptable a diferentes tamaños de pantalla
- Barra lateral colapsable en dispositivos pequeños
- Óptimo para escritorio, tablet y móvil

## 🚀 Cómo Usar

### Primer Inicio
1. Abre `indexcompleto.html` en tu navegador web
2. Haz clic en **"📁 Seleccionar Carpeta"**
3. Selecciona tu carpeta con archivos markdown
4. ¡Listo! Tu wiki está cargada

### Visualizar Documentos
- Haz clic en cualquier documento en la lista izquierda
- El contenido se renderiza automáticamente
- Usa la barra de búsqueda para encontrar documentos rápidamente

### Editar Documentos
- Haz clic en el botón **"✏️ Editar"** o presiona `Ctrl+E`
- Edita el markdown en el panel izquierdo
- La visualización se actualiza en tiempo real
- Guarda con **"💾 Guardar"** o presiona `Ctrl+S`

### Exportar a HTML
1. Haz clic en **"💾 HTML"**
2. Se abre una nueva ventana con el contenido renderizado
3. Guarda con `Ctrl+P` → Guardar como PDF/Papel
4. O simplemente guarda el HTML directamente

### Exportar a PDF
1. Haz clic en **"🧾 PDF"**
2. Aparece un diálogo para seleccionar documentos
3. Elige uno o varios documentos
4. Selecciona orientación (Vertical/Horizontal)
5. Se abre una ventana de impresión
6. Imprime a PDF (Ctrl+P → Guardar como PDF)

## 📦 Estructura de Carpetas Recomendada

```
tu-wiki/
├── README.md           # Documento principal
├── guia/
│   ├── README.md
│   ├── capitulo1.md
│   └── img/           # Imágenes de la guía
│       ├── imagen1.png
│       └── diagrama.svg
├── referencia/
│   ├── api.md
│   └── img/
│       └── arquitectura.png
└── img/               # Imágenes compartidas
    └── logo.svg
```

## 🎨 Personalización

### Temas
- Usa el botón **🌙/☀️** en la esquina superior para alternar temas
- Tu preferencia se guarda automáticamente

### Estilos CSS
Todos los estilos están en las etiquetas `<style>` del archivo `indexcompleto.html`. Puedes personalizarlos:

- **Colores primarios**: Variable CSS `--link-color`
- **Colores de fondo**: Variable CSS `--bg-color`
- **Tipografía**: Edita las propiedades `font-family`

## 🔧 Requisitos Técnicos

### Navegadores Soportados
- ✅ Chrome/Chromium (v99+)
- ✅ Edge (v99+)
- ✅ Firefox (v97+)
- ✅ Safari (v15+)

### Permisos Necesarios
- Acceso de lectura/escritura a carpetas locales
- Los navegadores modernos solicitarán permisos la primera vez

### Sin Dependencias Externas
- El programa es completamente autónomo
- No requiere instalación de Node.js, Python o herramientas externas
- Solo necesitas un navegador web moderno

## 📝 Características de Markdown Soportadas

```markdown
# Encabezados (H1-H6)

**Negrita** e *itálica*

[Enlaces](https://ejemplo.com)

![Imágenes](./img/ejemplo.png)

- Listas
- Sin orden

1. Listas
2. Ordenadas

> Citas en bloque

`Código inline`

\`\`\`javascript
// Bloques de código
const x = 42;
\`\`\`

| Tabla | Header |
|-------|--------|
| Fila  | Datos  |
```

## 🐛 Solución de Problemas

### Las imágenes no aparecen
1. Asegúrate de que la ruta es correcta (relativa al archivo markdown)
2. Abre la consola del navegador (F12) y busca mensajes de error
3. Los archivos de imagen deben estar en la carpeta cargada

### El documento no guarda
1. Asegúrate de haber seleccionado la carpeta correctamente
2. El navegador debe tener permisos de escritura
3. La carpeta seleccionada debe ser accesible

### El PDF está vacío
1. Asegúrate de seleccionar al menos un documento
2. El documento debe tener contenido markdown
3. Si hay imágenes, pueden tardar en cargar

### Problemas deRendimiento
- Con wikis muy grandes (>100 documentos), la búsqueda puede ser lenta
- Intenta dividir el contenido en carpetas más pequeñas

## 💡 Consejos de Uso

1. **Estructura clara**: Usa carpetas para organizar documentos por tema
2. **README.md**: Siempre incluye un README.md como punto de entrada
3. **Convención de nombres**: Usa nombres significativos para los archivos
4. **Rutas relativas**: Usa `./img/imagen.png` para referencias locales
5. **Backups**: Mantén copias de seguridad de tu carpeta wiki

## 📄 Licencia

Proyecto personal de código abierto. Úsalo libremente para tus wikis personales.

## 🤝 Contribuciones

¿Encontraste un bug? ¿Tienes una sugerencia? Siéntete libre de mejorar el código.

## 📞 Soporte

Para problemas o preguntas:
1. Revisa la consola del navegador (F12)
2. Intenta cargar la carpeta nuevamente
3. Asegúrate de que el navegador está actualizado

---

**¡Disfruta creando y compartiendo tu wiki! 📚✨**
