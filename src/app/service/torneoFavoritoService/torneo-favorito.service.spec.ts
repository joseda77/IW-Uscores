import { TestBed, inject } from '@angular/core/testing';

import { TorneoFavoritoService } from './torneo-favorito.service';

describe('TorneoFavoritoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TorneoFavoritoService]
    });
  });

  it('should be created', inject([TorneoFavoritoService], (service: TorneoFavoritoService) => {
    expect(service).toBeTruthy();
  }));
});
