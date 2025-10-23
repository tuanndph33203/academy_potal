import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { MovieItem } from '../../../../core/models/movie.model';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { FilmService } from '../../../../core/services/film.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home-banner',
  imports: [CommonModule, SlickCarouselModule],
  standalone: true,
  templateUrl: './home-banner.html',
  styleUrl: './home-banner.scss',
})
export class HomeBanner {
  private filmService = inject(FilmService);
  data = signal<Array<MovieItem>>([]);
  movie = signal<MovieItem | undefined>(undefined);
  currentIndex = signal<number>(0);
  @ViewChild('movieInfo') movieInfo?: ElementRef;
  @ViewChild('mainSlider') mainSlider!: SlickCarouselComponent;

  tags = ['Chính Kịch', 'Chiếu Rạp', 'Tình Cảm', 'Gia Đình', 'Hài', 'Lãng Mạn'];
  previews = [
    'https://image.tmdb.org/t/p/w300/6oZE1l6Bq9VHtVxo1cWmvMRGsiE.jpg',
    'https://image.tmdb.org/t/p/w300/l9wQbSleqU9jwELPDQJrNqxabvQ.jpg',
    'https://image.tmdb.org/t/p/w300/3VQj6m0NnSboN3Wf9eKJeNEgnbW.jpg',
    'https://image.tmdb.org/t/p/w300/2k9GkYzN7AEBR2zQfM9vDOMkMt2.jpg',
    'https://image.tmdb.org/t/p/w300/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg',
  ];

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
    this.filmService.getNewUpdates().subscribe((res) => {
      this.data.set(res.items);
      this.movie.set(res.items[0]);
    });
  }

  ngAfterViewInit() {
    this.animateMovieInfo();
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
