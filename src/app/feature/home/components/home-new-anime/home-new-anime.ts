import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { ArrowRight, LucideAngularModule, Play } from 'lucide-angular';
import { FilmService } from '../../../../core/services/film.service';
import { TypeFilm } from '../../../../core/constants/film.constant';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ImagePipe } from '../../../../core/pipe/image-pipe';
import { MovieItem } from '../../../../core/models/movie.model';
import { gsap } from 'gsap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-new-anime',
  imports: [CommonModule, LucideAngularModule, SlickCarouselModule, ImagePipe, RouterLink],
  templateUrl: './home-new-anime.html',
  styleUrl: './home-new-anime.scss',
})
export class HomeNewAnime implements OnInit, AfterViewInit {
  @ViewChild('movieInfo') movieInfo?: ElementRef;
  @ViewChild('mainSlider') mainSlider!: SlickCarouselComponent;
  currentIndex = signal<number>(0);
  icons = {
    ArrowRight,
    Play,
  };
  movies = signal<MovieItem[]>([]);
  movie = signal<MovieItem | undefined>(undefined);
  private filmService = inject(FilmService);
  private platformId = inject(PLATFORM_ID);
  isBrowser = signal(isPlatformBrowser(this.platformId));
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
  };

  ngOnInit() {
    this.filmService.getFilms(TypeFilm.HoatHinh).subscribe((res) => {
      this.movies.set(res.items.data.items);
      this.movie.set(res.items.data.items[0]);
      console.log(this.movie());
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser()) {
      this.animateMovieInfo();
    }
  }

  onSlideChange(event: any) {
    this.currentIndex.set(event.nextSlide);
    const movies = this.movies();
    this.movie.set(movies[this.currentIndex()]);
    this.animateMovieInfo();
  }

  goToSlide(index: number) {
    this.mainSlider.slickGoTo(index);
  }

  animateMovieInfo() {
    if (this.movieInfo?.nativeElement) {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
      });

      tl.from(this.movieInfo.nativeElement, { x: -100, opacity: 0 });
    }
  }
}
