import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {WeddingService} from '../../services/wedding.service';
import {WeddingResponse} from '../../models/wedding.model';
import {ServiceBookingResponse, ServiceResponse} from "../../../weddingService/models/wedding-service.model";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {WeddingServiceService} from "../../../weddingService/services/wedding-service.service";
import {forkJoin, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-wedding-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationDialogComponent],
  templateUrl: './wedding-details.component.html',
  styleUrls: ['./wedding-details.component.scss']
})
export class WeddingDetailsComponent implements OnInit, OnDestroy {
  wedding: WeddingResponse | null = null;
  services: ServiceBookingResponse[] = [];
  confirmedServices: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;
  private countdownTimer: any;
  private destroy$ = new Subject<void>();
  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  constructor(
    private route: ActivatedRoute,
    private weddingService: WeddingService,
    private serviceService: WeddingServiceService
  ) {
  }

  ngOnInit(): void {
    const weddingId = this.route.snapshot.paramMap.get('id');
    if (weddingId) {
      this.loadWeddingDetails(+weddingId);
      this.startCountdown();
    }
  }

  private startCountdown(): void {
    // Update every second
    this.countdownTimer = setInterval(() => {
      if (this.wedding?.date) {
        const weddingDate = new Date(this.wedding.date);
        const now = new Date();
        const diff = weddingDate.getTime() - now.getTime();

        this.countdown = {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadWeddingDetails(id: number): void {
    // Load wedding details
    this.weddingService.getWeddingWithServices(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
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

    // Load services with their details
    this.serviceService.getWeddingBookings(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (services) => {
        this.services = services;
        // Load confirmed services details
        this.loadConfirmedServicesDetails();
      },
      error: (error) => {
        this.error = 'Failed to load wedding services';
        console.error('Error loading wedding services:', error);
      }
    });
  }

  private loadConfirmedServicesDetails(): void {
    const confirmedBookings = this.services.filter(service => service.status === 'CONFIRMED');

    if (confirmedBookings.length === 0) {
      this.confirmedServices = [];
      return;
    }

    // Use forkJoin to make parallel requests
    forkJoin(
      confirmedBookings.map(booking =>
        this.serviceService.getServiceById(booking.serviceId)
      )
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (services) => {
        this.confirmedServices = services;
      },
      error: (error) => {
        console.error('Error loading confirmed services:', error);
      }
    });
  }

  getPendingServices(): ServiceBookingResponse[] {
    return this.services.filter(service => service.status === 'PENDING');
  }

  getConfirmedServices(): ServiceResponse[] {
    return this.confirmedServices;
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
