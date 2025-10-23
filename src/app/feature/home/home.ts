import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeBanner } from './components/home-banner/home-banner';
import { HomeCareCategory } from './components/home-care-category/home-care-category';
import { MovieItem } from '../../core/models/movie.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomeBanner, HomeCareCategory],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('FLIXMAVEN - Trang chủ');
    this.meta.updateTag({
      name: 'description',
      content: 'Welcome to the Home Page of our Angular Application.',
    });
  }
}
