import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, input, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { FilmService } from '../../../../core/services/film.service';
import { ImagePipe } from '../../../../core/pipe/image-pipe';
import { ArrowLeft, ArrowRight, FileIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home-collection',
  imports: [CommonModule, SlickCarouselModule, ImagePipe, LucideAngularModule],
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
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    dots: false,
    prevArrow: `
    <button class="slick-prev">
        <lucide-angular [img]="icons.ArrowRight"></lucide-angular>
    </button>
  `,
    nextArrow: `
    <button class="slick-next">
<
    </button>,`,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  ngOnInit() {
    this.filmService.getFilmByCountry(this.country().slug).subscribe((res) => {
      this.movies.set(res.items.data.items);
    });
  }
}
