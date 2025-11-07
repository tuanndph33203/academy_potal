import { Component, inject, input, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { Slick } from '../../../core/models/common.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { ImagePipe } from '../../../core/pipe/image-pipe';
import { Skeleton } from '../skeleton/skeleton';
import { TimeToHourPipe } from '../../../core/pipe/time-to-hour-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-film-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, ImagePipe, TimeToHourPipe, Skeleton, RouterLink],

  templateUrl: './film-carousel.html',
  styleUrl: './film-carousel.scss',
})
export class FilmCarousel implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  data = input.required<any[]>();
  slideConfig = input<Slick.Config | undefined>(undefined);
  styleClass = input<string | undefined>(undefined);

  slideConfigOrigin = signal<Slick.Config>({
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    edgeFriction: 0.2,
    swipeToSlide: true,
    prevArrow: `
      <button class="slick-prev">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
      </button>
    `,
    nextArrow: `
      <button class="slick-next">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    `,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 7 } },
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 640, settings: { slidesToShow: 3 } },
    ],
  });

  skeletons = Array.from({ length: 10 }, (_, i) => i);

  private platformId: Object = inject(PLATFORM_ID);
  isBrowser = signal(isPlatformBrowser(this.platformId));

  ngOnInit(): void {
    const inputConfig = this.slideConfig();
    if (inputConfig) {
      this.slideConfigOrigin.update((prev) => ({
        ...prev,
        ...inputConfig,
      }));
    }
  }

  getLang(lang: string): string[] {
    const multyLang = lang.split('+');
    console.log(multyLang);

    return multyLang;
  }
}
