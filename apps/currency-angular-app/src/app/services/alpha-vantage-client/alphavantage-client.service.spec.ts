import { TestBed } from '@angular/core/testing';

import { AlphavantageClientService } from './alphavantage-client.service';

describe('AlphavantageClientService', () => {
  let service: AlphavantageClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlphavantageClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
