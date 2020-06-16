// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { User } from 'src/app/models/user';

const API_URL: string = 'http://192.168.10.5/gbackend/api/user/';
// const API_URL: string = 'http://localhost:8090/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(API_URL + 'all');
  }

  save(user: User): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(API_URL + 'save', JSON.stringify(user), {
      headers: headers,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.get(API_URL + 'delete/' + id);
  }
}
