import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiciosAsignaturaService {
  obtenerUsuarios() {
    throw new Error('Method not implemented.');
  }

  constructor(private afs: AngularFirestore) { }

  

  // Obtener todas las asignaturas (Devuelve ID y atributos)
  obtenerTodasLasAsignaturas() {
    return this.afs.collection('asignatura')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  
  // Obtener secciones de una asignatura (Devuelve ID y atributos)
  obtenerSeccionesPorAsignatura(nomAsignatura: string) {
    return this.afs.collection('asignatura').doc(nomAsignatura)
      .collection("seccion")
      .snapshotChanges()
      .pipe(  //PIPE Y MAP ES PARA OBTENER EL DOCUMENTO 
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  // Obtener alumnos filtrados por sección
  obtenerAlumnosPorSeccion(nomAsignatura: string, codSeccion: string) {
    return this.afs.collection('asignatura').doc(nomAsignatura)
      .collection("seccion").doc(codSeccion)
      .collection("alumnos")
      .snapshotChanges()
      .pipe(  
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  // Obtener el estado de asistencia de un alumno
  obtenerEstadoAsistenciaAlumno(nomAsignatura: string, codSeccion: string, nomAlumno: string) {
    return this.afs.collection('asignatura').doc(nomAsignatura)
      .collection("seccion").doc(codSeccion)
      .collection("alumnos").doc(nomAlumno).collection("asistencia")
      .valueChanges();
  }
  
  listar():Observable<Usuario[]>{
    return this.afs.collection<Usuario>('usuarios').
    valueChanges({idField:'id'})
  }
  
  // Obtener alumnos filtrados por sección y un ID específico
obtenerAlumnosPorSeccionYID(nomAsignatura: string, codSeccion: string, idAlumno: string) {
  return this.afs.collection('asignatura').doc(nomAsignatura)
    .collection('seccion').doc(codSeccion)
    .collection('alumnos', ref => ref.where('001', '==', idAlumno)) // Filtra por ID
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
}  

obtenerUsuariosPorNombre(nombre: string): Observable<Usuario[]> {
  return this.afs.collection<Usuario>('usuarios').valueChanges();
}

actualizarAsistencia(id: string) {
  return this.afs
    .collection('usuarios')
    .doc(id)
    .update({ Asistencia: true });
}

}
