import { Component } from '@angular/core';

@Component({
  selector: 'app-home-care-category',
  imports: [],
  templateUrl: './home-care-category.html',
  styleUrl: './home-care-category.scss',
})
export class HomeCareCategory {
  items = [
    { label: 'Marvel' },
    { label: '4K' },
    { label: 'Sitcom' },
    { label: 'Lồng Tiếng Cực Mạnh' },
    { label: 'Xuyên Không' },
    { label: 'Cổ Trang' },
    { label: '+4 chủ đề' },
  ];
}
