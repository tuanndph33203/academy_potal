import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
})
export class Skeleton {
  // Kích thước
  pdWidth = input<string>('100%');
  pdHeight = input<string>('1rem');

  // Bo góc
  borderRadius = input<string>('8px');

  // Hình dạng: 'rect' | 'circle' | 'text'
  shape = input<'rect' | 'circle' | 'text'>('rect');

  // Hiệu ứng animation: 'pulse' | 'none' | 'wave'
  animation = input<'pulse' | 'none' | 'wave'>('wave');

  // Thêm class tùy chỉnh
  styleClass = input<string>('');

  // Ẩn skeleton
  visible = input<boolean>(true);
}
