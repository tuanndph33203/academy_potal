import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true,
  pure: true,
})
export class ImagePipe implements PipeTransform {
  transform(value: unknown, type: 'short' | 'full' = 'full'): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    const apiBase = 'https://phimimg.com';
    const apiWebp = 'https://phimapi.com/image.php';

    if (type === 'short') {
      return `${apiWebp}?url=${apiBase}/${value}`;
    }

    return `${apiWebp}?url=${value}`;
  }
}
