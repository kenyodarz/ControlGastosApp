import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


const API_URL = 'http://192.168.10.5/gbackend/api/test/';


/**
 * Servicio de prueba de la autenticacion AWT de la API_REST
 *
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + "all", { responseType: "text" });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + "user", { responseType: "text" });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + "mod", { responseType: "text" });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + "admin", { responseType: "text" });
  }
}
