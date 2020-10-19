import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ObjetosService } from '../services/objetos.service';

@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.page.html',
  styleUrls: ['./operacoes.page.scss'],
})
export class OperacoesPage implements OnInit {

  public dadosUsuarioLogado;
  public idUsuarioLogado;
  public result = null;
  loading = true;

  constructor(
    private objetos: ObjetosService,
    public toastController: ToastController,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    this.dadosUsuarioLogado = JSON.parse(sessionStorage.getItem('user'));
    this.idUsuarioLogado = this.dadosUsuarioLogado.data.id;

    /** obter todas operacoes */
    await this.obterOperacoes();
  }

  async obterOperacoes() {
    this.loadingAwait();
    await this.objetos.todaOperacoes(this.idUsuarioLogado)
      .then((response) => {
        this.result = response['data'];
        this.dismiss();
      }, (erro) => {
        this.presentToast(erro['error'].messagem, 'danger');
        this.result = erro['error'].data;
        this.dismiss();
      })
  }


  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
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

  async loadingAwait() {
    this.loading = true;
    return await this.loadingController.create({
      message: 'Aguarde, carregando dados...',
    }).then(a => {
      a.present().then(() => {
        if (!this.loading) {
          a.dismiss().then(() => { });
        }
      })
    });
  }

  async dismiss() {
    this.loading = false;
    return await this.loadingController.dismiss().then(() => { })
  }
}
