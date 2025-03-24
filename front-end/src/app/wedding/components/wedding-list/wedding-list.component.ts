import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {WeddingService} from "../../services/wedding.service";
import {WeddingResponse} from "../../models/wedding.model";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-wedding-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationDialogComponent],
  templateUrl: './wedding-list.component.html',
  styleUrls: ['./wedding-list.component.scss']
})
export class WeddingListComponent implements OnInit {
  weddings: WeddingResponse[] = [];
  wedding: WeddingResponse | null = null;
  loading = true;
  error: string | null = null;
  showDeleteConfirmation = false;

  constructor(private weddingService: WeddingService, private router: Router) {}

  ngOnInit(): void {
    this.loadWeddings();
  }

  private loadWeddings(): void {
    this.weddingService.getOrganizerWeddings().subscribe({
      next: (weddings) => {
        this.weddings = weddings;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load weddings';
        this.loading = false;
        console.error('Error loading weddings:', error);
      }
    });
  }

  deleteWedding(wedding: WeddingResponse): void {
    this.wedding = wedding;
    if (this.wedding) {
      this.showDeleteConfirmation = true;
    }
  }

  confirmDelete(): void {
    if (this.wedding) {
      this.loading = true;
      this.weddingService.deleteWedding(this.wedding.id).subscribe({
        next: () => {
          this.loadWeddings();
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

  getDaysUntilWedding(wedding: WeddingResponse): number {
    const weddingDate = new Date(wedding.date);
    const today = new Date();
    const timeDiff = weddingDate.getTime() - today.getTime();
    return Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
  }

  getHoursUntilWedding(wedding: WeddingResponse): number {
    const weddingDate = new Date(wedding.date);
    const today = new Date();
    const timeDiff = weddingDate.getTime() - today.getTime();
    return Math.max(0, Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  }

  getMinutesUntilWedding(wedding: WeddingResponse): number {
    const weddingDate = new Date(wedding.date);
    const today = new Date();
    const timeDiff = weddingDate.getTime() - today.getTime();
    return Math.max(0, Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
  }
}
