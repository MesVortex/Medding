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
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Wedding RSVP</h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          @if (loading) {
            <div class="flex justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          } @else if (error) {
            <div class="rounded-md bg-red-50 p-4">
              <div class="flex">
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
                </div>
              </div>
            </div>
          } @else if (success) {
            <div class="rounded-md bg-green-50 p-4">
              <div class="flex">
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-green-800">{{ success }}</h3>
                </div>
              </div>
            </div>
          } @else {
            <div class="space-y-6">
              <p class="text-center text-sm text-gray-600">
                Please confirm your attendance to the wedding
              </p>
              <div class="flex flex-col space-y-4">
                <button
                  (click)="respondToInvitation('ACCEPTED')"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Accept Invitation
                </button>
                <button
                  (click)="respondToInvitation('DECLINED')"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Decline Invitation
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
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
        this.success = `You have successfully ${response.toLowerCase()} the invitation`;
        // Optionally redirect after a delay
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
