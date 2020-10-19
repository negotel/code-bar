
import { Component, OnInit, ElementRef } from '@angular/core';
import { ToastController, LoadingController, PopoverController } from '@ionic/angular';
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
  userLogged;
  loading = true;
  dynamicColor: string;



  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public barcodeCtrl: BarcodeScanner,
    private objetos: ObjetosService,
    private popoverCtrl: PopoverController,
    private operacao: OperacoesService,
    private elementRef:ElementRef) { }

  async ngOnInit() {
    await this.obterDadosUsuarioLogado();
    await this.idParams == this.getIdParams();
    await this.obterRegitros();
  }

  updateColor(color) {
    this.dynamicColor = color;
  }

  setStyle(value: string): void {
    this.elementRef.nativeElement.style.setProperty('ion-app', value); 
}

  obterDadosUsuarioLogado(){
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));
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

  async testeconsultaObjeto() {
    this.loadingAwait();
    await this.objetos.consulta(this.idParams, 'sPZ463714679BR') /* PZ663814612BR */
      .subscribe((response) =>{
        this.result = response['data'];
        this.dismiss();
      },(erro) => {
        this.presentToast(erro['error'].messagem, 'danger');
        this.result = erro['error'].data; 
        this.dismiss();
      })
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
 /**
  * PZ569096639BR
  * PZ663821193BR
  * PZ663814612BR
  */
}
