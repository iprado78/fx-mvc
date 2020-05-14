import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntradayRatesChartComponent } from './intraday-rates-chart.component';
import { ChartModule } from 'angular-highcharts';

describe('IntradayRatesChartComponent', () => {
  let component: IntradayRatesChartComponent;
  let fixture: ComponentFixture<IntradayRatesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntradayRatesChartComponent],
      imports: [ChartModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntradayRatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
