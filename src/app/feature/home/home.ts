import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeBanner } from './components/home-banner/home-banner';
import { HomeCareCategory } from './components/home-care-category/home-care-category';
import { MovieItem } from '../../core/models/movie.model';
import { HomeCollection } from './components/home-collection/home-collection';
import { CountryService } from '../../core/services/country.service';
import { HomeNewMovie } from './components/home-new-movie/home-new-movie';
import { HomeNewAnime } from './components/home-new-anime/home-new-anime';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomeBanner, HomeCareCategory, HomeCollection, HomeNewMovie, HomeNewAnime],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private countryService = inject(CountryService);
  private title = inject(Title);
  private meta = inject(Meta);
  countrys = signal<any[]>([]);
  visibleCountries = signal<any[]>([]);
  batchSize = 4;
  index = 0;
  loading = false;

  ngOnInit() {
    this.title.setTitle('Flix Maven - Trang chủ');
    this.meta.updateTag({
      name: 'description',
      content: 'Welcome to the Home Page of our Angular Application.',
    });
    this.countryService.getCountrys().subscribe((res) => {
      this.countrys.set(res.items);
      this.loadNextBatch();
    });
  }
  loadNextBatch() {
    if (this.loading) return;
    this.loading = true;
    const next = this.countrys().slice(this.index, this.index + this.batchSize);
    this.visibleCountries.update((curr) => [...curr, ...next]);
    this.index += this.batchSize;
    this.loading = false;
  }
}
