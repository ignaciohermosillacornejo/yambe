import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePageComponent implements OnInit {
  public cards: Card[];
  public id: String;

  constructor(
    public firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
  ) { }

  public async ngOnInit(): Promise<void> {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    console.log('GamePageComponent');
    console.log(this.id);
    this.cards = await this.firebaseService.getDeck();
    console.log('this.cards', this.cards);
  }
}
