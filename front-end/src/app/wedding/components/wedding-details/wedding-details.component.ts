import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { WeddingService } from '../../services/wedding.service';
import { WeddingResponse } from '../../models/wedding.model';
import {ServiceBookingResponse, ServiceResponse} from "../../../weddingService/models/wedding-service.model";
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
  serviceDetails: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
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

getConfirmedServices(): ServiceResponse[] {
  this.serviceDetails = [];
  this.services.filter(service => service.status === 'CONFIRMED').forEach(service => {
    this.serviceService.getServiceById(service.serviceId).subscribe(response => {
      this.serviceDetails.push(response);
    });
  });
  return this.serviceDetails;
}

  getCancelledServices(): ServiceBookingResponse[] {
    return this.services.filter(service => service.status === 'CANCELLED');
  }

  getDaysUntilWedding(): number {
    if (!this.wedding || !this.wedding.date) return 0;
    const weddingDate = new Date(this.wedding.date);
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();
    return diff <= 0 ? 0 : Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  getHoursUntilWedding(): number {
    if (!this.wedding || !this.wedding.date) return 0;
    const weddingDate = new Date(this.wedding.date);
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();
    return diff <= 0 ? 0 : Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  }

  getMinutesUntilWedding(): number {
    if (!this.wedding || !this.wedding.date) return 0;
    const weddingDate = new Date(this.wedding.date);
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();
    return diff <= 0 ? 0 : Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  }

  getSecondsUntilWedding(): number {
    if (!this.wedding || !this.wedding.date) return 0;
    const weddingDate = new Date(this.wedding.date);
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();
    return diff <= 0 ? 0 : Math.floor((diff % (1000 * 60)) / 1000);
  }

  getTotalSpentAmount(): number {
    return this.getConfirmedServices()
      .reduce((total, service) => total + service.price, 0);
  }

  getBudgetPercentage(): number {
    if (!this.wedding?.budget) return 0;
    const spent = this.getTotalSpentAmount();
    return Math.min((spent / this.wedding.budget) * 100, 100);
  }

  getRemainingBudget(): number {
    if (!this.wedding?.budget) return 0;
    const spent = this.getTotalSpentAmount();
    return Math.max(this.wedding.budget - spent, 0);
  }
}
