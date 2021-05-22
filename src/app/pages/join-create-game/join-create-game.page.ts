import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'join-create-app-game',
  templateUrl: './join-create-game.page.html',
  styleUrls: ['./join-create-game.page.scss']
})
export class JoinCreateGamePageComponent implements OnInit {
  public invalidFormSubmitAttempt: boolean;
  private invalidFormSubmitAttemptTimeoutLock: number;

  constructor(
    public firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  private async showInvalidGameIdMessage(){
    clearTimeout(this.invalidFormSubmitAttemptTimeoutLock);
    this.invalidFormSubmitAttempt = true;
    this.invalidFormSubmitAttemptTimeoutLock = window.setTimeout(() => {
      this.invalidFormSubmitAttempt = false;
    }, 8000);
  }

  public async ngOnInit(): Promise<void> {
    this.invalidFormSubmitAttempt = false;
  }

  public joinGameForm = this.formBuilder.group({
    gameId: [null],
  })

  public async submitJoinGameForm(){
    const gameId = this.joinGameForm.value.gameId
    const validGameId = await this.firebaseService.validateGameId(gameId);
    if (validGameId) {
      this.router.navigateByUrl('/game/' + gameId);
    } else {
      await this.showInvalidGameIdMessage();
    }
  }
}
