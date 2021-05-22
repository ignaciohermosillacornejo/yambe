import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePageComponent implements OnInit {
  public cards: Card[];

  constructor(
    public firebaseService: FirebaseService,
  ) { }

  public async ngOnInit(): Promise<void> {
    console.log('GamePageComponent');
    this.cards = await this.firebaseService.getDeck();
    console.log('this.cards', this.cards);
  }
}
