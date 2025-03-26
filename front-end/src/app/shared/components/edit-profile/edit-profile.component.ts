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
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    protected router: Router,
    private store: Store
  ) {}

  private initializeForm() {
    const baseFields = {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.pattern(/^\+?[0-9]{8,10}$/)]],
      currentPassword: ['', []],
      newPassword: ['', []],
      confirmPassword: ['', []]
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

  togglePasswordFields() {
    this.showPasswordFields = !this.showPasswordFields;

    if (this.showPasswordFields) {
      this.profileForm.get('currentPassword')?.setValidators([Validators.required]);
      this.profileForm.get('newPassword')?.setValidators([
        Validators.required,
        Validators.minLength(6)
      ]);
      this.profileForm.get('confirmPassword')?.setValidators([Validators.required]);
    } else {
      this.profileForm.get('currentPassword')?.clearValidators();
      this.profileForm.get('newPassword')?.clearValidators();
      this.profileForm.get('confirmPassword')?.clearValidators();

      this.profileForm.patchValue({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }

    // Update validation status
    this.profileForm.get('currentPassword')?.updateValueAndValidity();
    this.profileForm.get('newPassword')?.updateValueAndValidity();
    this.profileForm.get('confirmPassword')?.updateValueAndValidity();
  }


  ngOnInit() {
    this.store.select(selectUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isVendor = user.role === 'VENDOR';
        this.initializeForm(); // Reinitialize form with correct fields

        this.profileService.getUserProfile().subscribe((profile: Profile) => {
          const { currentPassword, newPassword, confirmPassword, ...profileData } = profile;

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

  onSubmit() {
    if (this.profileForm.valid && this.currentUser) {
      const formData = { ...this.profileForm.value };

      if (this.showPasswordFields) {
        if (formData.currentPassword?.trim() &&
          formData.newPassword?.trim() &&
          formData.confirmPassword?.trim()) {

          // Verify passwords match
          if (this.passwordsMatch()) {
            const passwordData = {
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword
            };

            this.profileService.updateProfile(this.currentUser.id, passwordData)
              .subscribe({
                next: () => {
                  this.router.navigate(['/profile']);
                },
                error: (error) => {
                  this.errorMessage = error.message || 'Error updating password';
                  console.error('Error updating password:', error);
                }
              });
            return;
          }
        }
      }

      const { currentPassword, newPassword, confirmPassword, ...profileUpdateData } = formData;

      this.profileService.updateProfile(this.currentUser.id, {
        ...profileUpdateData,
        role: this.currentUser.role
      }).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Error updating profile';
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
