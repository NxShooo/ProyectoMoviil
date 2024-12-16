import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../model/usuario';
@Injectable({
  providedIn: 'root'
})
export class CurdAPIService {

  constructor(private http:HttpClient) { }
  //apis de prueba funcionan como tal y muestran las vistas
 
  rutaapi="http://127.0.0.1:8000//api/Usuario/"
  apipython="https://bossflarion.pythonanywhere.com/api/Usuario/"
  
 obtener():Observable<any>{
  return this.http.get(this.apipython).pipe(retry(3))
 }
}
