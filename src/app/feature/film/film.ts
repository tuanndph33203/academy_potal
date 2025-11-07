import { Component, inject, signal } from '@angular/core';
import { FilmService } from '../../core/services/film.service';
import { typePilmOptions } from '../../core/constants/film.constant';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImagePipe } from '../../core/pipe/image-pipe';
import { TimeToHourPipe } from '../../core/pipe/time-to-hour-pipe';
import { Skeleton } from '../../share/components/skeleton/skeleton';
import { finalize } from 'rxjs';
import { NumberToArrayPipe } from '../../core/pipe/number-to-array-pipe';
import { HotFilm } from './components/hot-film/hot-film';

@Component({
  selector: 'app-film',
  imports: [
    RouterLink,
    CommonModule,
    ImagePipe,
    TimeToHourPipe,
    NumberToArrayPipe,
    Skeleton,
    NgOptimizedImage,
    HotFilm,
  ],
  templateUrl: './film.html',
  styleUrl: './film.scss',
})
export class Film {
  type = signal<any | undefined>(undefined);

  movies = signal<any[]>([]);
  hotMovies = signal<any[]>([]);
  page = signal(1);
  totalPages = signal(1);
  totalItems = signal(0);
  isLoading = signal(true);
  limit = 32;

  private filmService = inject(FilmService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const typeParam = typePilmOptions.find((item) => item.value === params['type']);
      if (typeParam) {
        this.type.set(typeParam);
        this.page.set(1);
        this.loadFilms();
        this.loadHotFilms();
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  loadFilms() {
    if (!this.type) return;
    this.movies.set([]);
    this.isLoading.set(true);

    this.filmService
      .getFilms(this.type()?.value, { limit: this.limit, page: this.page() })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((res) => {
        const data = res.items.data;
        this.movies.set(data.items);
        this.totalPages.set(data.params.pagination.totalPages);
        this.totalItems.set(data.params.pagination.totalItems);
      });
  }
  loadHotFilms() {
    if (!this.type) return;
    this.filmService.getFilms(this.type()?.value, { limit: 10 }).subscribe((res) => {
      const data = res.items.data;
      this.hotMovies.set(data.items);
    });
  }
  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.loadFilms();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.loadFilms();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
