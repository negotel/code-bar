import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.page.html',
  styleUrls: ['./primeiro-acesso.page.scss'],
})
export class PrimeiroAcessoPage implements OnInit {

  constructor(
    private router: Router,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private fb: FormBuilder,) {
    this.formPrimeiroAcesso = this.fb.group({
      chave: ['', Validators.required],
      placa: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  formPrimeiroAcesso: FormGroup;
  loading = true;

  get getNome(){
    return this.formPrimeiroAcesso.controls.chave;
  }

  get getPlaca(){
    return this.formPrimeiroAcesso.controls.placa;
  }

  get getSenha(){
    return this.formPrimeiroAcesso.controls.senha;
  }
  
  async cadastrarSenha(){

  }
  /*async cadastrarSenha() {
    this.loadingAwait();
    await this.login.auteMeuPrimeiroAcesso(this.formPrimeiroAcesso.value).subscribe((response) =>{
      this.router.navigate(['/login']);
      this.presentToast(response['message'].messagem, 'success');
    }, 
    (erro)=> {
      this.presentToast(erro['error'].messagem, 'danger');
    })
    this.dismiss();
  }*/

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

  pageLogin(){
    this.router.navigate(['/login']);
  }
}
