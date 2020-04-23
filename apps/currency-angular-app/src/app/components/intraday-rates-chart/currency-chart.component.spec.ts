import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntradayCurrencyChartComponent as CurrencyChartComponent } from './currency-chart.component';
import { ChartModule } from 'angular-highcharts';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CurrencyChartComponent', () => {
  let component: CurrencyChartComponent;
  let fixture: ComponentFixture<CurrencyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyChartComponent],
      imports: [ChartModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
