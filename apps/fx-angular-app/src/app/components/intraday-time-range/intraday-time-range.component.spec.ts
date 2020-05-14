import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';

import { IntradayTimeRangeComponent } from './intraday-time-range.component';

describe('IntradayTimeRangeComponent', () => {
  let component: IntradayTimeRangeComponent;
  let fixture: ComponentFixture<IntradayTimeRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntradayTimeRangeComponent],
      imports: [MatFormFieldModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntradayTimeRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
