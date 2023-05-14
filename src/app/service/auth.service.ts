import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../model/login-usuario';
import { JwtDto } from '../model/jwt-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = environment.URL + 'auth/';

  constructor(private hhtpClient : HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.hhtpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario : LoginUsuario): Observable<JwtDto>{
    return this.hhtpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }

  logout() {
    // Eliminar los tokens de autenticación del localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  
}
