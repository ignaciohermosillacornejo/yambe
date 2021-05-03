import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponentModule } from 'src/app/components/card/card.component.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GamePage } from './game.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GamePage,
      },
    ]),
    CardComponentModule,
  ],
  providers: [
    FirebaseService,
  ],
  declarations: [
    GamePage,
  ]
})
export class GamePageModule {}
