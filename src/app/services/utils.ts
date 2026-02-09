import { Injectable, inject } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
    router = inject(Router);

  // ========== Loading ==========
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  // ========== Toast ==========
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  //============= Enruta a cualquier pagina disponible =============//
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //============= Guarda un elemento en localStorage =============//
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  //============= Obtiene un eleme =============//
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }
}
