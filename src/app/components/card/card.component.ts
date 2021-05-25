import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardType } from 'src/app/models/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public id: string;
  @Input() public content: string;
  @Input() public cardType: CardType;
  @Input() public selected = false;
  @Output() public cardClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public get color() { return this.cardType === 'question' ? 'black' : 'white'; }

  public clickCard() { this.cardClick.emit(this.id); }
}
