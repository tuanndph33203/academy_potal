import { Component, inject, OnInit, signal } from '@angular/core';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { FilmCarousel } from '../../../../share/components/film-carousel/film-carousel';
import { FilmService } from '../../../../core/services/film.service';
import { TypeFilm } from '../../../../core/constants/film.constant';
import { Slick } from '../../../../core/models/common.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-new-movie',
  imports: [CommonModule, LucideAngularModule, FilmCarousel],
  templateUrl: './home-new-movie.html',
  styleUrl: './home-new-movie.scss',
})
export class HomeNewMovie implements OnInit {
  readonly icons = {
    ArrowRight,
  };
  slideConfig = signal<Slick.Config>({
    slidesToShow: 7,
    slidesToScroll: 1,
    prevArrow: '',
    nextArrow: '',
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6 } },
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  });
  movies = signal<any[]>([]);
  private filmService = inject(FilmService);

  ngOnInit() {
    this.filmService.getFilms(TypeFilm.PhimLe).subscribe((res) => {
      this.movies.set(res.items.data.items);
      console.log(this.movies());
    });
  }
}
