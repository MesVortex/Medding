import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingServiceComponent } from './wedding-service.component';

describe('WeddingServiceComponent', () => {
  let component: WeddingServiceComponent;
  let fixture: ComponentFixture<WeddingServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeddingServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeddingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
