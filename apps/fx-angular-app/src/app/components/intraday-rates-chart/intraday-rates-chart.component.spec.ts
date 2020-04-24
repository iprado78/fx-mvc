import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntradayRatesChartComponent } from './intraday-rates-chart.component';
import { ChartModule } from 'angular-highcharts';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IntradayRatesChartComponent', () => {
  let component: IntradayRatesChartComponent;
  let fixture: ComponentFixture<IntradayRatesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntradayRatesChartComponent],
      imports: [ChartModule, HttpClientTestingModule]
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
