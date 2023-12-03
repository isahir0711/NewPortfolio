import { Component, Input } from '@angular/core';
import { CardInfo } from '../../../DTOS/cardDTO';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  CardInfo!: CardInfo;

  constructor() {
  }
}
