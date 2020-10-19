import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(private animationCtrl: AnimationController,
              private router: Router) {
  }

  ngOnInit() {
    this.animateLogin();
  }

  async animateLogin() {
    const login = document.querySelector('.login');

    const animation = await this.animationCtrl.create()
      .addElement(login)
      .delay(3000)
      .duration(500)
      .fromTo('bottom', '-20%', '0');

    animation.play();
  }

  login() {
    this.router.navigate(['/login']);
  }
}
