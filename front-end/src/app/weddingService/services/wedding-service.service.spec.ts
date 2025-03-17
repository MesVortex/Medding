import { TestBed } from '@angular/core/testing';

import { WeddingServiceService } from './wedding-service.service';

describe('WeddingServiceService', () => {
  let service: WeddingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeddingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
