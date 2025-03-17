import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeddingServiceService } from '../../services/wedding-service.service';
import { ServiceResponse } from '../../models/wedding-service.model';

@Component({
  selector: 'app-wedding-service',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wedding-service.component.html',
  styleUrls: ['./wedding-service.component.scss']
})
export class WeddingServiceComponent implements OnInit {
  services: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;

  constructor(private serviceService: WeddingServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.serviceService.getVendorServices().subscribe({
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

  deleteService(id: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService.deleteService(id).subscribe({
        next: () => {
          this.services = this.services.filter(service => service.id !== id);
        },
        error: (error) => {
          console.error('Error deleting service:', error);
        }
      });
    }
  }
}
