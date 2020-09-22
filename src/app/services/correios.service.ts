import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {
  
  constructor(private http: HttpClient) { }

  autenticacao(){
    return this.http.get(`https://svp.correios.com.br/api/autentica.php?usuario=19115737802&senha=Ab234567`).toPromise();
  }

  consultaPLP(objeto){
    return this.http.get(`https://svp.correios.com.br/api/plp.php/${objeto}`).toPromise();
  }
}
