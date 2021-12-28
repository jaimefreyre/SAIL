import { TestBed } from '@angular/core/testing';

import { ServiceNuevoService } from './service-nuevo.service';

describe('ServiceNuevoService', () => {
  let service: ServiceNuevoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNuevoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
