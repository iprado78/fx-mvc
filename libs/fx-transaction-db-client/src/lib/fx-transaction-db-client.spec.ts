import { TestBed } from '@angular/core/testing';

import { FxTransactionDbClient } from './fx-transaction-db-client';

describe('TransactionsService', () => {
  let service: FxTransactionDbClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxTransactionDbClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
