import { TestBed } from '@angular/core/testing';

import { AuthGateService } from './auth-gate.service';

describe('AuthGateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGateService = TestBed.get(AuthGateService);
    expect(service).toBeTruthy();
  });
});
