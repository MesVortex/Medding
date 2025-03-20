import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { GuestResponse, GuestRequest, RsvpStatus } from '../../models/guest.model';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './guest-list.component.html',
    styleUrls: ['./guest-list.component.scss']
})
export class GuestListComponent implements OnInit {
  guests: GuestResponse[] = [];
  loading = false;
  error: string | null = null;
  showAddForm = false;
  guestForm: FormGroup;
  weddingId!: number;
  showDeleteConfirmation = false;
  selectedGuestId?: number;

  constructor(
    private guestService: GuestService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.guestForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.weddingId = Number(this.route.snapshot.params['id']);
    this.loadGuests();
  }

  private loadGuests(): void {
    this.loading = true;
    this.error = null;

    this.guestService.getGuestsByWeddingId(this.weddingId).subscribe({
      next: (guests) => {
        this.guests = guests;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load guests';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.guestForm.valid) {
      const guestRequest: GuestRequest = {
        ...this.guestForm.value,
        weddingId: this.weddingId,
        rsvpStatus: RsvpStatus.PENDING
      };

      this.guestService.createGuest(guestRequest).subscribe({
        next: () => {
          this.loadGuests();
          this.guestForm.reset();
          this.showAddForm = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to add guest';
        }
      });
    }
  }

  sendInvitation(guestId: number): void {
    this.guestService.sendInvitation(guestId).subscribe({
      next: () => {
        // Show success message
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to send invitation';
      }
    });
  }

  confirmDelete(guestId: number): void {
    this.selectedGuestId = guestId;
    this.showDeleteConfirmation = true;
  }

  onDeleteConfirmed(): void {
    if (this.selectedGuestId) {
      this.guestService.deleteGuest(this.selectedGuestId).subscribe({
        next: () => {
          this.loadGuests();
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to delete guest';
        }
      });
    }
    this.showDeleteConfirmation = false;
  }
}
