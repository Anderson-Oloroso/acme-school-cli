import fs from 'fs/promises';
import path from 'path';

// Clase encargada de dar formato HTML a los datos del reporte (Principio SOLID)
export class FormatearReporteHTML {
  generar(titulo, subtitulo, columnas, filas) {
    const fechaActual = new Date().toLocaleString();

    const headersHtml = columnas.map(col => `<th>${col.label || col.key}</th>`).join('');

    const rowsHtml = filas.length === 0
      ? `<tr><td colspan="${columnas.length}" class="vacio">No se encontraron registros para este reporte.</td></tr>`
      : filas.map(fila => {
          const cells = columnas.map(col => {
            let valor = fila[col.key];
            if (valor === null || valor === undefined) valor = '-';
            return `<td>${valor}</td>`;
          }).join('');
          return `<tr>${cells}</tr>`;
        }).join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo} - ACME School</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f7f6;
      margin: 0;
      padding: 30px;
      color: #333;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 3px solid #0066cc;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    .header h1 {
      margin: 0;
      color: #0066cc;
      font-size: 26px;
    }
    .header p {
      margin: 5px 0 0 0;
      color: #666;
      font-size: 14px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #888;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
      font-size: 14px;
    }
    th {
      background-color: #0066cc;
      color: #ffffff;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.5px;
    }
    tr:nth-child(even) {
      background-color: #f9fbfd;
    }
    tr:hover {
      background-color: #f1f7ff;
    }
    .vacio {
      text-align: center;
      color: #888;
      font-style: italic;
      padding: 25px;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ACME SCHOOL</h1>
      <p>${titulo}</p>
    </div>
    <div class="meta">
      <span>${subtitulo || 'Reporte del Sistema'}</span>
      <span>Generado el: ${fechaActual}</span>
    </div>
    <table>
      <thead>
        <tr>${headersHtml}</tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
    <div class="footer">
      Total de registros: ${filas.length} | Sistema de Gestión Académica ACME School
    </div>
  </div>
</body>
</html>`;
  }
}

// Servicio para orquestar la generacion y guardado de archivos de reportes HTML
export class HTMLReportService {
  constructor() {
    this.formateador = new FormatearReporteHTML();
    this.reportsDir = path.join(process.cwd(), 'reports');
  }

  async _guardarArchivo(nombreArchivo, contenidoHTML) {
    await fs.mkdir(this.reportsDir, { recursive: true });
    const rutaCompleta = path.join(this.reportsDir, nombreArchivo);
    await fs.writeFile(rutaCompleta, contenidoHTML, 'utf-8');
    return rutaCompleta;
  }

  // 1. Reporte HTML de Estudiantes
  async generarReporteEstudiantes(estudiantes) {
    const columnas = [
      { key: 'estudiante_codigo', label: 'Código' },
      { key: 'nombre_completo', label: 'Nombre Completo' },
      { key: 'tipo_documento', label: 'Tipo Doc.' },
      { key: 'documento', label: 'No. Documento' },
      { key: 'genero', label: 'Género' },
      { key: 'email', label: 'Correo Electrónico' },
      { key: 'ciudad', label: 'Ciudad' }
    ];
    const html = this.formateador.generar(
      'Reporte General de Estudiantes',
      'Listado de todos los estudiantes registrados',
      columnas,
      estudiantes
    );
    return await this._guardarArchivo('reporte_estudiantes.html', html);
  }

  // 2. Reporte HTML de Profesores
  async generarReporteProfesores(profesores) {
    const columnas = [
      { key: 'id', label: 'ID' },
      { key: 'nombre_completo', label: 'Docente' },
      { key: 'tipo_documento', label: 'Tipo Doc.' },
      { key: 'documento', label: 'No. Documento' },
      { key: 'email', label: 'Correo Electrónico' }
    ];
    const html = this.formateador.generar(
      'Reporte General de Docentes',
      'Listado de profesores activos en la institución',
      columnas,
      profesores
    );
    return await this._guardarArchivo('reporte_profesores.html', html);
  }

  // 3. Reporte HTML de Horarios por Curso
  async generarReporteHorariosPorCurso(horarios, cursoFiltro = '') {
    const columnas = [
      { key: 'schedule_id', label: 'ID Horario' },
      { key: 'curso_codigo', label: 'Cód. Curso' },
      { key: 'curso_nombre', label: 'Nombre del Curso' },
      { key: 'profesor', label: 'Profesor Asignado' },
      { key: 'aula', label: 'Aula' },
      { key: 'fecha_inicio', label: 'Fecha Inicio' },
      { key: 'fecha_fin', label: 'Fecha Fin' },
      { key: 'estado', label: 'Estado' }
    ];
    const subtitulo = cursoFiltro ? `Horarios programados para: ${cursoFiltro}` : 'Oferta de todos los horarios programados';
    const html = this.formateador.generar(
      'Reporte de Horarios por Curso',
      subtitulo,
      columnas,
      horarios
    );
    return await this._guardarArchivo('reporte_horarios_curso.html', html);
  }

  // 4. Reporte HTML de Estudiantes por Cursos
  async generarReporteEstudiantesPorCurso(inscripciones, cursoFiltro = '') {
    const columnas = [
      { key: 'curso', label: 'Curso' },
      { key: 'estudiante', label: 'Nombre del Estudiante' },
      { key: 'estudiante_codigo', label: 'Código' },
      { key: 'fecha_inscripcion', label: 'Fecha Inscripción' },
      { key: 'estado', label: 'Estado' }
    ];
    const subtitulo = cursoFiltro ? `Inscripciones en el curso: ${cursoFiltro}` : 'Listado general de alumnos inscritos en cursos';
    const html = this.formateador.generar(
      'Reporte de Estudiantes Inscritos por Curso',
      subtitulo,
      columnas,
      inscripciones
    );
    return await this._guardarArchivo('reporte_estudiantes_curso.html', html);
  }

  // 5. Reporte HTML de Temas de un Curso
  async generarReporteTemasPorCurso(temas, cursoNombre = '') {
    const columnas = [
      { key: 'curso_codigo', label: 'Cód. Curso' },
      { key: 'curso_nombre', label: 'Curso' },
      { key: 'tema_codigo', label: 'Cód. Tema' },
      { key: 'tema_titulo', label: 'Título del Tema' },
      { key: 'tema_detalle', label: 'Detalle del Tema' },
      { key: 'estado', label: 'Estado' }
    ];
    const subtitulo = cursoNombre ? `Plan temático del curso: ${cursoNombre}` : 'Catálogo de contenidos y temas académicos';
    const html = this.formateador.generar(
      'Reporte de Temas de Curso',
      subtitulo,
      columnas,
      temas
    );
    return await this._guardarArchivo('reporte_temas_curso.html', html);
  }
}

export default HTMLReportService;
