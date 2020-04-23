import { TestBed } from '@angular/core/testing';

import { CurrencySelectionsService } from './currency-selections.service';

describe('CurrencySelectionsService', () => {
  let service: CurrencySelectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencySelectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
