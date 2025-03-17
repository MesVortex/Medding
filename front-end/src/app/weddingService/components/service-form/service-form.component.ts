import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceRequest, ServiceResponse, WeddingServiceCategory, WeddingServiceCategoryLabels } from '../../models/wedding-service.model';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-form.component.html'
})
export class ServiceFormComponent implements OnInit {
  @Input() service?: ServiceResponse;
  @Input() loading = false;
  @Output() save = new EventEmitter<ServiceRequest>();
  @Output() cancel = new EventEmitter<void>();

  serviceForm: FormGroup;
  categories = Object.values(WeddingServiceCategory);
  isEdit = false;

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: [WeddingServiceCategory.VENUE_AND_DECORATION, [Validators.required]],
      availability: [true]
    });
  }

  ngOnInit(): void {
    if (this.service) {
      this.isEdit = true;
      // Ensure the category is properly set as an enum value
      const serviceData = {
        ...this.service,
        category: this.service.category as WeddingServiceCategory
      };
      this.serviceForm.patchValue(serviceData);
    }
  }

  getCategoryDisplayName(category: WeddingServiceCategory): string {
    return WeddingServiceCategoryLabels[category as WeddingServiceCategory];
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formValue = this.serviceForm.value;
      // Ensure category is properly set before emitting
      const serviceData: ServiceRequest = {
        ...formValue,
        category: formValue.category as WeddingServiceCategory
      };
      this.save.emit(serviceData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
