import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent implements OnInit {
  public cards: Card[];

  constructor(
    public router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  // simple form to get the display name of the user
  loginForm = this.formBuilder.group({
    displayName: '',
  });

  async submitLoginForm(){
    await this.authService.anonymousLogin(this.loginForm.value.displayName);
  }

  public ngOnInit(): void {
  }

  public startGame(): void {
    this.router.navigateByUrl('/game');
  }
}
