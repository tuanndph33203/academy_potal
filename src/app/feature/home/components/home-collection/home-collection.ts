import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FilmService } from '../../../../core/services/film.service';
import { ArrowLeft, ArrowRight, FileIcon, LucideAngularModule } from 'lucide-angular';
import { FilmCarousel } from '../../../../share/components/film-carousel/film-carousel';
import { TypeFilm } from '../../../../core/constants/film.constant';

@Component({
  selector: 'app-home-collection',
  imports: [CommonModule, LucideAngularModule, FilmCarousel],
  templateUrl: './home-collection.html',
  styleUrl: './home-collection.scss',
})
export class HomeCollection {
  readonly icons = {
    ArrowRight,
    ArrowLeft,
  };
  readonly FileIcon = FileIcon;
  country = input.required<{ id: string; name: string; slug: string }>();
  movies = signal<any[]>([]);

  private filmService = inject(FilmService);

  ngOnInit() {
    this.filmService
      .getFilms(TypeFilm.PhimBo, { country: this.country().slug })
      .subscribe((res) => {
        this.movies.set(res.items.data.items);
      });
  }
}
