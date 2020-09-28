import { OperacoesService } from './../services/operacoes.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router , ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-agf-conferencia',
  templateUrl: './agf-conferencia.page.html',
  styleUrls: ['./agf-conferencia.page.scss'],
})
export class AgfConferenciaPage implements OnInit {

  loading = true;
  result;

  constructor(
    private router: Router,
    private conferencia: OperacoesService,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.obterRegitros();
  }

  
  leitor(id){
    this.router.navigate([`/leitor-conferencia/${id}`])
  }

  async obterRegitros() {
    this.loadingAwait();
    await this.conferencia.conferencia().then((response) => {
        this.result = response['data'];
      })
      .catch((erro) => {
        this.presentToast(erro['error'].messagem, 'danger');
        this.result = erro['error'].data;
      })
    this.dismiss();
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

  async atualizaDados(event){
    await this.obterRegitros();
    event.target.complete();
  }

}
