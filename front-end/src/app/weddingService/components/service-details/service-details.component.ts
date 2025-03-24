import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { WeddingServiceService } from "../../services/wedding-service.service";
import {
  ServiceResponse,
  WeddingServiceCategory,
  WeddingServiceCategoryLabels,
} from "../../models/wedding-service.model";
import { categoryFeatures, categoryIcons } from "../../models/category-features.model";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {ReviewResponse} from "../../../review/models/review.model";
import {ReviewService} from "../../../review/services/review.service";

@Component({
  selector: "app-service-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./service-details.component.html",
})
export class ServiceDetailsComponent implements OnInit {
  service!: ServiceResponse;
  relatedServices: ServiceResponse[] = [];
  reviews: ReviewResponse[] = [];
  loading = true;
  error: string | null = null;
  categoryFeatures = categoryFeatures;
  categoryIcons = categoryIcons;
  sanitizedIconsMap: Record<WeddingServiceCategory, SafeHtml> = {} as Record<WeddingServiceCategory, SafeHtml>;

  constructor(
    private route: ActivatedRoute,
    private serviceService: WeddingServiceService,
    private reviewService: ReviewService,
    private sanitizer: DomSanitizer,
  ) {
    this.initializeSanitizedIcons();
  }

  private initializeSanitizedIcons(): void {
    Object.values(WeddingServiceCategory).forEach((category) => {
      const iconSvg = this.categoryIcons[category];
      if (iconSvg) {
        this.sanitizedIconsMap[category] = this.sanitizer.bypassSecurityTrustHtml(iconSvg);
      }
    });
  }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get("id");
    if (serviceId) {
      this.loadServiceDetails(+serviceId);
    }
  }

  private loadServiceDetails(id: number): void {
    this.loading = true;
    this.error = null;

    this.serviceService.getServiceById(id).subscribe({
      next: (service) => {
        this.service = service;
        this.loading = false;
        this.loadRelatedServices(service.category, service.id);
      },
      error: (error) => {
        this.error = "Failed to load service details";
        this.loading = false;
        console.error("Error loading service:", error);
      },
    });
  }

  private loadRelatedServices(category: WeddingServiceCategory, currentServiceId: number): void {
    this.serviceService.getServicesByCategory(category).subscribe({
      next: (services) => {
        this.relatedServices = services
          .filter((service) => service.id !== currentServiceId)
          .slice(0, 3);
      },
      error: (error) => {
        console.error("Error loading related services:", error);
      },
    });
  }

  private loadVendorReviews(vendorId: number): void {
    this.reviewService.getVendorReviews(vendorId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (error) => {
        console.error("Error loading reviews:", error);
      }
    });
  }

  getAverageRating(): number {
    if (!this.reviews.length) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }

  getCategoryDisplayName(category: WeddingServiceCategory): string {
    return WeddingServiceCategoryLabels[category] || category;
  }

  getServiceFeatures(category: WeddingServiceCategory): string[] {
    return this.categoryFeatures[category] || [];
  }

  getSanitizedIcon(category: WeddingServiceCategory): SafeHtml {
    return this.sanitizedIconsMap[category] || this.sanitizer.bypassSecurityTrustHtml('');
  }
}
