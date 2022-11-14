import { TestBed } from '@angular/core/testing';

import { CompromisosService } from './compromisos.service';

describe('CompromisosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompromisosService = TestBed.get(CompromisosService);
    expect(service).toBeTruthy();
  });
});
