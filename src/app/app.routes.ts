import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.component').then(m => m.ChatComponent)
  },

  {
    path: 'calc-imc',
    loadComponent: () => import('./pages/calc-imc/calc-imc.component').then(m => m.CalcImcComponent)
  },

  {
    path: 'finances',
    loadComponent: () => import('./pages/fincance-controller/fincance-controller.component').then(m => m.FincanceControllerComponent)
  },

  {
    path: 'organograma',
    loadComponent: () => import('./pages/org-tech/org-tech.component').then(m => m.OrgTechComponent)
  },
  {
    path: 'avd-form',
    loadComponent: () => import('./pages/avd-form/avd-form.component').then(m => m.AvdFormComponent)
  },


  {
    path: '**',
    redirectTo: 'home'
  }
];
