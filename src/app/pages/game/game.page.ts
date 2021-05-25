import { Component, Host, HostListener, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { QUESTION } from 'src/constants/cards.constant';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePageComponent implements OnInit {
  public cards: Card[];
  public id: string;
  public questionCard: Card;
  public selectedCard: Card;

  constructor(
    public firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private functions: AngularFireFunctions,
  ) { }

  @HostListener('window:beforeunload')
  private async removeUser() {
    // TODO do not run this when user reloads page (investigate how, posible filter by $event?)
    const removeUserCallable = this.functions.httpsCallable('removeUserFromGame');
    // TODO error handling
    await removeUserCallable({gameId: this.id}).toPromise();

  }

  private async addUser(): Promise<void>{
    // TODO return error if user can't be added for some reason
    const addUserCallable = this.functions.httpsCallable('addUserToGame');
    // TODO error handling
    await addUserCallable({gameId: this.id}).toPromise();
  }

  public async ngOnInit(): Promise<void> {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.cards = await this.firebaseService.getDeck();
    console.log('this.cards', this.cards);
    this.setQuestionCard();
  }

  public setQuestionCard() {
    // TODO: See what way we will asing the question card.
    for (const currentCard of this.cards) {
      if (currentCard.type ===  QUESTION) {
        this.questionCard = currentCard;
        return;
      }
    }
  }

  public async selectCard(id: string) {
    if (this.selectedCard) { this.selectedCard.selected = false; }
    this.selectedCard = this.cards.find(x => x.id === id);
    this.selectedCard.selected = !this.selectedCard.selected;
  }
}
