import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'coletor/:id',
    loadChildren: () => import('./coletor/coletor.module').then( m => m.ColetorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.component').then( m => m.LoginComponent)
  },
  {
    path: 'operacoes',
    loadChildren: () => import('./operacoes/operacoes.module').then( m => m.OperacoesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
