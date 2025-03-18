import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ServiceBookingRequest, ServiceResponse} from '../../models/wedding-service.model';
import { WeddingResponse } from '../../../wedding/models/wedding.model';
import { WeddingService } from '../../../wedding/services/wedding.service';

@Component({
  selector: 'app-service-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.scss']
})
export class ServiceBookingComponent implements OnInit {
  @Input() service!: ServiceResponse;
  @Input() bookingLoading = false;
  @Input() bookingError: string | null = null;
  @Output() book = new EventEmitter<ServiceBookingRequest>();
  @Output() cancel = new EventEmitter<void>();

  weddings: WeddingResponse[] = [];
  selectedWeddingId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(private weddingService: WeddingService) {}

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

  onConfirm(): void {
    if (this.selectedWeddingId) {
      this.book.emit({ weddingId: this.selectedWeddingId });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
