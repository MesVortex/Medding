import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { WeddingServiceService } from "../../services/wedding-service.service"
import {
  ServiceBookingRequest,
  ServiceResponse,
  WeddingServiceCategory,
  WeddingServiceCategoryLabels,
} from "../../models/wedding-service.model"
import { ServiceBookingComponent } from "../service-booking/service-booking.component"

@Component({
  selector: "app-service-browse",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ServiceBookingComponent],
  templateUrl: "./service-browse.component.html",
  styleUrls: ["./service-browse.component.scss"],
})
export class ServiceBrowseComponent implements OnInit {
  services: ServiceResponse[] = [];
  filteredServices: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;
  searchTerm = "";
  selectedCategory: WeddingServiceCategory | null = null; // Fixed type here
  categories = Object.values(WeddingServiceCategory);
  showBookingModal = false;
  selectedService?: ServiceResponse;
  bookingLoading = false;
  bookingError: string | null = null;
  showFilterMenu = false;

  constructor(private serviceService: WeddingServiceService) {}

  ngOnInit(): void {
    this.loadServices()
  }

  private loadServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        this.services = services
        this.filteredServices = services
        this.loading = false
      },
      error: (error) => {
        this.error = "Failed to load services"
        this.loading = false
        console.error("Error loading services:", error)
      },
    })
  }

  getCategoryDisplayName(category: WeddingServiceCategory): string {
    return WeddingServiceCategoryLabels[category] || 'Unknown Category';
  }

  filterServices(): void {
    this.filteredServices = this.services.filter((service) => {
      const matchesSearch = service.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      const matchesCategory = !this.selectedCategory || service.category === this.selectedCategory
      return matchesSearch && matchesCategory
    })
  }

  onSearchChange(): void {
    this.filterServices()
  }

  onCategoryChange(): void {
    this.filterServices()
  }

  clearFilters(): void {
    this.searchTerm = "";
    this.selectedCategory = null;
    this.filteredServices = this.services;
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu
  }

  openBookingModal(service: ServiceResponse): void {
    this.selectedService = service
    this.showBookingModal = true
    console.log('Opening booking modal for service:', service);
  }

  onBook(bookingRequest: ServiceBookingRequest): void {
    if (!this.selectedService) return

    this.bookingLoading = true
    this.bookingError = null

    this.serviceService.bookService(this.selectedService.id, bookingRequest).subscribe({
      next: () => {
        this.showBookingModal = false
        this.selectedService = undefined
        this.bookingLoading = false
        // I need to show success message
      },
      error: (error) => {
        this.bookingError = error.error?.message || "Failed to book service"
        this.bookingLoading = false
        console.error("Error booking service:", error)
      },
    })
  }

  closeBookingModal(): void {
    this.showBookingModal = false
    this.selectedService = undefined
    this.bookingLoading = false
  }
}
