import { FxTransactionDbClient } from "./fx-transaction-db-client";

describe('FxTransactionDbClient', () => {
  let client: FxTransactionDbClient;

  beforeEach(() => {
    client = new FxTransactionDbClient();
  });

  it('should be created', () => {
    expect(client).toBeTruthy();
  });
});
