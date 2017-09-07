import { TestBed, inject } from '@angular/core/testing';

import { NoopService } from './noop.service';

describe('NoopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoopService]
    });
  });

  it('should be created', inject([NoopService], (service: NoopService) => {
    expect(service).toBeTruthy();
  }));
});
