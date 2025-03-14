import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWeddingComponent } from './create-wedding.component';

describe('CreateWeddingComponent', () => {
  let component: CreateWeddingComponent;
  let fixture: ComponentFixture<CreateWeddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWeddingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
