import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService { 

  userAuthenticated = false;

  public url_login = 'logar';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  autenticacao(login) { 
   return this.http.get(`${environment.URL_API}/${this.url_login}?placa=${login.placa}&senha=${login.senha}`);
  }

  auteMeuPrimeiroAcesso(dados) { 
    return this.http.get(`${environment.URL_API}/${this.url_login}?chave=${dados.chave}&placa=${dados.placa}&senha=${dados.senha}`);
   }

  userAutenticado() {
    this.userAuthenticated = true;
  }

  userLogged() {
    this.userAuthenticated = false;
  }

  getUserAuthenticated() {
    return this.userAuthenticated;
  }
}
