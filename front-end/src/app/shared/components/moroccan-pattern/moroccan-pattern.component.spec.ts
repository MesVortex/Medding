import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoroccanPatternComponent } from './moroccan-pattern.component';

describe('MoroccanPatternComponent', () => {
  let component: MoroccanPatternComponent;
  let fixture: ComponentFixture<MoroccanPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoroccanPatternComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoroccanPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
