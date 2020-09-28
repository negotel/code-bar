import { ObjetosService } from './../services/objetos.service';
import { OperacoesService } from './../services/operacoes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-leitor-conferencia',
  templateUrl: './leitor-conferencia.page.html',
  styleUrls: ['./leitor-conferencia.page.scss'],
})
export class LeitorConferenciaPage implements OnInit {

  scannedData: any;
  encodedData: '';
  encodeData: any;
  public result = null;
  idParams;
  userLogged;
  loading = true;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private objetos: ObjetosService,
    private operacao: OperacoesService,
    public barcodeCtrl: BarcodeScanner,
    private toastController: ToastController,
    ) { }

  async ngOnInit() {
    await this.idParams == this.getIdParams();    
    await this.obterRegitros();
    this.dismissTost();
    if(this.result === null){
      this.presentToast('Essa operação não contem nenhum registro', 'danger');
      this.router.navigate([`agf-conferencia`]);
    }
  }

  getIdParams() {
    this.idParams = this.activatedRoute.snapshot.params.id
  }

  async scannearCodigoBarra() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: false,
      showTorchButton: false,
      torchOn: false,
      prompt: 'Coloque o código de barras dentro da área digitalização',
      resultDisplayDuration: 500,
      formats: 'CODE_128',
      orientation: 'portrait',
    };

    await this.barcodeCtrl.scan(options).then(
      barcodeData => {
        this.dismissTost();
        this.loadingAwait();
        this.scannedData = barcodeData;
        this.objetos.conferiOperacao(this.idParams, this.scannedData.text)
          .subscribe((response) => {
            this.loadingAwait();
            this.result = response['data'];

            if(this.result === null){
              this.presentToast('Conferencia finalizada com sucesso', 'success');
              this.router.navigate([`agf-conferencia`]);
            }else{
              this.presentToast(response['messagem'], 'success');
            }
            this.dismiss();
          },(erro) => {
            this.presentToast(erro['error'].messagem, 'danger');
          })
        this.dismiss();
      }).catch(err => {
        this.presentToast(err, 'danger');
      });
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

  async obterRegitros() {
    this.loadingAwait();
    await this.objetos.obterRegistroColeta(this.idParams)
      .then((response) => {
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

  async dismissTost(){
    this.loading = false;
    return await this.toastController.dismiss().then(() => {})
  }
 /**
  * PZ569096639BR
  * PZ663821193BR
  * PZ663814612BR
  */
  async testeconsultaObjeto() {
    this.loadingAwait();
    await this.objetos.conferiOperacao(this.idParams, 'OM017195685BR')
      .subscribe((response) =>{
        this.result = response['data'];
        this.presentToast(response['messagem'], 'success');
        this.dismiss();
      },(erro) => {
        this.presentToast(erro['error'].messagem, 'danger');
        this.result = erro['error'].data; 
        this.dismiss();
      })
  }
}
