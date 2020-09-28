import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {

  constructor(
    private http: HttpClient,
    ) { }

  iniciar(idMotorista){
    return this.http.get(`${environment.URL_API}/lote?acao=adicionar&id_motorista=${idMotorista}`).toPromise();
  }

  finalizar(idOperacao){
    return this.http.get(`${environment.URL_API}/lote?acao=finalizar&id_operacao=${idOperacao}`).toPromise();
  }

  conferencia(){
    return this.http.get(`${environment.URL_API}/operacao-em-conferencia`).toPromise();
  }
}
