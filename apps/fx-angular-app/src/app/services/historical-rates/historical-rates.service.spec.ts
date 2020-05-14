import { TestBed } from '@angular/core/testing';
import { HistoricalRates } from './historical-rates.service';

describe('HistoricalRates', () => {
  let service: HistoricalRates;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricalRates);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
