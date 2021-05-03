import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.interface';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit {
  public cards: Card[];

  constructor(
    public firebaseService: FirebaseService,
  ) { }

  public ngOnInit(): void {
    console.log('GamePage');
    this.firebaseService.getCards().subscribe(
      (cards) => {
        console.log('cards', cards);
        this.cards = cards;
      }
    );
  }
}
