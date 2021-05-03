import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent implements OnInit {
  public cards: Card[];

  constructor(
    public router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public startGame(): void {
    this.router.navigateByUrl('/game');
  }
}
