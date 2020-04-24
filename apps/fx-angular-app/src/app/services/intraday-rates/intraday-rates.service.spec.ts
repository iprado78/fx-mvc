import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IntradayRates } from './intraday-rates.service';

describe('IntradayRates', () => {
  let service: IntradayRates;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IntradayRates);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
