import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  show(message: string, type: 'success' | 'error' = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: type === 'success' ? '#22c55e' : '#ef4444',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '15px',
      zIndex: 9999,
      transition: 'opacity 0.3s',
      opacity: '1',
    });

    document.body.appendChild(toast);
    setTimeout(() => (toast.style.opacity = '0'), 2200);
    setTimeout(() => toast.remove(), 2500);
  }
}
