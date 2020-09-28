import { TestBed } from '@angular/core/testing';

import { FeadbackService } from './feadback.service';

describe('FeadbackService', () => {
  let service: FeadbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeadbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
