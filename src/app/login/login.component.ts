import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private fb: FormBuilder,
    private login: LoginService) {
    this.formLogin = this.fb.group({
      placa: ['', Validators.required],
      senha: ['', Validators.required]
    })
  };

  ngOnInit(): void {

  }

  formLogin: FormGroup;
  loading = true;

  get getBoard() {
    return this.formLogin.controls.placa;
  }

  get getPassword() {
    return this.formLogin.controls.senha;
  }

  async logar() {
    this.loadingAwait();
    this.loading = false;
    await this.login.autenticacao(this.formLogin.value).subscribe((response) =>{
      
      this.setSession(response);
      this.login.userAutenticado();
      if(response['data'].nivel == 'cliente'){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/agf-conferencia']);
      }
    }, (erro)=> {
      this.presentToast(erro['error'].messagem, 'danger');
    })
    this.loading = true;
    this.dismiss();
  }

  setSession(user) {
    const userLogged = JSON.stringify(user)
    sessionStorage.setItem('user', userLogged)
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 5000,
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
