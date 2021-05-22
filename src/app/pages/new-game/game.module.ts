import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponentModule } from 'src/app/components/card/card.component.module';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { GamePageComponent } from './game.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GamePageComponent,
      },
    ]),
    CardComponentModule,
  ],
  providers: [
    FirebaseService,
  ],
  declarations: [
    GamePageComponent,
  ]
})
export class GamePageModule {}
