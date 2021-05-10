import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CardComponentModule } from './components/card/card.component.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  entryComponents: [
    CardComponentModule
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    AuthService
  ]
})
export class AppModule { }
