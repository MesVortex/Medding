import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../auth/store/auth.selectors';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser: any;
  isVendor: boolean = false;
  showPasswordFields: boolean = false;

  private initializeForm() {
    const baseFields = {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.pattern(/^\+?[0-9]{8,15}$/)]],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    };

    // Add location field only for vendors
    if (this.isVendor) {
      this.profileForm = this.fb.group({
        ...baseFields,
        location: ['', Validators.required]
      });
    } else {
      this.profileForm = this.fb.group(baseFields);
    }
  }

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    protected router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isVendor = user.role === 'VENDOR';
        this.initializeForm(); // Reinitialize form with correct fields

        this.profileService.getUserProfile().subscribe((profile: Profile) => {
          // Remove password fields from the patch value
          const { currentPassword, newPassword, confirmPassword, ...profileData } = profile;

          // Only patch fields that exist in the form
          const formControls = Object.keys(this.profileForm.controls);
          const filteredData = Object.keys(profileData)
            .filter(key => formControls.includes(key))
            .reduce((obj: { [key: string]: any }, key) => {
              obj[key] = (profileData as { [key: string]: any })[key];
              return obj;
            }, {});

          this.profileForm.patchValue(filteredData);
        });
      }
    });
  }

  togglePasswordFields() {
    this.showPasswordFields = !this.showPasswordFields;
    if (!this.showPasswordFields) {
      this.profileForm.patchValue({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.currentUser) {
      const formData = { ...this.profileForm.value };

      // Only include password fields if they're filled
      if (!this.showPasswordFields) {
        delete formData.currentPassword;
        delete formData.newPassword;
        delete formData.confirmPassword;
      } else if (!formData.currentPassword) {
        delete formData.currentPassword;
        delete formData.newPassword;
        delete formData.confirmPassword;
      }

      this.profileService.updateProfile(this.currentUser.id, formData)
        .subscribe({
          next: () => {
            this.router.navigate(['/profile']);
          },
          error: (error) => {
            console.error('Error updating profile:', error);
          }
        });
    }
  }

  passwordsMatch(): boolean {
    return this.profileForm.get('newPassword')?.value ===
      this.profileForm.get('confirmPassword')?.value;
  }
}
