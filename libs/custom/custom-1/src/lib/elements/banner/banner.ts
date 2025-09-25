import { Component } from '@angular/core';
import { ButtonComponent } from '@components';
import { BannerElement } from '@shared/ui/elements';

@Component({
  selector: 'banner-element',
  imports: [ButtonComponent],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
class Custom1BannerElement extends BannerElement { }

export { Custom1BannerElement as BannerElement };
