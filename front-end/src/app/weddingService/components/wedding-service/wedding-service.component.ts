import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeddingServiceService } from '../../services/wedding-service.service';
import {
  ServiceRequest,
  ServiceResponse,
  WeddingServiceCategory,
  WeddingServiceCategoryLabels
} from '../../models/wedding-service.model';
import { ServiceFormComponent } from '../service-form/service-form.component';

@Component({
  selector: 'app-wedding-service',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceFormComponent],
  templateUrl: './wedding-service.component.html'
})
export class WeddingServiceComponent implements OnInit {
  services: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;
  showModal = false;
  selectedService?: ServiceResponse;
  formLoading = false;

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

  getCategoryDisplayName(category: WeddingServiceCategory): string {
    return WeddingServiceCategoryLabels[category];
  }

  openCreateModal(): void {
    this.selectedService = undefined;
    this.showModal = true;
  }

  openEditModal(service: ServiceResponse): void {
    this.selectedService = service;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedService = undefined;
    this.formLoading = false;
  }

  onSave(serviceData: ServiceRequest): void {
    this.formLoading = true;

    if (this.selectedService) {
      const updateData: ServiceRequest = {
        ...serviceData,
        category: serviceData.category as WeddingServiceCategory
      };

      this.serviceService.updateService(this.selectedService.id, updateData).subscribe({
        next: (updatedService) => {
          this.services = this.services.map(service =>
            service.id === updatedService.id ? updatedService : service
          );
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating service:', error);
          this.formLoading = false;
        }
      });
    } else {
      const createData: ServiceRequest = {
        ...serviceData,
        category: serviceData.category as WeddingServiceCategory
      };

      this.serviceService.createService(createData).subscribe({
        next: (newService) => {
          this.services = [...this.services, newService];
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating service:', error);
          this.formLoading = false;
        }
      });
    }
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
