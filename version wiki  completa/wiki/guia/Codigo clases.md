# Código de clases

<pre>
   // ============================================
    // CLASE: WikiApp - Aplicación principal
    // ============================================
    class WikiApp {
      constructor() {
        this.fileManager = new FileManager();
        this.renderer = new MarkdownRenderer(this.fileManager);
        this.editor = new MarkdownEditor(this.fileManager, this.renderer);
        this.htmlExporter = new HTMLExporter(this.fileManager);
        this.pdfExporter = new PDFExporter(this.fileManager);
        
        this.fileListElement = document.getElementById('fileList');
        this.searchInput = document.getElementById('search');
        this.folderBtn = document.getElementById('folderBtn');
        this.toggleThemeBtn = document.getElementById('toggleTheme');
        this.breadcrumbsElement = document.getElementById('breadcrumbs');
        this.contentElement = document.getElementById('content');
        
        this.lastSearchTerm = '';
        this.searchTimeout = null;

        this.initEventListeners();
      }

      initEventListeners() {
        this.folderBtn.addEventListener('click', () => this.loadFolder());
        this.toggleThemeBtn.addEventListener('click', () => this.toggleTheme());
        this.searchInput.addEventListener('input', () => this.handleSearch());
      }

      toggleTheme() {
        const theme = document.body.getAttribute('data-theme');
        document.body.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
        this.toggleThemeBtn.textContent = theme === 'light' ? '☀️' : '🌙';
      }

      async loadFolder() {
        const success = await this.fileManager.loadFolder();
        
        if (success) {
          this.fileListElement.innerHTML = '';
          this.searchInput.value = '';
          this.contentElement.innerHTML = '<p>Cargando archivos…</p>';
          this.breadcrumbsElement.textContent = '';

          const files = this.fileManager.getMarkdownFiles();
          
          for (const path in files) {
            const li = document.createElement('li');
            li.textContent = path;
            li.onclick = () => this.openFile(path, li);
            this.fileListElement.appendChild(li);
          }

          const readme = Object.keys(files).find(p => p.endsWith('README.md'));
          if (readme) {
            this.openFile(readme);
          } else {
            this.contentElement.innerHTML = '<p>Selecciona un documento de la lista</p>';
          }
        }
      }

      async openFile(path, li = null) {
        if (this.editor.hasUnsavedChanges()) {
          if (!confirm('Hay cambios sin guardar. ¿Descartar?')) {
            return;
          }
        }

        document.querySelectorAll('#fileList li').forEach(el => el.classList.remove('active'));
        if (li) li.classList.add('active');

        const content = await this.renderer.renderFile(path);
        
        if (content) {
          this.editor.setCurrentPath(path);
          this.editor.setOriginalContent(content);
          this.editor.exitEditMode();
          
          if (this.lastSearchTerm) {
            this.renderer.highlightInContent(this.lastSearchTerm);
          }
        }
      }

      handleSearch() {
        clearTimeout(this.searchTimeout);
        const term = this.searchInput.value.trim();
        
        if (!term) {
          this.fileListElement.innerHTML = '';
          const files = this.fileManager.getMarkdownFiles();
          for (const path in files) {
            const li = document.createElement('li');
            li.textContent = path;
            li.onclick = () => this.openFile(path, li);
            this.fileListElement.appendChild(li);
          }
          return;
        }

        this.searchTimeout = setTimeout(() => {
          this.searchContent(term);
        }, 300);
      }

      async searchContent(term) {
        const termLower = term.toLowerCase();
        const results = [];
        const files = this.fileManager.getMarkdownFiles();
        
        for (const path in files) {
          const file = files[path];
          const content = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsText(file);
          });
          
          const contentLower = content.toLowerCase();
          const fileName = path;
          
          if (fileName.toLowerCase().includes(termLower) || contentLower.includes(termLower)) {
            const index = contentLower.indexOf(termLower);
            let snippet = '';
            
            if (index !== -1) {
              const start = Math.max(0, index - 40);
              const end = Math.min(content.length, index + termLower.length + 40);
              snippet = '...' + content.substring(start, end).replace(/\n/g, ' ') + '...';
            }
            
            results.push({ path, fileName, snippet });
          }
        }
        
        this.displaySearchResults(results, termLower);
      }

      displaySearchResults(results, term) {
        this.fileListElement.innerHTML = '';
        this.lastSearchTerm = term;
        
        if (results.length === 0) {
          this.fileListElement.innerHTML = '<li style="color: #888; cursor: default;">No se encontraron resultados</li>';
          return;
        }
        
        results.forEach(({ path, fileName, snippet }) => {
          const li = document.createElement('li');
          const highlightedFileName = this.highlightText(fileName, term);
          li.innerHTML = `<strong>${highlightedFileName}</strong>`;
          
          if (snippet) {
            const highlightedSnippet = this.highlightText(snippet, term);
            li.innerHTML += `<br><small style="color: #aaa;">${highlightedSnippet}</small>`;
          }
          
          li.onclick = () => this.openFile(path, li);
          li.style.whiteSpace = 'normal';
          li.style.wordWrap = 'break-word';
          this.fileListElement.appendChild(li);
        });
      }

      highlightText(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
      }
    }

    // ============================================
    // INICIALIZACIÓN DE LA APLICACIÓN.           // ============================================
    // INICIALIZACIÓN DE LA APLICACIÓN
    // ============================================
    
    // Crear instancia global de la aplicación
    window.wikiApp = new WikiApp();
    
    // Exponer PDFExporter globalmente para los botones de ordenar
    window.pdfExporter = window.wikiApp.pdfExporter;
</pre>
<!-- 
<pre>
  <div class="wiki-container">
    <div id="sidebar">
      <div id="top-bar">
        <h2>📚 Wiki PRO</h2>
        <div id="controls">
          <button id="exportBtn" class="btn btn-info btn-sm" title="Exportar HTML">📥 HTML</button>
          <select id="pdfOrientation" class="form-select form-select-sm" title="Orientacion PDF" style="max-width: 80px;">
            <option value="portrait" selected>Vertical</option>
            <option value="landscape">Horizontal</option>
          </select>
          <button id="exportPdfBtn" class="btn btn-success btn-sm" title="Exportar PDF">🧾 PDF</button>
          <button id="toggleTheme" class="btn btn-secondary btn-sm" title="Cambiar tema">🌙</button>
        </div>
      </div>
      <button id="folderBtn">📁 Seleccionar carpeta</button>
      <input type="text" id="search" class="form-control form-control-sm" placeholder="Buscar títulos o contenido…">
      <ul id="fileList"></ul>
    </div>

    <div id="content-wrapper">
      <div id="breadcrumbs">Selecciona una carpeta para empezar</div>
      <div id="editor-container">
        <div id="editor-toolbar">
          <button id="viewBtn" class="view-btn btn btn-sm" title="Ver documento (Esc)">👁️ Ver</button>
          <button id="saveBtn" class="save-btn btn btn-sm" title="Guardar cambios (Ctrl+S)" disabled>💾 Guardar</button>
          <button id="cancelBtn" class="cancel-btn btn btn-sm" title="Descartar cambios">✕ Cancelar</button>
          <span id="edit-status"></span>
        </div>
        <textarea id="editor-textarea" placeholder="Escriba aquí..."></textarea>
      </div>
      <div id="content">
        <p>Selecciona una carpeta para empezar</p>
      </div>
    </div>
  </div>

  <div id="pdfModal">
    <div id="pdfModalContent">
      <h3>Seleccionar archivos para PDF</h3>
      <div id="pdfFileList"></div>
      <div id="pdfModalButtons">
        <button id="pdfSelectAll" class="btn btn-secondary btn-sm">Seleccionar todos</button>
        <button id="pdfCancel" class="btn btn-secondary btn-sm">Cancelar</button>
        <button id="pdfConfirm" class="btn btn-success btn-sm">Generar PDF</button>
      </div>
    </div>
  </div>
</pre>
-->

![Logo vectorial](img/clase.svg)

<pre>
// ============================================
    // CLASE: FileManager - Gestión de archivos
    // ============================================
    class FileManager {
      constructor() {
        this.files = {};      // archivos .md
        this.allFiles = {};   // todos los archivos
        this.dirHandle = null;
        this.rootFolder = '';
      }

      async loadFolder() {
        if (!('showDirectoryPicker' in window)) {
          alert('Tu navegador no soporta esta función. Usa Chrome o Edge.');
          return false;
        }

        try {
          this.dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
          this.files = {};
          this.allFiles = {};
          
          await this.readDirectory(this.dirHandle, '');
          this.rootFolder = this.dirHandle.name + '/';
          
          return true;
        } catch (e) {
          if (e.name !== 'AbortError') {
            console.error('Error al cargar carpeta:', e);
          }
          return false;
        }
      }

      async readDirectory(dirHandle, path) {
        for await (const entry of dirHandle.values()) {
          const entryPath = path ? `${path}/${entry.name}` : entry.name;
          
          if (entry.kind === 'file') {
            const file = await entry.getFile();
            this.allFiles[entryPath] = file;
            if (file.name.endsWith('.md')) {
              this.files[entryPath] = file;
            }
          } else if (entry.kind === 'directory') {
            await this.readDirectory(entry, entryPath);
          }
        }
      }

      getMarkdownFiles() {
        return this.files;
      }

      getAllFiles() {
        return this.allFiles;
      }

      getFile(path) {
        return this.files[path] || null;
      }

      async saveFile(path, content) {
        if (!this.dirHandle) {
          throw new Error('No hay permisos de escritura');
        }

        const parts = path.split('/');
        let currentDir = this.dirHandle;

        for (let i = 0; i < parts.length - 1; i++) {
          currentDir = await currentDir.getDirectoryHandle(parts[i]);
        }

        const fileName = parts[parts.length - 1];
        const fileHandle = await currentDir.getFileHandle(fileName);
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();

        // Actualizar en memoria
        this.files[path] = new File([content], fileName, { type: 'text/markdown' });
      }

      resolvePath(base, relative) {
        const stack = base.split('/').slice(0, -1);
        for (const part of relative.split('/')) {
          if (part === '.' || part === '') continue;
          if (part === '..') stack.pop();
          else stack.push(part);
        }
        return stack.join('/');
      }
    }
</pre>
<pre>
// ============================================
    // CLASE: MarkdownRenderer - Renderizado MD
    // ============================================
    class MarkdownRenderer {
      constructor(fileManager) {
        this.fileManager = fileManager;
        this.contentElement = document.getElementById('content');
        this.breadcrumbsElement = document.getElementById('breadcrumbs');
        this.currentPath = null;
      }

      async renderFile(path) {
        const file = this.fileManager.getFile(path);
        if (!file) {
          console.error('Archivo no encontrado:', path);
          return null;
        }

        this.currentPath = path;
        const content = await this.readFileAsText(file);
        const html = marked.parse(content);
        
        this.contentElement.innerHTML = html;
        this.wireLinks();
        this.wireImages();
        this.wireBreadcrumbs();

        return content;
      }

      readFileAsText(file) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsText(file);
        });
      }

      wireLinks() {
        this.contentElement.querySelectorAll('a').forEach(link => {
          const href = link.getAttribute('href');
          if (!href || href.startsWith('http')) return;
          
          link.onclick = e => {
            e.preventDefault();
            const resolved = this.fileManager.resolvePath(this.currentPath, href);
            if (this.fileManager.getFile(resolved)) {
              window.wikiApp.openFile(resolved);
            } else {
              alert('Página no encontrada: ' + href);
            }
          };
        });
      }

      wireImages() {
        this.contentElement.querySelectorAll('img').forEach(img => {
          const src = img.getAttribute('src');
          if (!src || src.startsWith('http') || src.startsWith('data:')) return;
          
          const file = this.findImageFile(src, this.currentPath);
          
          if (file) {
            img.src = URL.createObjectURL(file);
            img.onclick = () => img.classList.toggle('zoomed');
          } else {
            console.warn('Imagen no encontrada:', src, 'Desde:', this.currentPath);
            img.alt += ' (imagen no encontrada)';
          }
        });
      }

      findImageFile(src, basePath) {
        const allFiles = this.fileManager.getAllFiles();
        let resolved = this.fileManager.resolvePath(basePath, src);
        let file = allFiles[resolved];
        
        if (!file) {
          for (const key in allFiles) {
            if (key.endsWith('/' + src) || key === src) {
              file = allFiles[key];
              break;
            }
          }
        }
        
        if (!file) {
          const srcName = src.split('/').pop();
          for (const key in allFiles) {
            if ((key.includes('/img/') || key.includes('/images/')) && key.endsWith('/' + srcName)) {
              file = allFiles[key];
              break;
            }
          }
        }
        
        return file;
      }

      wireBreadcrumbs() {
        if (!this.currentPath) return;
        
        const parts = this.currentPath.split('/');
        let crumbs = [];
        
        for (let i = 0; i < parts.length; i++) {
          const name = parts[i];
          const subpath = parts.slice(0, i + 1).join('/');
          crumbs.push(`<a href="#" data-path="${subpath}">${name}</a>`);
        }
        
        this.breadcrumbsElement.innerHTML = crumbs.join(' / ');
        
        this.breadcrumbsElement.querySelectorAll('a').forEach(a => {
          a.onclick = e => {
            e.preventDefault();
            const path = a.getAttribute('data-path');
            if (this.fileManager.getFile(path)) {
              window.wikiApp.openFile(path);
            }
          };
        });
      }

      highlightInContent(term) {
        const walker = document.createTreeWalker(
          this.contentElement,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        
        const nodesToReplace = [];
        let node;
        
        while (node = walker.nextNode()) {
          if (node.nodeValue.toLowerCase().includes(term.toLowerCase())) {
            nodesToReplace.push(node);
          }
        }
        
        nodesToReplace.forEach(node => {
          const span = document.createElement('span');
          span.innerHTML = this.highlightText(node.nodeValue, term);
          node.parentNode.replaceChild(span, node);
        });
      }

      highlightText(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
      }
    }
</pre>
<pre>
// ============================================
    // CLASE: MarkdownEditor - Editor de archivos
    // ============================================
    class MarkdownEditor {
      constructor(fileManager, renderer) {
        this.fileManager = fileManager;
        this.renderer = renderer;
        this.editorContainer = document.getElementById('editor-container');
        this.editorTextarea = document.getElementById('editor-textarea');
        this.contentElement = document.getElementById('content');
        this.editStatus = document.getElementById('edit-status');
        this.saveBtn = document.getElementById('saveBtn');
        this.viewBtn = document.getElementById('viewBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        
        this.isEditing = false;
        this.originalContent = '';
        this.currentPath = null;

        this.initEventListeners();
      }

      initEventListeners() {
        this.editorTextarea.addEventListener('input', () => this.updateEditStatus());
        
        this.viewBtn.addEventListener('click', () => {
          if (this.isEditing) {
            if (this.editorTextarea.value !== this.originalContent) {
              if (!confirm('Descartar cambios?')) return;
            }
            this.exitEditMode();
          }
        });

        this.saveBtn.addEventListener('click', () => this.saveFile());
        
        this.cancelBtn.addEventListener('click', () => {
          if (this.editorTextarea.value !== this.originalContent) {
            if (!confirm('Descartar cambios?')) return;
          }
          this.exitEditMode();
        });

        this.contentElement.addEventListener('dblclick', () => {
          if (this.currentPath && this.currentPath.endsWith('.md')) {
            this.enterEditMode();
          }
        });

        document.addEventListener('keydown', (e) => {
          if (this.isEditing && e.ctrlKey && e.key === 's') {
            e.preventDefault();
            this.saveFile();
          }
          if (this.isEditing && e.key === 'Escape') {
            e.preventDefault();
            if (this.editorTextarea.value !== this.originalContent) {
              if (confirm('Descartar cambios?')) {
                this.exitEditMode();
              }
            } else {
              this.exitEditMode();
            }
          }
        });
      }

      setCurrentPath(path) {
        this.currentPath = path;
      }

      setOriginalContent(content) {
        this.originalContent = content;
        this.editorTextarea.value = content;
      }

      enterEditMode() {
        if (this.isEditing) return;
        
        this.isEditing = true;
        this.editorContainer.classList.add('active');
        this.contentElement.classList.add('edit-mode');
        this.editorTextarea.focus();
        this.updateEditStatus();
      }

      exitEditMode() {
        this.isEditing = false;
        this.editorContainer.classList.remove('active');
        this.contentElement.classList.remove('edit-mode');
        this.updateEditStatus();
      }

      updateEditStatus() {
        if (!this.isEditing) {
          this.editStatus.textContent = '';
          return;
        }
        
        const hasChanges = this.editorTextarea.value !== this.originalContent;
        this.editStatus.textContent = hasChanges ? '● Cambios sin guardar' : '✔ Guardado';
        this.editStatus.style.color = hasChanges ? '#ff6b6b' : '#34a853';
        this.saveBtn.disabled = !hasChanges;
      }

      async saveFile() {
        if (!this.currentPath) {
          alert('Por favor, abre un documento primero');
          return;
        }

        this.saveBtn.disabled = true;
        this.saveBtn.textContent = '💾 Guardando...';

        try {
          const mdContent = this.editorTextarea.value;
          await this.fileManager.saveFile(this.currentPath, mdContent);
          
          this.originalContent = mdContent;
          this.updateEditStatus();
          
          // Actualizar la visualización
          this.contentElement.innerHTML = marked.parse(mdContent);
          this.renderer.wireLinks();
          this.renderer.wireImages();
          
          this.editStatus.textContent = '✔ Guardado';
          this.editStatus.style.color = '#34a853';
          
          setTimeout(() => {
            this.updateEditStatus();
          }, 1500);
        } catch (error) {
          console.error('Error al guardar:', error);
          alert('Error al guardar: ' + error.message);
        } finally {
          this.saveBtn.disabled = false;
          this.saveBtn.textContent = '💾 Guardar';
        }
      }

      hasUnsavedChanges() {
        return this.isEditing && this.editorTextarea.value !== this.originalContent;
      }
    }
</pre>
<pre>
   // ============================================
    // CLASE: HTMLExporter - Exportación a HTML
    // ============================================
    class HTMLExporter {
      constructor(fileManager) {
        this.fileManager = fileManager;
        this.exportBtn = document.getElementById('exportBtn');
        this.initEventListeners();
      }

      initEventListeners() {
        this.exportBtn.addEventListener('click', () => this.exportHTML());
      }

      async exportHTML() {
        const files = this.fileManager.getMarkdownFiles();
        
        if (Object.keys(files).length === 0) {
          alert('Carga una carpeta primero');
          return;
        }

        this.exportBtn.disabled = true;
        this.exportBtn.textContent = '⏳ Exportando...';

        try {
          if ('showDirectoryPicker' in window) {
            const dirHandle = await window.showDirectoryPicker();
            let count = 0;

            for (const path in files) {
              const mdFile = files[path];
              const relativePath = path.replace(new RegExp(`^.*?${this.fileManager.rootFolder.replace(/\//g, '\\/')}`), '');
              const htmlPath = relativePath.replace(/\.md$/, '.html');

              const reader = new FileReader();
              const markdownContent = await new Promise((resolve) => {
                reader.onload = () => resolve(reader.result);
                reader.readAsText(mdFile);
              });

              let htmlContent = marked.parse(markdownContent);
              
              htmlContent = htmlContent.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');
              htmlContent = htmlContent.replace(/href="\.\.?\/([^"]+)\.md"/g, (match, p1) => {
                return `href="${p1}.html"`;
              });

              const fullHtml = this.generateHTMLTemplate(relativePath, htmlContent);

              const parts = htmlPath.split('/');
              let currentDir = dirHandle;
              for (let i = 0; i < parts.length - 1; i++) {
                currentDir = await currentDir.getDirectoryHandle(parts[i], { create: true });
              }

              const fileHandle = await currentDir.getFileHandle(parts[parts.length - 1], { create: true });
              const writable = await fileHandle.createWritable();
              await writable.write(fullHtml);
              await writable.close();
              count++;
            }

            // Incluir imágenes y otros recursos
            const allFiles = this.fileManager.getAllFiles();
            for (const path in allFiles) {
              const file = allFiles[path];
              if (!path.endsWith('.md')) {
                const relativePath = path.replace(new RegExp(`^.*?${this.fileManager.rootFolder.replace(/\//g, '\\/')}`), '');
                const parts = relativePath.split('/');
                let currentDir = dirHandle;
                for (let i = 0; i < parts.length - 1; i++) {
                  currentDir = await currentDir.getDirectoryHandle(parts[i], { create: true });
                }

                const fileHandle = await currentDir.getFileHandle(parts[parts.length - 1], { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(file);
                await writable.close();
              }
            }

            alert(`✅ Exportación completa: ${count} documentos HTML guardados en la carpeta seleccionada`);
          } else {
            alert('❌ Tu navegador no soporta la exportación de carpetas. Usa Chrome o Edge.');
          }
        } catch (error) {
          if (error.name === 'AbortError') {
            // Usuario canceló
          } else {
            alert('Error al exportar: ' + error.message);
          }
        } finally {
          this.exportBtn.disabled = false;
          this.exportBtn.textContent = '📥 HTML';
        }
      }

      generateHTMLTemplate(title, content) {
        return ` <!--<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title.replace('.md', '')}</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
    pre {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      border-left: 3px solid #1a73e8;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre code {
      background: none;
      padding: 0;
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1, h2, h3 {
      margin-top: 1.5em;
      color: #202124;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: #f4f4f4;
    }
  </style>
</head>
<body>
${content}
</body>
</html> -->`;
      }
    }
</pre>
<pre>
// ============================================
    // CLASE: PDFExporter - Exportación a PDF
    // ============================================
    class PDFExporter {
      constructor(fileManager) {
        this.fileManager = fileManager;
        this.exportPdfBtn = document.getElementById('exportPdfBtn');
        this.pdfOrientationSelect = document.getElementById('pdfOrientation');
        this.pdfModal = document.getElementById('pdfModal');
        this.pdfFileList = document.getElementById('pdfFileList');
        this.pdfSelectAll = document.getElementById('pdfSelectAll');
        this.pdfCancel = document.getElementById('pdfCancel');
        this.pdfConfirm = document.getElementById('pdfConfirm');
        this.pdfOrderedFiles = [];

        this.initEventListeners();
      }

      initEventListeners() {
        this.exportPdfBtn.addEventListener('click', () => this.showModal());
        this.pdfSelectAll.addEventListener('click', () => this.toggleSelectAll());
        this.pdfCancel.addEventListener('click', () => this.hideModal());
        this.pdfConfirm.addEventListener('click', () => this.generatePDF());
      }

      showModal() {
        const files = this.fileManager.getMarkdownFiles();
        
        if (Object.keys(files).length === 0) {
          alert('Carga una carpeta primero');
          return;
        }

        this.pdfOrderedFiles = Object.keys(files).sort();
        this.renderFileList();
        this.pdfModal.classList.add('show');
      }

      hideModal() {
        this.pdfModal.classList.remove('show');
      }

      renderFileList() {
        this.pdfFileList.innerHTML = '';
        
        this.pdfOrderedFiles.forEach((path, index) => {
          const div = document.createElement('div');
          div.className = 'pdf-file-item';
          div.innerHTML = `
            <input type="checkbox" checked data-path="${path}">
            <span>${path.replace(new RegExp(`^.*?${this.fileManager.rootFolder.replace(/\//g, '\\/')}`), '')}</span>
            <button onclick="window.pdfExporter.moveFile(${index}, -1)" ${index === 0 ? 'disabled' : ''}>↑</button>
            <button onclick="window.pdfExporter.moveFile(${index}, 1)" ${index === this.pdfOrderedFiles.length - 1 ? 'disabled' : ''}>↓</button>
          `;
          this.pdfFileList.appendChild(div);
        });
      }

      moveFile(index, direction) {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= this.pdfOrderedFiles.length) return;
        
        [this.pdfOrderedFiles[index], this.pdfOrderedFiles[newIndex]] = 
        [this.pdfOrderedFiles[newIndex], this.pdfOrderedFiles[index]];
        
        this.renderFileList();
      }

      toggleSelectAll() {
        const checkboxes = this.pdfFileList.querySelectorAll('input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        checkboxes.forEach(cb => cb.checked = !allChecked);
        this.pdfSelectAll.textContent = allChecked ? 'Seleccionar todos' : 'Deseleccionar todos';
      }

      async generatePDF() {
        this.hideModal();
        this.exportPdfBtn.disabled = true;
        this.exportPdfBtn.textContent = '⏳ PDF...';

        try {
          const orientation = this.pdfOrientationSelect.value || 'portrait';
          const selectedPaths = Array.from(this.pdfFileList.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.getAttribute('data-path'));
          
          if (selectedPaths.length === 0) {
            alert('Selecciona al menos un documento');
            this.exportPdfBtn.disabled = false;
            this.exportPdfBtn.textContent = '🧾 PDF';
            return;
          }

          const sections = [];
          const files = this.fileManager.getMarkdownFiles();

          for (const path of selectedPaths) {
            const markdownContent = await this.readFileAsText(files[path]);
            let htmlContent = marked.parse(markdownContent);
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            
            const imgPromises = Array.from(doc.querySelectorAll('img')).map(async img => {
              const src = img.getAttribute('src');
              if (!src || src.startsWith('http') || src.startsWith('data:')) return;
              
              const file = this.findImageFile(src, path);
              
              if (file) {
                if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
                  const svgText = await this.readFileAsText(file);
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = svgText.trim();
                  const svgElement = tempDiv.querySelector('svg');
                  
                  if (svgElement) {
                    if (!svgElement.hasAttribute('width')) svgElement.setAttribute('width', '100%');
                    if (!svgElement.hasAttribute('height')) svgElement.setAttribute('height', 'auto');
                    svgElement.style.maxWidth = '100%';
                    svgElement.style.height = 'auto';
                    svgElement.style.display = 'block';
                    svgElement.style.borderRadius = '4px';
                    svgElement.style.margin = '1em 0';
                    
                    img.parentNode.replaceChild(svgElement, img);
                  }
                } else {
                  const dataUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(reader.error);
                    reader.readAsDataURL(file);
                  });
                  img.src = dataUrl;
                  img.style.maxWidth = '100%';
                  img.style.height = 'auto';
                  img.style.display = 'block';
                  img.style.borderRadius = '4px';
                  img.style.margin = '1em 0';
                  img.style.pageBreakInside = 'avoid';
                }
              }
            });
            
            await Promise.all(imgPromises);
            
            htmlContent = doc.body.innerHTML;
            sections.push(`<article>\n${htmlContent}\n</article>`);
          }

          const printWindow = window.open('', '_blank');
          if (!printWindow) {
            alert('Tu navegador bloqueó la ventana de impresión');
            return;
          }

          printWindow.document.open();
          printWindow.document.write(this.generatePDFTemplate(orientation, sections));
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
        } catch (error) {
          alert('Error al exportar PDF: ' + error.message);
        } finally {
          this.exportPdfBtn.disabled = false;
          this.exportPdfBtn.textContent = '🧾 PDF';
        }
      }

      findImageFile(src, basePath) {
        const allFiles = this.fileManager.getAllFiles();
        let resolved = this.fileManager.resolvePath(basePath, src);
        let file = allFiles[resolved];
        
        if (!file) {
          for (const key in allFiles) {
            if (key.endsWith('/' + src) || key === src) {
              file = allFiles[key];
              resolved = key;
              break;
            }
          }
        }
        
        if (!file) {
          const srcName = src.split('/').pop();
          for (const key in allFiles) {
            if ((key.includes('/img/') || key.includes('/images/')) && key.endsWith('/' + srcName)) {
              file = allFiles[key];
              resolved = key;
              break;
            }
          }
        }
        
        return file;
      }

      readFileAsText(file) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsText(file);
        });
      }

      generatePDFTemplate(orientation, sections) {
        return `<!--<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wiki PDF</title>
  <style>
    @page {
      size: A4 ${orientation};
      margin: 15mm 15mm 12mm 15mm;
    }
    @page {
      @bottom-center {
        content: counter(page) " / " counter(pages);
        font-size: 10pt;
        color: #666;
      }
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 100%;
      margin: 0;
      padding: 8mm 8mm 8mm 8mm;
      line-height: 1.6;
      color: #333;
      font-size: 11pt;
    }
    article {
      page-break-before: always;
    }
    article:first-of-type {
      page-break-before: auto;
    }
    img, svg {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      display: block;
      margin: 1em 0;
      background: white;
      padding: 0;
    }
    img[src$=".svg"], img[src*="svg"], svg {
      width: 100%;
      height: auto;
    }
    img[src*="data:image"] {
      max-width: 100%;
      height: auto;
      background: white;
      page-break-inside: avoid;
    }
    pre {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      border-left: 3px solid #1a73e8;
      page-break-inside: avoid;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre code {
      background: none;
      padding: 0;
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1, h2, h3 {
      margin-top: 1.5em;
      color: #202124;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
      table-layout: fixed;
      word-wrap: break-word;
      border: 1px solid #ddd;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 6px 8px;
      text-align: left;
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
      font-size: 10pt;
    }
    th {
      background: #f4f4f4;
      font-weight: bold;
      border-bottom: 2px solid #999;
    }
    tr {
      border-bottom: 1px solid #ddd;
    }
    tbody tr:last-child td {
      border-bottom: 1px solid #ddd;
    }
    @media print {
      body {
        max-width: none;
      }
      a {
        color: #000;
        text-decoration: none;
      }
      img, svg {
        max-width: 100%;
        height: auto;
        page-break-inside: avoid;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        display: block;
      }
      img[src*="data:image"] {
        max-width: 100%;
        height: auto;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      table {
        page-break-inside: avoid;
        font-size: 9pt;
        border: 1px solid #ddd;
      }
      tr {
        page-break-inside: avoid;
      }
      thead {
        display: table-header-group;
      }
      tfoot {
        display: table-footer-group;
      }
      th, td {
        padding: 4px 6px;
        border: 1px solid #ddd;
      }
    }
  </style>
</head>
<body>
  ${sections.join('\n')}
</body>
</html>-->`;
      }
    }
</pre>
