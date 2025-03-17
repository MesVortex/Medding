import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { WeddingService } from '../../services/wedding.service';
import { WeddingResponse } from '../../models/wedding.model';
import {ServiceResponse} from "../../../weddingService/models/wedding-service.model";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-wedding-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationDialogComponent],
  templateUrl: './wedding-details.component.html',
  styleUrls: ['./wedding-details.component.scss']
})
export class WeddingDetailsComponent implements OnInit {
  wedding: WeddingResponse | null = null;
  services: ServiceResponse[] = [];
  loading = true;
  error: string | null = null;
  showDeleteConfirmation = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weddingService: WeddingService
  ) {}

  ngOnInit(): void {
    const weddingId = this.route.snapshot.paramMap.get('id');
    if (weddingId) {
      this.loadWeddingDetails(+weddingId);
    }
  }

  private loadWeddingDetails(id: number): void {
    this.weddingService.getWeddingWithServices(id).subscribe({
      next: (wedding) => {
        this.wedding = wedding;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load wedding details';
        this.loading = false;
        console.error('Error loading wedding:', error);
      }
    });
  }

  deleteWedding(): void {
    if (this.wedding) {
      this.showDeleteConfirmation = true;
    }
  }

  confirmDelete(): void {
    if (this.wedding) {
      this.loading = true;
      this.weddingService.deleteWedding(this.wedding.id).subscribe({
        next: () => {
          this.router.navigate(['/weddings']);
        },
        error: (error) => {
          this.error = 'Failed to delete wedding';
          this.loading = false;
          console.error('Error deleting wedding:', error);
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
  }
}
