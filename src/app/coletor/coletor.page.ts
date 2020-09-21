
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ObjetosService } from '../services/objetos.service';
import { OperacoesService } from '../services/operacoes.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coletor',
  templateUrl: './coletor.page.html',
  styleUrls: ['./coletor.page.scss'],
})

export class ColetorPage implements OnInit {
  scannedData: any;
  encodedData: '';
  encodeData: any;
  public result = null;
  idParams;
  loading = true;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public barcodeCtrl: BarcodeScanner,
    private objetos: ObjetosService,
    private operacao: OperacoesService) { }

  async ngOnInit() {
    await this.idParams == this.getIdParams();
    this.obterRegitros();
  }

  async goToBarcodeScan() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: false,
      showTorchButton: false,
      torchOn: false,
      prompt: 'Coloque o código de barras dentro da área de digitalização',
      resultDisplayDuration: 500,
      formats: 'CODE_128',
      orientation: 'portrait',
    };

    await this.barcodeCtrl.scan(options).then(
      barcodeData => {
        this.loadingAwait();
        this.scannedData = barcodeData;
        this.objetos.consulta(this.idParams, this.scannedData.text)
          .then((response) => {
            this.loadingAwait();
            this.result = response['data'];
          })
          .catch((erro) => {
            this.presentToast(erro['error'].messagem, 'danger');
          })
        this.dismiss();
      }).catch(err => {
        this.presentToast(err, 'danger');
      });
    this.dismiss();
  }

  goToCreateCode() {
    this.barcodeCtrl.encode(this.barcodeCtrl.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {
      this.encodeData = encodedData;
    }, (err) => {
      console.log('Error: ', err);
    });
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
      duration: 500,
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

  async testeconsultaObjeto(id, objeto) {
    this.loadingAwait();
    await this.objetos.consulta(this.idParams, 'PZ569096639BR')
      .then((response) => {
        this.result = response['data'];
      })
      .catch((erro) => {
        this.presentToast(erro['error'].messagem, 'danger');
        this.result = erro['error'].data;
      })
    this.dismiss();
  }
}
