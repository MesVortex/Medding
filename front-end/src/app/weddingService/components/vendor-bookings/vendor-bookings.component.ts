import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingServiceService } from '../../services/wedding-service.service';
import { ServiceBookingResponse } from '../../models/wedding-service.model';

@Component({
  selector: 'app-vendor-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor-bookings.component.html'
})
export class VendorBookingsComponent implements OnInit {
  bookings: ServiceBookingResponse[] = [];
  loading = true;
  error: string | null = null;
  success: string | null = null;

  constructor(private serviceService: WeddingServiceService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  private loadBookings(): void {
    this.serviceService.getVendorBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load bookings';
        this.loading = false;
      }
    });
  }

  confirmBooking(bookingId: number): void {
    this.loading = true;
    this.success = null;
    this.error = null;
    this.serviceService.confirmBooking(bookingId).subscribe({
      next: () => {
        this.success = 'Booking confirmed successfully';
        this.loadBookings();
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to confirm booking';
        this.loading = false;
      }
    });
  }

  cancelBooking(bookingId: number): void {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    this.loading = true;
    this.success = null;
    this.error = null;
    this.serviceService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.success = 'Booking cancelled successfully';
        this.loadBookings();
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to cancel booking';
        this.loading = false;
      }
    });
  }
}
