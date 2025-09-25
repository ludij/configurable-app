import { Component } from '@angular/core';
import { ButtonComponent } from '@components';

@Component({
  selector: 'card-component',
  imports: [ButtonComponent],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
class CardComponent { }

export { CardComponent };
