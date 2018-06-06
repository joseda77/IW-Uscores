import { TestBed, inject } from '@angular/core/testing';

import { TorneoService } from './torneo.service';

describe('TorneoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TorneoService]
    });
  });

  it('should be created', inject([TorneoService], (service: TorneoService) => {
    expect(service).toBeTruthy();
  }));
});
