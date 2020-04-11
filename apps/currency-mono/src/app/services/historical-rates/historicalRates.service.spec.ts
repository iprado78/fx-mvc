import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { HistoricalRates } from './historicalRates.service';

describe('HistoricalRates', () => {
  let service: HistoricalRates;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HistoricalRates);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
