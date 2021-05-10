import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent implements OnInit {
  public cards: Card[];

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  public ngOnInit(): void {
  }

  public startGame(): void {
    this.router.navigateByUrl('/game');
  }
}
