import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.interface';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public cards: Card[];

  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
  ) { }

  public ngOnInit(): void {
    console.log('HomePage');
    this.firebaseService.getCards().subscribe(
      (cards) => {
        console.log('cards', cards);
        this.cards = cards;
      }
    );
  }

  public startGame(): void {
    this.router.navigateByUrl('/game');
  }
}
