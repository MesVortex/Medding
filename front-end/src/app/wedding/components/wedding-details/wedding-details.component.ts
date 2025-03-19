import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { WeddingService } from '../../services/wedding.service';
import { WeddingResponse } from '../../models/wedding.model';
import {ServiceBookingResponse} from "../../../weddingService/models/wedding-service.model";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {WeddingServiceService} from "../../../weddingService/services/wedding-service.service";

@Component({
  selector: 'app-wedding-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationDialogComponent],
  templateUrl: './wedding-details.component.html',
  styleUrls: ['./wedding-details.component.scss']
})
export class WeddingDetailsComponent implements OnInit {
  wedding: WeddingResponse | null = null;
  services: ServiceBookingResponse[] = [];
  loading = true;
  error: string | null = null;
  showDeleteConfirmation = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weddingService: WeddingService,
    private serviceService: WeddingServiceService
  ) {}

  ngOnInit(): void {
    const weddingId = this.route.snapshot.paramMap.get('id');
    if (weddingId) {
      this.loadWeddingDetails(+weddingId);
    }
  }

  private loadWeddingDetails(id: number): void {
    this.weddingService.getWeddingWithServices(id).subscribe({
      next: (wedding) => {
        this.wedding = wedding;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load wedding details';
        this.loading = false;
        console.error('Error loading wedding:', error);
      }
    });
    this.serviceService.getWeddingBookings(id).subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        this.error = 'Failed to load wedding services';
        console.error('Error loading wedding services:', error);
      }
    });
  }

  getPendingServices(): ServiceBookingResponse[] {
    return this.services.filter(service => service.status === 'PENDING');
  }

  getConfirmedServices(): ServiceBookingResponse[] {
    return this.services.filter(service => service.status === 'CONFIRMED');
  }

  getCancelledServices(): ServiceBookingResponse[] {
    return this.services.filter(service => service.status === 'CANCELLED');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-50 border-yellow-200';
      case 'CONFIRMED':
        return 'bg-green-50 border-green-200';
      case 'CANCELLED':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  }

  getStatusTextColor(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-800';
      case 'CONFIRMED':
        return 'text-green-800';
      case 'CANCELLED':
        return 'text-red-800';
      default:
        return 'text-gray-800';
    }
  }

  deleteWedding(): void {
    if (this.wedding) {
      this.showDeleteConfirmation = true;
    }
  }

  confirmDelete(): void {
    if (this.wedding) {
      this.loading = true;
      this.weddingService.deleteWedding(this.wedding.id).subscribe({
        next: () => {
          this.router.navigate(['/weddings']);
        },
        error: (error) => {
          this.error = 'Failed to delete wedding';
          this.loading = false;
          console.error('Error deleting wedding:', error);
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
  }
}
