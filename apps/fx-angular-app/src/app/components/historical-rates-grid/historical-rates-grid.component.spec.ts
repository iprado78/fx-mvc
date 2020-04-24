import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalRatesGridComponent } from './historical-rates-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HistoricalRatesGridComponent', () => {
  let component: HistoricalRatesGridComponent;
  let fixture: ComponentFixture<HistoricalRatesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalRatesGridComponent],
      imports: [AgGridModule.withComponents(), HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalRatesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
