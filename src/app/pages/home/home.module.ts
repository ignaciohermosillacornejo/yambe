import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponentModule } from 'src/app/components/card/card.component.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
    CardComponentModule,
  ],
  providers: [
    FirebaseService,
  ],
  declarations: [
    HomePage,
  ]
})
export class HomePageModule {}
