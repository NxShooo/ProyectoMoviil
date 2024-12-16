import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ServicioLogin } from '../../servicios/crudrestablecer.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RecuperarContrasenaPage {
  usuario: string = "";
  nuevaContrasena: string = "";
  codigoSeguridad: string = '';

  constructor(
    private controladorToast: ToastController,
    private controladorAlerta: AlertController,
    private servicioCrudApi: ServicioLogin,
  ) {}


}