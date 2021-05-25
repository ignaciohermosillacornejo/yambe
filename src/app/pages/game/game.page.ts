import { Component, Host, HostListener, OnInit } from '@angular/core';
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

  @HostListener('window:beforeunload')
  private async removeUser() {
    // TODO do not run this when user reloads page
    

  }

  private async addUser(): Promise<void>{
    // TODO return error if user can't be added for some reason
    // TOOD if user is already on game, don't add him twice

  }

  public async ngOnInit(): Promise<void> {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.cards = await this.firebaseService.getDeck();

    await this.addUser();
  }
}
