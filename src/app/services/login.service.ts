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

  login(login): Observable<any> {   
    return this.http.post(`${environment.URL_API}/${this.url_login}`, login)
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
