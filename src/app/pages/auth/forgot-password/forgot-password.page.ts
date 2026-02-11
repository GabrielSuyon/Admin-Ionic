import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { arrowForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase';
import { UtilsService } from 'src/app/services/utils';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonButton,
    IonIcon,
    HeaderComponent,
    CustomInputComponent
  ]
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor() {
    addIcons({
      'arrow-forward': arrowForward
    });
  }

  ngOnInit() {
    // ✅ Eliminado el loop infinito
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      const email = this.form.value.email;

      // ✅ Verifica que el email sea exactamente el correcto
      console.log('📧 Email ingresado:', email);
      console.log('📧 Email trimmed:', email?.trim());
      console.log('📧 Tipo:', typeof email);

      this.firebaseSvc.sendRecoveryEmail(email?.trim()).then(res => {

        console.log('✅ Correo enviado exitosamente');

        this.utilsSvc.presentToast({
          message: `Correo enviado a ${email}`,
          duration: 2000,
          color: 'success',
          position: 'middle',
          icon: 'mail-outline'
        });

        this.utilsSvc.routerLink('/auth');
        this.form.reset();

      }).catch(error => {
        console.error('❌ ERROR al enviar correo:', error);
        console.error('Código:', error.code);
        console.error('Mensaje:', error.message);

        this.utilsSvc.presentToast({
          message: `Error: ${error.message}`,
          duration: 3000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    } else {
      console.log('❌ Formulario inválido');
    }
  }
}
