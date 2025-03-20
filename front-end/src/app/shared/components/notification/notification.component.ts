import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (show) {
      <div
        class="fixed top-4 right-4 z-50 px-4 py-3 rounded-md shadow-lg"
        [ngClass]="{
          'bg-green-50': type === 'success',
          'bg-red-50': type === 'error'
        }"
        role="alert">
        <div class="flex">
          <div class="flex-shrink-0">
            @if (type === 'success') {
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            } @else {
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            }
          </div>
          <div class="ml-3">
            <p [ngClass]="{
              'text-green-800': type === 'success',
              'text-red-800': type === 'error'
            }" class="text-sm font-medium">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    }
  `
})
export class NotificationComponent {
  @Input() show = false;
  @Input() message = '';
  @Input() type: 'success' | 'error' = 'success';
}
