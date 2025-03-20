import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { GuestResponse, GuestRequest, RsvpStatus } from '../../models/guest.model';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {NotificationComponent} from "../../../shared/components/notification/notification.component";

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmationDialogComponent, NotificationComponent],
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
  editingGuest: GuestResponse | null = null;
  showEditModal = false;
  editForm: FormGroup;
  sendingInvitation: { [key: number]: boolean } = {};
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(
    private guestService: GuestService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.guestForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.editForm = this.formBuilder.group({
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

  startEdit(guest: GuestResponse): void {
    this.editingGuest = guest;
    this.editForm.patchValue({
      name: guest.name,
      email: guest.email
    });
    this.showEditModal = true;
  }

  private showNotif(message: string, type: 'success' | 'error'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;
    setTimeout(() => this.showNotification = false, 3000);
  }

  sendInvitation(guest: GuestResponse): void {
    if (guest.invitationSent) {
      this.showNotif('Invitation has already been sent', 'error');
      return;
    }

    this.sendingInvitation[guest.id] = true;
    this.guestService.sendInvitation(guest.id).subscribe({
      next: () => {
        this.showNotif(`Invitation sent successfully to ${guest.name}`, 'success');
        this.loadGuests();
        this.sendingInvitation[guest.id] = false;
      },
      error: (error) => {
        this.showNotif(error.error?.message || 'Failed to send invitation', 'error');
        this.sendingInvitation[guest.id] = false;
      }
    });
  }

  onUpdateSubmit(): void {
    if (this.editForm.valid && this.editingGuest) {
      const updateRequest: GuestRequest = {
        ...this.editForm.value,
        weddingId: this.weddingId,
        rsvpStatus: this.editingGuest.rsvpStatus
      };

      this.guestService.updateGuest(this.editingGuest.id, updateRequest).subscribe({
        next: () => {
          this.showNotif('Guest updated successfully', 'success');
          this.loadGuests();
          this.showEditModal = false;
          this.editingGuest = null;
          this.editForm.reset();
        },
        error: (error) => {
          this.showNotif(error.error?.message || 'Failed to update guest', 'error');
        }
      });
    }
  }

  onDeleteConfirmed(): void {
    if (this.selectedGuestId) {
      this.guestService.deleteGuest(this.selectedGuestId).subscribe({
        next: () => {
          this.showNotif('Guest deleted successfully', 'success');
          this.loadGuests();
        },
        error: (error) => {
          this.showNotif(error.error?.message || 'Failed to delete guest', 'error');
        }
      });
    }
    this.showDeleteConfirmation = false;
  }

  confirmDelete(guestId: number): void {
    this.selectedGuestId = guestId;
    this.showDeleteConfirmation = true;
  }
}
