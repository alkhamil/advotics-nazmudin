import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDaterangepickerComponent } from './custom-daterangepicker.component';

describe('CustomDaterangepickerComponent', () => {
  let component: CustomDaterangepickerComponent;
  let fixture: ComponentFixture<CustomDaterangepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDaterangepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDaterangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
