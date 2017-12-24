import { TestBed, inject } from '@angular/core/testing';

import { RouterGaurdServiceService } from './router-gaurd-service.service';

describe('RouterGaurdServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterGaurdServiceService]
    });
  });

  it('should be created', inject([RouterGaurdServiceService], (service: RouterGaurdServiceService) => {
    expect(service).toBeTruthy();
  }));
});
