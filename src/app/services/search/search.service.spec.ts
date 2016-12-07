import {
  Http,
  Headers,
  BaseRequestOptions,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  XHRBackend
} from '@angular/http';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let backend: XHRBackend;
  let defaultOptions: BaseRequestOptions;
  beforeEach(() => { service = new SearchService(new Http(backend, defaultOptions)); });

  describe('checkRepos', () => {
    it('returns true if repos is greater than 0', () => {
      spyOn(service, 'getRepos').and.returnValue([1,2,3]);

      expect(service.checkRepos()).toBe(true);
    });

    it('returns false if repos is less than 1', () => {
      expect(service.checkRepos()).toBe(false);
    });
  });
});
