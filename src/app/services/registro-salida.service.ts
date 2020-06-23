/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* RxJS */
import { Observable } from 'rxjs';
/* Modelo */
import { RegistroSalida } from 'src/app/models/RegistroSalida';

const API_URL: string = 'http://152.200.130.126/gbackend/api/registroSalida/';
// const API_URL: string = 'http://localhost:8090/api/registroSalida/';

@Injectable({
  providedIn: 'root',
})
export class RegistroSalidaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }

  save(registro: RegistroSalida): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(API_URL + 'save', JSON.stringify(registro), {
      headers: headers,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.get(API_URL + 'delete/' + id);
  }
}
