import { LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ObjetosService } from '../services/objetos.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  
  scannedData: any;
  encodedData: '';
  encodeData: any;
  public result = null;
  idParams;
  userLogged;
  loading = true;

  constructor(
    public barcodeCtrl: BarcodeScanner,
    public loadingController: LoadingController,
    public toastController:ToastController,
    private objetos: ObjetosService,
    ) { }

  ngOnInit() {
    this.scannearCodigoBarra()
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
        this.loadingAwait();
        this.scannedData = barcodeData;
        this.objetos.consulta(this.idParams, this.scannedData.text)
          .subscribe((response) => {
            this.loadingAwait();
            this.result = response['data'];
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

  async dismiss() {
    this.loading = false;
    return await this.loadingController.dismiss().then(() => { })
  }

}
