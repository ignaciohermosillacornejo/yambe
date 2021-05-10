import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponentModule } from 'src/app/components/card/card.component.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HomePageComponent } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent,
      },
    ]),
    CardComponentModule,
  ],
  declarations: [
    HomePageComponent,
  ]
})
export class HomePageModule {}
