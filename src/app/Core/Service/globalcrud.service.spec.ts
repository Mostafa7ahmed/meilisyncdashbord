import { TestBed } from '@angular/core/testing';

import { GlobalcrudService } from './globalcrud.service';

describe('GlobalcrudService', () => {
  let service: GlobalcrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalcrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
