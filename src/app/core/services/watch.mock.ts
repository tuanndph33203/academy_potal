import { Injectable, signal } from '@angular/core';
import { AnimeItem, Episode, StreamServer } from '../models/movie.model';
@Injectable({ providedIn: 'root' })
export class WatchMockService {
  title = 'Everything Perfect World';
  duration = 19 * 60 + 55; // seconds
  // demo stream url (replace with real)
  defaultVideo =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  episodes = signal<any[]>(
    Array.from({ length: 100 }, (_, i) => ({ index: i + 1, title: `Episode ${i + 1}` })),
  );

  subServers = signal<StreamServer[]>([
    {
      label: 'SUB',
      kind: 'SUB',
      sources: [
        { name: 'Vidstreaming', url: this.defaultVideo },
        { name: 'Vidcloud', url: this.defaultVideo },
      ],
    },
  ]);

  rawServers = signal<StreamServer[]>([
    { label: 'RAW', kind: 'RAW', sources: [{ name: 'DoodVideo', url: this.defaultVideo }] },
  ]);

  topToday = signal<AnimeItem[]>(this.sample(10, 'today'));
  topWeek = signal<AnimeItem[]>(this.sample(10, 'week'));
  topMonth = signal<AnimeItem[]>(this.sample(10, 'month'));

  private sample(n: number, scope: string): AnimeItem[] {
    return Array.from({ length: n }, (_, i) => ({
      id: `${scope}-${i + 1}`,
      title:
        [
          'One Piece',
          'Gachiakuta',
          'One-Punch Man 3',
          'Chainsaw Man',
          'Naruto: Shippuden',
          'My Hero Academia',
          'Monster Meet, Milady!',
        ][i % 7] + ` #${i + 1}`,
      thumb: `https://picsum.photos/seed/${scope}-${i}/120/160`,
      views: Math.floor(Math.random() * 20000) + 4000,
      rank: i + 1,
    }));
  }
}
