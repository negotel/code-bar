import { Component, OnInit } from '@angular/core';
import { OperacoesService } from '../services/operacoes.service';
import { ObjetosService } from '../services/objetos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu-header-popover',
  templateUrl: './menu-header-popover.component.html',
  styleUrls: ['./menu-header-popover.component.scss'],
})
export class MenuHeaderPopoverComponent implements OnInit {

  public result = null;
  idParams;
  loading = true;

  constructor(
    private operacao: OperacoesService,
    private objetos: ObjetosService,
    private router: Router,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    await this.idParams == this.getIdParams();
    this.obterRegitros();
  }

  getIdParams() {
    this.idParams = this.activatedRoute.snapshot.params.id
  }

  async obterRegitros() {
    this.loadingAwait();
    await this.objetos.obter(this.idParams)
      .then((response) => {
        this.result = response['data'];
      })
      .catch((erro) => {
        this.presentToast(erro['error'].messagem, 'danger');
        this.result = erro['error'].data;
      })
    this.dismiss();
  }

  async finalizarOperacao() {

    this.loadingAwait();
    if (this.result == null) {
      this.dismiss();
      this.presentToast('Essa operação não pode ser finalizada, pois não contem nenhum registro.', 'warning');
    } else {
      await this.operacao.finalizar(this.idParams)
        .then((response) => {
          this.presentToast(response['messagem'], 'success');
          this.router.navigate([`/home`]);
        })
        .catch((erro) => {
          console.log(erro)
          this.presentToast(erro['error'].messagem, 'danger');
        })
    }
    this.dismiss();
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
