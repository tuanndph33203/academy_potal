import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToHour',
})
export class TimeToHourPipe implements PipeTransform {
  transform(value: string): string {
    const match = value.match(/(\d+)\s*phút/);
    const minutes = match ? +match[1] : 0;
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    return hours > 0 ? `${hours} giờ ${remaining} phút` : `${remaining} phút`;
  }
}
