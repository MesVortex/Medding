import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {WeddingService} from "../../services/wedding.service";

@Component({
  selector: 'app-update-wedding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-wedding.component.html',
  styleUrls: ['./update-wedding.component.scss']
})
export class UpdateWeddingComponent implements OnInit {
  weddingId!: number;
  weddingForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  initialLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private weddingService: WeddingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.weddingForm = this.fb.group({
      bride: ['', [Validators.required, Validators.minLength(2)]],
      groom: ['', [Validators.required, Validators.minLength(2)]],
      budget: ['', [Validators.required, Validators.min(0)]],
      date: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.weddingId = +id;
      this.loadWedding();
    }
  }

  private loadWedding(): void {
    this.weddingService.getWeddingWithServices(this.weddingId).subscribe({
      next: (wedding) => {
        this.weddingForm.patchValue({
          bride: wedding.bride,
          groom: wedding.groom,
          budget: wedding.budget,
          date: new Date(wedding.date).toISOString().split('T')[0],
          location: wedding.location
        });
        this.initialLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load wedding details';
        this.initialLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.weddingForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.weddingService.updateWedding(this.weddingId, this.weddingForm.value).subscribe({
        next: () => {
          this.router.navigate(['/weddings']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error.message || 'Failed to update wedding';
        }
      });
    }
  }
}
