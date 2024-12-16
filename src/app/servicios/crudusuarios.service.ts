import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudusuariosService {

  constructor(private afs:AngularFirestore) { }

  grabar(usuario: Usuario){
  return this.afs.collection('usuarios').add(usuario);
  }
  listar():Observable<Usuario[]>{
  return this.afs.collection<Usuario>('usuarios').
  valueChanges({idField:'id'})
  }
  eliminar_usuarios(id:any){
    return this.afs.collection('usuarios').doc(id).delete();
  }
  modificar_usuarios(usuario:Usuario){
    return this.afs.collection('usuarios').doc(usuario.id).update(usuario);
  }
}
