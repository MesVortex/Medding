import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeddingServiceService } from '../../services/wedding-service.service';
import { ServiceResponse, WeddingServiceCategory, WeddingServiceCategoryLabels } from '../../models/wedding-service.model';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-details.component.html'
})
export class ServiceDetailsComponent implements OnInit {
  service?: ServiceResponse;
  loading = true;
  error: string | null = null;
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private serviceService: WeddingServiceService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('id');
    if (serviceId) {
      this.loadServiceDetails(+serviceId);
    }
  }

  private loadServiceDetails(id: number): void {
    this.serviceService.getServiceById(id).subscribe({
      next: (service) => {
        this.service = service;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load service details';
        this.loading = false;
        console.error('Error loading service:', error);
      }
    });
  }

  getCategoryDisplayName(category: WeddingServiceCategory): string {
    return WeddingServiceCategoryLabels[category];
  }
}
