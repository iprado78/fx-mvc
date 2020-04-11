import { TestBed } from '@angular/core/testing';

import { DatesService } from './dates.service';

describe('DatesService', () => {
  let service: DatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
