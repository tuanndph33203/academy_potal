import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import dayjs from 'dayjs';
import {
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
  Maximize,
  Play,
  Settings,
  Volume2,
} from 'lucide-angular';
import { WatchMockService } from '../../core/services/watch.mock';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FilmService } from '../../core/services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TypeEpisodeLabel, TypeServerLabel } from '../../core/constants/film.constant';

@Component({
  selector: 'app-watch',
  imports: [CommonModule, SlickCarouselModule, LucideAngularModule],
  templateUrl: './watch.html',
  styleUrl: './watch.scss',
})
export class Watch implements OnInit {
  sanitizer = inject(DomSanitizer);
  svc = inject(WatchMockService);
  filmService = inject(FilmService);
  router = inject(Router);
  activateRouter = inject(ActivatedRoute);
  safeUrl = signal<SafeResourceUrl | null>(null);

  movie = signal<any>(undefined);
  currentServer = signal<any>(undefined);
  currentEp = signal<any>(undefined);
  activeSourceIdx = signal(0);

  icons = { Play, ChevronLeft, ChevronRight, Settings, Maximize, Volume2 };

  // sidebar tabs
  tab = signal<'today' | 'week' | 'month'>('today');
  topList = computed(() =>
    this.tab() == 'today'
      ? this.svc.topToday()
      : this.tab() == 'week'
        ? this.svc.topWeek()
        : this.svc.topMonth(),
  );

  durationFmt = computed(() => {
    const d = this.svc.duration;
    const m = Math.floor(d / 60)
      .toString()
      .padStart(2, '0');
    const s = (d % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  });

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    infinite: false,
    arrows: false,
    adaptiveHeight: true,
  };
  constructor() {
    effect(() => {
      const mv = this.movie();
      if (mv?.episodes?.[0]?.server_data?.length) {
        const first = mv.episodes[0].server_data[0];
        this.safeUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(first.link_embed));
        this.currentServer.set(mv.episodes[0]);
        this.currentEp.set(first);
      }
    });
  }

  ngOnInit() {
    this.activateRouter.params.subscribe((params: any) => {
      const { slug } = params;
      this.filmService.getFilm(slug).subscribe((res) => {
        this.movie.set(res.items);
        console.log(this.movie());
      });
    });
  }

  setServer(server: string) {
    this.currentServer.set(server);
  }

  setEposide(ep: any) {
    console.log(ep.link_embed);

    this.safeUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(ep.link_embed));
    console.log(this.safeUrl());

    this.currentEp.set(ep);
  }

  getEpisodeLabel(type: 'series' | 'single'): string {
    return TypeEpisodeLabel[type];
  }
  getServerLabel(type: string): string {
    return type.includes(TypeServerLabel.sub) ? TypeServerLabel.sub : TypeServerLabel.dub;
  }
}
