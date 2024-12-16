import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/model/usuario';
import { ServiciosAsignaturaService } from '../../servicios/servicios-asignatura.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {
  // Datos para asignaturas y alumnos
  TodaAsignatura: any[] = [];
  SeccionesPorAsignatura: { [key: string]: any[] } = {};
  AlumnosPorSeccion: { [key: string]: { [key: string]: any[] } } = {};
  AsistenciaPorAlumno: { [key: string]: { [key: string]: { [key: string]: any } } } = {};

  // Datos para usuarios
  lista_usuarios: Usuario[] = [];

  constructor(
    public hh: ServiciosAsignaturaService,
    private afs: AngularFirestore,
    private alertController: AlertController
  ) {}

  // Consulta para asignaturas y alumnos
  consulta() {
    this.hh.obtenerTodasLasAsignaturas().subscribe(data => {
      this.TodaAsignatura = data;

      this.TodaAsignatura.forEach(curso => {
        if (!this.SeccionesPorAsignatura[curso.id]) {
          this.SeccionesPorAsignatura[curso.id] = [];
        }

        this.hh.obtenerSeccionesPorAsignatura(curso.id).subscribe(secciones => {
          const seccionesFiltradas = secciones.filter(seccion => seccion.profesor);

          this.SeccionesPorAsignatura[curso.id] = seccionesFiltradas;

          seccionesFiltradas.forEach(seccion => {
            if (!this.AlumnosPorSeccion[curso.id]) {
              this.AlumnosPorSeccion[curso.id] = {};
            }
            if (!this.AlumnosPorSeccion[curso.id][seccion.id]) {
              this.AlumnosPorSeccion[curso.id][seccion.id] = [];
            }

            this.hh.obtenerAlumnosPorSeccion(curso.id, seccion.id).subscribe(alumnos => {
              this.AlumnosPorSeccion[curso.id][seccion.id] = alumnos;

              alumnos.forEach(alumno => {
                this.hh.obtenerEstadoAsistenciaAlumno(curso.id, seccion.id, alumno.id).subscribe(asistencia => {
                  if (!this.AsistenciaPorAlumno[curso.id]) {
                    this.AsistenciaPorAlumno[curso.id] = {};
                  }
                  if (!this.AsistenciaPorAlumno[curso.id][seccion.id]) {
                    this.AsistenciaPorAlumno[curso.id][seccion.id] = {};
                  }
                  this.AsistenciaPorAlumno[curso.id][seccion.id][alumno.id] = asistencia;
                });
              });
            });
          });
        });
      });
    });
  }

  // Consulta para usuarios
  consultaUsuarios() {
    this.afs.collection<Usuario>('usuarios').valueChanges().subscribe((data: Usuario[]) => {
      this.lista_usuarios = data;
    });
  }

  ngOnInit() {
    this.consulta();
    this.consultaUsuarios();
  }
}


