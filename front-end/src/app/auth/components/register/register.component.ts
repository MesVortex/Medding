import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
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

  constructor(private fb: FormBuilder, private store: Store) {
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

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      // Remove location if user is ORGANIZER
      if (formValue.role === 'ORGANIZER') {
        delete formValue.location;
      }
      this.store.dispatch(AuthActions.register({ request: formValue }));
    }
  }

  isVendor(): boolean {
    return this.registerForm.get('role')?.value === 'VENDOR';
  }
}
