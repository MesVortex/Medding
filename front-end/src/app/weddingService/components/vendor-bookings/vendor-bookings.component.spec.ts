import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBookingsComponent } from './vendor-bookings.component';

describe('VendorBookingsComponent', () => {
  let component: VendorBookingsComponent;
  let fixture: ComponentFixture<VendorBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
