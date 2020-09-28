import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjetosService {

  constructor(private http: HttpClient) { }

  consulta(id, objeto){
    return this.http.get(`${environment.URL_API}/objetos?id_operacao=${id}&objeto=${objeto}`);
  }

  obter(id){
    return this.http.get(`${environment.URL_API}/objetos?id_operacao=${id}`).toPromise();
  }

  conferiOperacao(id, objeto){
    return this.http.get(`${environment.URL_API}/conferi-operacao?acao=conferencia&id_operacao=${id}&objeto=${objeto}`);
  }

  obterRegistroColeta(id){
    return this.http.get(`${environment.URL_API}/conferi-operacao?acao=obter&id_operacao=${id}`).toPromise();
  }
}
