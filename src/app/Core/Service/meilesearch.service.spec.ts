import { TestBed } from '@angular/core/testing';

import { MeilesearchService } from './meilesearch.service';

describe('MeilesearchService', () => {
  let service: MeilesearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeilesearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
