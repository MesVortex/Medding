import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeddingServiceService } from '../../services/wedding-service.service';
import { ServiceResponse, WeddingServiceCategory, WeddingServiceCategoryLabels } from '../../models/wedding-service.model';

@Component({
  selector: 'app-service-browse',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './service-browse.component.html'
})
export class ServiceBrowseComponent implements OnInit {
  services: ServiceResponse[] = [];
  filteredServices: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;
  searchTerm = '';
  selectedCategory: string = '';
  categories = Object.values(WeddingServiceCategory);

  constructor(private serviceService: WeddingServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        this.services = services;
        this.filteredServices = services;
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

  filterServices(): void {
    this.filteredServices = this.services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || service.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange(): void {
    this.filterServices();
  }

  onCategoryChange(): void {
    this.filterServices();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.filteredServices = this.services;
  }
}
