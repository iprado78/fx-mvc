import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntradayTimeRangeComponent } from './intraday-time-range.component';

describe('IntradayTimeRangeComponent', () => {
  let component: IntradayTimeRangeComponent;
  let fixture: ComponentFixture<IntradayTimeRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntradayTimeRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntradayTimeRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
