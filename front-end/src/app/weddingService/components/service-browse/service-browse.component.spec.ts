import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBrowseComponent } from './service-browse.component';

describe('ServiceBrowseComponent', () => {
  let component: ServiceBrowseComponent;
  let fixture: ComponentFixture<ServiceBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
