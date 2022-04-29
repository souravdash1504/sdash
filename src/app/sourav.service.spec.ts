import { TestBed } from '@angular/core/testing';

import { SouravService } from './sourav.service';

describe('SouravService', () => {
  let service: SouravService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SouravService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
