import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricalRatesChartComponent } from './historical-rates-chart.component';
import { ChartModule } from 'angular-highcharts';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HistoricalRatesChartComponent', () => {
  let component: HistoricalRatesChartComponent;
  let fixture: ComponentFixture<HistoricalRatesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalRatesChartComponent],
      imports: [ChartModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalRatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
