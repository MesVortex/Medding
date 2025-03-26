import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { RsvpStatus } from '../../models/guest.model';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#FFF9F5] py-12">
      <!-- Header Section with Decorative Background -->
      <div class="relative bg-gradient-to-r from-lavender/20 to-cream/30 py-16 mb-8 animate-fadeIn">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center">
            <h1 class="text-3xl md:text-5xl font-greatvibes text-purple mb-2 animate-float">Wedding RSVP</h1>
            <p class="text-sm md:text-base text-gray-700 max-w-2xl mx-auto">
              We're excited to celebrate our special day with you
            </p>
          </div>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div class="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple"></div>
          <div class="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-lavender"></div>
        </div>
      </div>

      <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow-lg rounded-lg border border-beige overflow-hidden animate-slideUp">
          <div class="px-6 py-5 border-b border-beige bg-gradient-to-r from-lavender/30 to-white">
            <h2 class="text-xl font-pacifico text-purple text-center">Please Respond</h2>
          </div>

          <div class="p-6">
            @if (loading) {
              <div class="flex justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple"></div>
              </div>
            } @else if (error) {
              <div class="rounded-md bg-red-50 p-4 mb-6 border border-red-200">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-red-800">{{ error }}</p>
                  </div>
                </div>
              </div>
            } @else if (success) {
              <div class="rounded-md bg-green-50 p-4 mb-6 border border-green-200 animate-fadeIn">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">{{ success }}</p>
                    <p class="mt-2 text-xs text-green-700">Redirecting you in a moment...</p>
                  </div>
                </div>
              </div>
            } @else {
              <div class="space-y-8">
                <div class="text-center">
                  <p class="text-gray-600 mb-2">
                    We would be honored to have you join us on our special day
                  </p>
                  <p class="text-sm text-gray-500">
                    Please confirm your attendance by selecting one of the options below
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    (click)="respondToInvitation('ACCEPTED')"
                    class="relative overflow-hidden group flex flex-col items-center justify-center p-6 border border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-300"
                  >
                    <div class="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg"></div>
                    <svg class="h-10 w-10 text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-green-700 font-medium">Joyfully Accept</span>
                  </button>

                  <button
                    (click)="respondToInvitation('DECLINED')"
                    class="relative overflow-hidden group flex flex-col items-center justify-center p-6 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-300"
                  >
                    <div class="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg"></div>
                    <svg class="h-10 w-10 text-red-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span class="text-red-700 font-medium">Regretfully Decline</span>
                  </button>
                </div>

                <div class="text-center text-xs text-gray-500 pt-4 border-t border-beige">
                  <p>Please respond by the requested date on your invitation</p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Decorative footer element -->
        <div class="mt-8 flex justify-center">
          <svg class="h-8 w-8 text-lavender/50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out forwards;
    }

    .animate-slideUp {
      animation: slideUp 0.5s ease-out forwards;
    }
  `]
})
export class RsvpComponent implements OnInit {
  loading = false;
  error: string | null = null;
  success: string | null = null;
  private token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private guestService: GuestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.error = 'Invalid invitation link';
    }
  }

  respondToInvitation(response: 'ACCEPTED' | 'DECLINED'): void {
    if (!this.token) return;

    this.loading = true;
    this.error = null;
    this.success = null;

    this.guestService.handleRsvp(this.token, response as RsvpStatus).subscribe({
      next: () => {
        this.loading = false;
        this.success = response === 'ACCEPTED'
          ? 'Thank you for accepting our invitation! We look forward to celebrating with you.'
          : 'Thank you for letting us know. We will miss your presence but understand.';

        // Redirect after a delay
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Failed to process your response';
      }
    });
  }
}
