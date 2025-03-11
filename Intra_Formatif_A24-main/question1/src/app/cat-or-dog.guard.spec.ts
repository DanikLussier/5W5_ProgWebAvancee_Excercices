import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { catOrDogGuard } from './cat-or-dog.guard';

describe('catOrDogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => catOrDogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
