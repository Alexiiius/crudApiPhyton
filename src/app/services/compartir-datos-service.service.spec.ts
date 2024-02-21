import { TestBed } from '@angular/core/testing';

import { CompartirDatosServiceService } from './compartir-datos-service.service';

describe('CompartirDatosServiceService', () => {
  let service: CompartirDatosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartirDatosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
