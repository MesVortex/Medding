import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from '../../../review/services/review.service';
import { ReviewRequest, ReviewResponse } from '../../../review/models/review.model';
import {ProfileService} from "../../services/profile.service";
import {VendorProfile} from "../../models/profile.model";

@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'vendor-profile.component.html',
  styleUrl: 'vendor-profile.component.scss'
})
export class VendorProfileComponent implements OnInit {
  vendor?: VendorProfile;
  reviews: ReviewResponse[] = [];
  loading = true;
  error: string | null = null;
  reviewForm: FormGroup;
  submittingReview = false;
  averageRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    const vendorId = this.route.snapshot.paramMap.get('id');
    if (vendorId) {
      this.loadVendorProfile(+vendorId);
      this.loadVendorReviews(+vendorId);
    }
  }

  private loadVendorProfile(id: number): void {
    this.profileService.getVendorProfile(id).subscribe({
      next: (vendor) => {
        this.vendor = vendor;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load vendor profile';
        this.loading = false;
        console.error('Error loading vendor:', error);
      }
    });
  }

  private calculateAverageRating(): void {
    if (!this.reviews.length) {
      this.averageRating = 0;
      return;
    }

    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
  }

  private loadVendorReviews(vendorId: number): void {
    this.reviewService.getVendorReviews(vendorId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.calculateAverageRating(); // Calculate average after loading reviews
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
      }
    });
  }

  onSubmitReview(): void {
    if (this.reviewForm.valid && this.vendor) {
      this.submittingReview = true;
      const reviewData: ReviewRequest = {
        vendorId: this.vendor.id,
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment
      };

      this.reviewService.createReview(reviewData).subscribe({
        next: (newReview) => {
          this.reviews = [newReview, ...this.reviews];
          this.calculateAverageRating(); // Recalculate after adding new review
          this.reviewForm.reset();
          this.submittingReview = false;
        },
        error: (error) => {
          console.error('Error submitting review:', error);
          this.submittingReview = false;
        }
      });
    }
  }
}
