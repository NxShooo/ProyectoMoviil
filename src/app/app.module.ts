import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//librerias

import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { AngularFireModule} from '@angular/fire/compat'
import { QrCodeModule } from 'ng-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './servicios/usuario.service';
@NgModule({
  declarations: [AppComponent],
  imports: [QrCodeModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),AngularFirestoreModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(),UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
