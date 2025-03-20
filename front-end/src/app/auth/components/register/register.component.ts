import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {Router, RouterLink} from '@angular/router';
import { AuthActions } from '../../store/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  currentStep = 1;
  showPassword = false;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ORGANIZER', Validators.required],
      number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['']
    });
  }

  ngOnInit() {
    // change fields dynamically
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      const locationControl = this.registerForm.get('location');

      if (role === 'VENDOR') {
        locationControl?.setValidators([Validators.required]);
      } else {
        locationControl?.clearValidators();
        locationControl?.setValue('');
      }

      locationControl?.updateValueAndValidity();
    });
  }

  // Check if 1st step fields are valid
  isStep1Valid(): boolean {
    const usernameControl = this.registerForm.get('username');
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');

    return (usernameControl?.valid ?? false) && (emailControl?.valid ?? false) && (passwordControl?.valid ?? false);
  }

  // Go to next step
  goToNextStep(): void {
    if (this.isStep1Valid()) {
      this.currentStep = 2;
    } else {
      // Mark fields as touched to show validation errors
      this.registerForm.get('username')?.markAsTouched();
      this.registerForm.get('email')?.markAsTouched();
      this.registerForm.get('password')?.markAsTouched();
    }
  }

  // Go to previous step
  goToPreviousStep(): void {
    this.currentStep = 1;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      // Remove location if user is ORGANIZER
      if (formValue.role === 'ORGANIZER') {
        delete formValue.location;
      }
      this.store.dispatch(AuthActions.register({ request: formValue }));
      this.router.navigate(['auth/login']);
    }
  }

  isVendor(): boolean {
    return this.registerForm.get('role')?.value === 'VENDOR';
  }
}
