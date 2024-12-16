import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, Platform } from '@ionic/angular';
import { Html5Qrcode } from 'html5-qrcode';
import { Router } from '@angular/router'; // Importar el Router

@Component({
  selector: 'app-codigo-alumno-qr',
  templateUrl: './codigo-alumno-qr.page.html',
  styleUrls: ['./codigo-alumno-qr.page.scss'],
})
export class CodigoAlumnoQrPage implements OnInit, AfterViewInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  scannerId = 'reader'; // ID del contenedor para el escaneo en navegador
  html5QrCode: Html5Qrcode | null = null;

  constructor(
    private alertController: AlertController,
    private platform: Platform,
    private router: Router // Inyectar el Router
  ) {}

  ngOnInit() {
    this.platform.ready().then(async () => {
      if (this.platform.is('capacitor')) {
        const result = await BarcodeScanner.isSupported();
        this.isSupported = result.supported;
      } else {
        this.isSupported = true;
      }
    });
  }

  ngAfterViewInit() {
    if (!this.platform.is('capacitor') && this.isSupported) {
      this.html5QrCode = new Html5Qrcode(this.scannerId);
    }
  }

  async escanearQr() {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso NO concedido', 'DA EL PERMISO PARA QUE LA CAMARA PUEDA INICIAR EL SCANEO');
      return;
    }

    if (this.platform.is('capacitor') && this.isSupported) {
      const scanResult = await BarcodeScanner.scan();
      if (scanResult.barcodes.length > 0) {
        const contenidoQr = scanResult.barcodes[0].displayValue || ''; // Contenido escaneado
        this.marcarAsistencia(contenidoQr);
        this.router.navigate(['/sala-espera', { contenido: contenidoQr }]); // Redirigir
      } else {
        this.presentAlert('Error', 'No se detectó contenido en el escaneo.');
      }
    } else if (this.html5QrCode) {
      const readerElement = document.getElementById('reader');
      if (readerElement) {
        this.html5QrCode
          .start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: readerElement.clientWidth, height: readerElement.clientWidth } },
            (decodedText: string) => {
              this.html5QrCode?.stop();
              this.router.navigate(['/', { contenido: decodedText }]); // Redirigir
            },
            (errorMessage: string) => console.error('Error de escaneo:', errorMessage)
          )
          .catch((err: any) => console.error('Error al iniciar el escáner', err));
      } else {
        console.error('El contenedor #reader no está disponible en el DOM.');
      }
    }
  }

  marcarAsistencia(content: string) {
    console.log(`Asistencia registrada para el contenido: ${content}`);
    
  }

  async requestPermissions(): Promise<boolean> {
    if (this.platform.is('capacitor')) {
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === 'granted' || camera === 'limited';
    }
    return true;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
