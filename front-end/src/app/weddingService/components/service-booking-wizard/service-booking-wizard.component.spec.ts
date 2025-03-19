import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBookingWizardComponent } from './service-booking-wizard.component';

describe('ServiceBookingWizardComponent', () => {
  let component: ServiceBookingWizardComponent;
  let fixture: ComponentFixture<ServiceBookingWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceBookingWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceBookingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
