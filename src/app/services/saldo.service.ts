/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* RxJS */
import { Observable } from 'rxjs';
/* Modelo */
import { Saldo } from 'src/app/models/Saldo';

const API_URL: string = 'http://192.168.10.5/gbackend/api/saldo/';
// const API_URL: string = 'http://localhost:8090/api/saldo/';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }

  save(saldo: Saldo): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(API_URL + 'save', JSON.stringify(saldo), {
      headers: headers,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.get(API_URL + 'delete/' + id);
  }
}