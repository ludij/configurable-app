import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerElement } from '@elements';
import { ButtonComponent, CardComponent } from '@components';

@Component({
  imports: [RouterModule, BannerElement, ButtonComponent, CardComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'configurable-app';
}
