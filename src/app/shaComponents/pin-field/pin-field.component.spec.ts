import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinFieldComponent } from './pin-field.component';

describe('PinFieldComponent', () => {
  let component: PinFieldComponent;
  let fixture: ComponentFixture<PinFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PinFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
