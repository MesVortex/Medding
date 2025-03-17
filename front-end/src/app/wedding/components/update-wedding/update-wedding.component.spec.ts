import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeddingComponent } from './update-wedding.component';

describe('UpdateWeddingComponent', () => {
  let component: UpdateWeddingComponent;
  let fixture: ComponentFixture<UpdateWeddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWeddingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
