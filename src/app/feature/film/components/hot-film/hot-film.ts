import { Component, inject, input, signal } from '@angular/core';
import { FilmCarousel } from '../../../../share/components/film-carousel/film-carousel';
import { FilmService } from '../../../../core/services/film.service';
import { Slick } from '../../../../core/models/common.model';

@Component({
  selector: 'app-hot-film',
  imports: [FilmCarousel],
  templateUrl: './hot-film.html',
  styleUrl: './hot-film.scss',
})
export class HotFilm {
  hotMovies = input<any | undefined>(undefined);
  type = input.required<any>();
  slideConfig = signal<Slick.Config>({
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6 } },
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  });
}
