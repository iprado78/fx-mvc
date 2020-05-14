import { TestBed } from '@angular/core/testing';
import { IntradayRates } from './intraday-rates.service';

describe('IntradayRates', () => {
  let service: IntradayRates;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntradayRates);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
