import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeddingServiceService } from '../../services/wedding-service.service';
import { ServiceResponse, WeddingServiceCategory, WeddingServiceCategoryLabels } from '../../models/wedding-service.model';

@Component({
  selector: 'app-service-browse',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-browse.component.html',
  styleUrls: ['./service-browse.component.scss']
})
export class ServiceBrowseComponent implements OnInit {
  services: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;

  constructor(private serviceService: WeddingServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        this.services = services;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load services';
        this.loading = false;
        console.error('Error loading services:', error);
      }
    });
  }

  getCategoryDisplayName(category: WeddingServiceCategory): string {
    return WeddingServiceCategoryLabels[category];
  }
}
