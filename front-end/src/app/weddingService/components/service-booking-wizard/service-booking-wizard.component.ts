import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ServiceResponse,
  WeddingServiceCategory,
  WeddingServiceCategoryLabels
} from '../../models/wedding-service.model';
import { WeddingServiceService } from '../../services/wedding-service.service';

interface EnhancedServiceResponse extends ServiceResponse {
  isBookedForWedding?: boolean;
}

@Component({
  selector: 'app-service-booking-wizard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-booking-wizard.component.html',
  styleUrl: './service-booking-wizard.component.scss',
})
export class ServiceBookingWizardComponent implements OnInit {
  currentStep = 0;
  categories: WeddingServiceCategory[] = [];
  currentCategory: WeddingServiceCategory;
  loading = false;
  error: string | null = null;
  success: string | null = null;
  weddingId!: number;
  services: EnhancedServiceResponse[] = [];
  showNextButton = false;
  bookedServiceId: number | null = null;

  constructor(
    private serviceService: WeddingServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize categories array
    this.categories = Object.values(WeddingServiceCategory);
    this.currentCategory = this.categories[0];

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/weddings']);
      return;
    }
    this.weddingId = +id;
  }

  ngOnInit() {
    this.loadServicesForCategory(this.currentCategory);
  }

  loadServicesForCategory(category: WeddingServiceCategory) {
    this.loading = true;
    this.error = null;
    this.success = null;
    this.showNextButton = false;
    this.bookedServiceId = null;
    this.currentCategory = category;

    // First, get all services for this category
    this.serviceService.getServicesByCategory(category).subscribe({
      next: (services) => {
        // Then, get services already booked for this wedding
        this.serviceService.getWeddingBookings(this.weddingId).subscribe({
          next: (bookedServices) => {
            // Mark services that are already booked for this wedding
            this.services = services.map(service => ({
              ...service,
              isBookedForWedding: bookedServices.some(bs => bs.id === service.id)
            }));
            this.loading = false;

            // Check if any service is already booked in this category
            if (this.services.some(s => s.isBookedForWedding)) {
              this.showNextButton = true;
            }
          },
          error: (error) => {
            this.services = services;
            this.loading = false;
            console.error('Error loading booked services:', error);
          }
        });
      },
      error: (error) => {
        this.error = 'Failed to load services';
        this.loading = false;
        console.error('Error loading services:', error);
      }
    });
  }

  nextStep() {
    if (this.currentStep < this.categories.length - 1) {
      this.currentStep++;
      this.currentCategory = this.categories[this.currentStep];
      this.loadServicesForCategory(this.currentCategory);
    } else {
      this.router.navigate(['/weddings', this.weddingId]);
    }
  }

  bookService(serviceId: number) {
    this.loading = true;
    this.error = null;
    this.success = null;
    this.serviceService.bookService(serviceId, { weddingId: this.weddingId }).subscribe({
      next: () => {
        this.success = 'Service booked successfully!';
        this.loading = false;
        this.showNextButton = true;
        this.bookedServiceId = serviceId;

        // Mark this service as booked
        const serviceIndex = this.services.findIndex(s => s.id === serviceId);
        if (serviceIndex !== -1) {
          this.services[serviceIndex].isBookedForWedding = true;
        }
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to book service';
        this.loading = false;
        console.error('Error booking service:', error);
      }
    });
  }

  skipStep() {
    this.nextStep();
  }

  getCategoryDisplayName(category: WeddingServiceCategory): string {
    return WeddingServiceCategoryLabels[category];
  }

  getCurrentCategoryDisplayName(): string {
    return this.getCategoryDisplayName(this.currentCategory);
  }

  getProgressWidth(index: number): string {
    return `${(index / (this.categories.length - 1)) * 100}%`;
  }
}
