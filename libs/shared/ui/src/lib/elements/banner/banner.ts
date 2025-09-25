import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@components';

@Component({
  selector: 'banner-element',
  imports: [ButtonComponent],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
class BannerElement implements OnInit {
  ngOnInit(): void {
    console.log('=> every banner element logs this message');
  }
}

export { BannerElement };
