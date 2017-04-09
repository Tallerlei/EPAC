import { TestBed, inject } from '@angular/core/testing';

import { GetXmlService } from './shared/get-xml.service';

describe('GetXmlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetXmlService]
    });
  });

  it('should ...', inject([GetXmlService], (service: GetXmlService) => {
    expect(service).toBeTruthy();
  }));
});