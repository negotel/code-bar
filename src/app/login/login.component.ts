import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {  Validator, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;  
  loading = true;
/*
  get getBoard() {
    return this.formLogin.controls.placa;
  }

  get getPassword() {
    return this.formLogin.controls.senha;
  }

  constructor(private router: Router,
              public toastController: ToastController,
              private fb: FormBuilder,
              private loginService: LoginService)
  {
    this.formLogin = this.fb.group({
      placa: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async login() {    
    this.loading = false;
    this.loginService.login(this.formLogin.value).subscribe(response => {
      this.setSession(response)
      this.loginService.userAutenticado();
      this.router.navigate(['/home']);
      this.loading = true;
    }, (e) => {
      this.loading = true;
      this.presentToast(e.error.erro);
    })
  }  

  setSession(user) {
    const userLogged = JSON.stringify(user)
    sessionStorage.setItem('user', userLogged)
  }

  async presentToast(error) {
    const toast = await this.toastController.create({
      message: error,
      header: 'Error!!!',
      duration: 5000,
      position: 'top',
      color: 'danger',
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
  } */

}
