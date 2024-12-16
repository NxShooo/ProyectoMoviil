import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/core/v1/Usuarios/'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de usuarios
  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}