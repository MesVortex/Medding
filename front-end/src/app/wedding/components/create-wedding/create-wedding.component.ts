import {WeddingService} from "../../services/wedding.service";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-create-wedding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-wedding.component.html',
  styleUrls: ['./create-wedding.component.scss']
})
export class CreateWeddingComponent {
  weddingForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private weddingService: WeddingService,
    private router: Router
  ) {
    this.weddingForm = this.fb.group({
      bride: ['', [Validators.required, Validators.minLength(2)]],
      groom: ['', [Validators.required, Validators.minLength(2)]],
      budget: ['', [Validators.required, Validators.min(0)]],
      date: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.weddingForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.weddingService.createWedding(this.weddingForm.value).subscribe({
        next: () => {
          this.router.navigate(['/weddings']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error.message || 'Failed to create wedding';
        }
      });
    }
  }
}
