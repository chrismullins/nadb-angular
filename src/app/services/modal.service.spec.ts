import { TestBed, inject } from '@angular/core/testing';

import { ModalServiceService } from './modal.service';

describe('ModalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalServiceService]
    });
  });

  it('should be created', inject([ModalServiceService], (service: ModalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
