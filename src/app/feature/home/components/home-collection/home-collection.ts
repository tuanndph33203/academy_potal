import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, input, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { FilmService } from '../../../../core/services/film.service';
import { ImagePipe } from '../../../../core/pipe/image-pipe';
import { ArrowLeft, ArrowRight, FileIcon, LucideAngularModule } from 'lucide-angular';
import { FilmCarousel } from '../../../../share/components/film-carousel/film-carousel';

@Component({
  selector: 'app-home-collection',
  imports: [CommonModule, SlickCarouselModule, ImagePipe, LucideAngularModule, FilmCarousel],
  templateUrl: './home-collection.html',
  styleUrl: './home-collection.scss',
})
export class HomeCollection {
  readonly icons = {
    ArrowRight,
    ArrowLeft,
  };
  country = input.required<{ id: string; name: string; slug: string }>();
  readonly FileIcon = FileIcon;

  private filmService = inject(FilmService);
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  private platformId: Object = inject(PLATFORM_ID);
  movies = signal<any[]>([]);

  slideConfig = {
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    edgeFriction: 0.2,
    swipeToSlide: true,
    prevArrow: `
    <button class="slick-prev">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  `,
    nextArrow: `
    <button class="slick-next">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
    </button>
  `,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 7 } },
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 640, settings: { slidesToShow: 3 } },
    ],
  };
  ngOnInit() {
    this.filmService.getFilmByCountry(this.country().slug).subscribe((res) => {
      this.movies.set(res.items.data.items);
    });
  }
}
