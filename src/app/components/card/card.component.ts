import { Component, Input, OnInit } from '@angular/core';
import { CardType } from 'src/app/models/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public content: string;
  @Input() public cardType: CardType;

  constructor() { }

  ngOnInit(): void {
  }

  public get color() { return this.cardType === 'question' ? 'black' : 'white'; }
}
