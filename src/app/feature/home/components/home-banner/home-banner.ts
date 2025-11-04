import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { MovieItem } from '../../../../core/models/movie.model';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { FilmService } from '../../../../core/services/film.service';
import { gsap } from 'gsap';
import { ImagePipe } from '../../../../core/pipe/image-pipe';
import { LucideAngularModule, Play } from 'lucide-angular';
import { TimeToHourPipe } from '../../../../core/pipe/time-to-hour-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-banner',
  imports: [
    CommonModule,
    SlickCarouselModule,
    ImagePipe,
    TimeToHourPipe,
    LucideAngularModule,
    RouterLink,
  ],
  standalone: true,
  templateUrl: './home-banner.html',
  styleUrl: './home-banner.scss',
})
export class HomeBanner {
  @ViewChild('movieInfo') movieInfo?: ElementRef;
  @ViewChild('mainSlider') mainSlider!: SlickCarouselComponent;
  readonly icons = { Play };
  data = signal<Array<MovieItem>>([]);
  movie = signal<MovieItem | undefined>(undefined);
  currentIndex = signal<number>(0);
  tabs = ['Ngày', 'Tuần', 'Tháng', 'Tất cả'];
  activeTab = signal('Ngày');

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

  private platformId = inject(PLATFORM_ID);
  isBrowser = signal(isPlatformBrowser(this.platformId));
  private filmService = inject(FilmService);

  ngOnInit() {
    this.filmService.getNewUpdates().subscribe((res) => {
      this.data.set(res.items);
      this.movie.set(res.items[0]);
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser()) {
      this.animateMovieInfo();
    }
  }

  onSlideChange(event: any) {
    this.currentIndex.set(event.nextSlide);
    const movies = this.data();
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
