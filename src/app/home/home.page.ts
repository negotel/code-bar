import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { OperacoesService } from '../services/operacoes.service';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public listaDados;
  public idParams;
  loading = true;
  userLogged;


  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private operacao: OperacoesService,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    await this.obterDadosUsuarioLogado();
  }

  obterDadosUsuarioLogado(){
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));
  }

  async criarOperacao() {
    this.loadingAwait();
    await this.operacao.iniciar(this.userLogged.data.id)
      .then((response) => {
        this.listaDados = response['data'];
        this.lote(this.listaDados.id);
      })
      .catch((err) => {
        console.log(err)
        this.presentToast(err['statusText'], 'danger');
      });
      this.dismiss();
    }

    lote(id) {
      this.router.navigate([`/coletor/${id}`])
    }


    async loadingAwait(){
      this.loading = true;
      return await this.loadingController.create({
        message: 'Aguarde, Validando lote...',
      }).then(a => {
        a.present().then(() => {
          if(!this.loading){
          a.dismiss().then(( ) => {});
          }
        })
      });
    }
    async dismiss(){
      this.loading = false;
      return await this.loadingController.dismiss().then(() => {})
    }

    async presentToast(message, color) {
      const toast = await this.toastController.create({
        message: message,
        position: 'top',
        color: color,
        cssClass: 'my-custom-class',
        buttons: [
          {
            side: 'end',
            icon: 'close-circle-outline',
            role: 'cancel'
          },
        ]
      });
      toast.present();
    }
}
