import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDateRangeComponent } from './historical-date-range.component';

describe('HistoricalDateRangeComponent', () => {
  let component: HistoricalDateRangeComponent;
  let fixture: ComponentFixture<HistoricalDateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalDateRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
