import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {WeddingServiceCategory, WeddingServiceCategoryLabels} from '../../models/wedding-service.model';
import { WeddingServiceService } from '../../services/wedding-service.service';

@Component({
  selector: 'app-service-booking-wizard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-booking-wizard.component.html'
})
export class ServiceBookingWizardComponent implements OnInit {
  currentStep = 0;
  categories = Object.values(WeddingServiceCategory);
  loading = false;
  error: string | null = null;
  success: string | null = null;
  weddingId!: number;
  services: any[] = [];
  showNextButton = false;

  constructor(
    private serviceService: WeddingServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/weddings']);
      return;
    }
    this.weddingId = +id;
  }

  ngOnInit() {
    this.loadServicesForCategory(this.categories[this.currentStep]);
  }

  loadServicesForCategory(category: WeddingServiceCategory) {
    this.loading = true;
    this.error = null;
    this.success = null;
    this.showNextButton = false;
    this.serviceService.getServicesByCategory(category).subscribe({
      next: (services) => {
        this.services = services;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load services';
        this.loading = false;
      }
    });
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
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to book service';
        this.loading = false;
      }
    });
  }

  nextStep() {
    if (this.currentStep < this.categories.length - 1) {
      this.currentStep++;
      this.loadServicesForCategory(this.categories[this.currentStep]);
    } else {
      this.router.navigate(['/weddings', this.weddingId]);
    }
  }

  skipStep() {
    this.nextStep();
  }

  getCategoryDisplayName(category: WeddingServiceCategory): string {
    return WeddingServiceCategoryLabels[category] || category;
  }

  getProgressWidth(index: number): string {
    return `${(index / (this.categories.length - 1)) * 100}%`;
  }
}
