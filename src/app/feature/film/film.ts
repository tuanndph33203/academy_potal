import { Component, inject, signal } from '@angular/core';
import { FilmService } from '../../core/services/film.service';
import {
  FilterConfig,
  FilterKey,
  FilterKeyLabel,
  typePilmOptions,
} from '../../core/constants/film.constant';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImagePipe } from '../../core/pipe/image-pipe';
import { TimeToHourPipe } from '../../core/pipe/time-to-hour-pipe';
import { Skeleton } from '../../share/components/skeleton/skeleton';
import { finalize } from 'rxjs';
import { NumberToArrayPipe } from '../../core/pipe/number-to-array-pipe';
import { HotFilm } from './components/hot-film/hot-film';
import { Funnel, LucideAngularModule } from 'lucide-angular';

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
    LucideAngularModule,
  ],
  templateUrl: './film.html',
  styleUrl: './film.scss',
})
export class Film {
  icons = { Funnel };
  type = signal<any | undefined>(undefined);

  movies = signal<any[]>([]);
  hotMovies = signal<any[]>([]);
  page = signal(1);
  totalPages = signal(1);
  totalItems = signal(0);
  isLoading = signal(true);
  openFilter = signal(false);
  selected = signal<Record<string, string>>({
    country: 'Tất cả',
    type: 'Tất cả',
    rating: 'Tất cả',
    genre: 'Tất cả',
    version: 'Tất cả',
    year: 'Tất cả',
    sort: 'Mới nhất',
  });

  limit = 32;

  filters = FilterConfig;
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

  select(category: string | null, value: string) {
    this.selected.update((prev) => ({ ...prev, [category ?? '']: value }));
  }

  applyFilters() {
    console.log('Applied filters:', this.selected());
  }

  formatLabel(key: string): string {
    return FilterKeyLabel[key];
  }
}
