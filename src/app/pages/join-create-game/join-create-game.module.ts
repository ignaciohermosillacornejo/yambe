import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponentModule } from 'src/app/components/card/card.component.module';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { JoinCreateGamePageComponent } from './join-create-game.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: JoinCreateGamePageComponent,
      },
    ]),
    CardComponentModule,
  ],
  providers: [
    FirebaseService,
  ],
  declarations: [
    JoinCreateGamePageComponent,
  ]
})
export class JoinCreateGamePageModule {}
