import { TestBed } from '@angular/core/testing';

import { FxAngularTransactionsDbClientService } from './fx-angular-transaction-db-client.service';

describe('TransactionsService', () => {
  let service: FxAngularTransactionsDbClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxAngularTransactionsDbClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
