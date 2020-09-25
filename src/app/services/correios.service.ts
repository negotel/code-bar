import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class CorreiosService {
  
  constructor(private http: HTTP) { }

  

  autenticacao(){
    
    this.http.get('https://svp.correios.com.br/api/autentica.php?usuario=19115737802&senha=Ab234567', {}, {})
    .then(
      data => {
      console.log(data);
    })
    //return this.http.get('https://svp.correios.com.br/api/autentica.php?usuario=19115737802&senha=Ab234567');
  }

  consultaPLP(objeto){
    //return this.http.get(`https://svp.correios.com.br/api/plp.php/${objeto}`);
  }
}
