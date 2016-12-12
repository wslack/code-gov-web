import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ReposSearchComponent } from './';
import { SearchService } from '../../services/search';

describe('ReposSearchComponent', () => {

  let mockRouter:any;


  beforeEach(() => {
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [
        ReposSearchComponent
      ],
      imports: [
        HttpModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: SearchService, useClass: MockSearchService },
        { provide: Router, useClass: MockRouter }
      ]
    });

    this.fixture = TestBed.createComponent(ReposSearchComponent);
    this.reposSearchComponent = this.fixture.componentInstance;
  });

  describe('navigateToResults', () => {
    it('should navigate to results page if not there already',
      inject([Router], router => {
      spyOn(router, 'navigateByUrl');

      this.reposSearchComponent.navigateToResults();

      expect(router.navigateByUrl).toHaveBeenCalled();
    }));
  });

  describe('onSubmit', () => {
    it('should call the search function', () => {
      spyOn(this.reposSearchComponent, 'search');

      this.reposSearchComponent.onSubmit({query: 'GSA'});

      expect(this.reposSearchComponent.search).toHaveBeenCalledWith('GSA');
    });
  });

  describe('search', () => {
    it('should call the search service',
      inject([SearchService], searchService => {
      spyOn(searchService, 'setSearchResults');
      spyOn(this.reposSearchComponent, 'navigateToResults');

      spyOn(searchService, 'search').and.callFake(function(start, size, query) {
        return Observable.of({ response: 'success'});
      });

      this.reposSearchComponent.search('GSA');
      expect(searchService.search).toHaveBeenCalledWith(0, 10, 'GSA');
    }));

    it('should call the navigateToResults function',
      inject([SearchService], searchService => {
      spyOn(searchService, 'setSearchResults');
      spyOn(this.reposSearchComponent, 'navigateToResults');

      spyOn(searchService, 'search').and.callThrough();

      this.reposSearchComponent.search('GSA');
      expect(this.reposSearchComponent.navigateToResults).toHaveBeenCalled();
    }));

    it('should call the setSearchResults function in the SearchService',
      inject([SearchService], searchService => {
      spyOn(searchService, 'setSearchResults');
      spyOn(this.reposSearchComponent, 'navigateToResults');

      spyOn(searchService, 'search').and.callThrough();

      this.reposSearchComponent.search('GSA');
      expect(searchService.setSearchResults).toHaveBeenCalledWith(searchService.getResult(), 3);
    }));
  });
});

class MockRouter {
  url: string;
  constructor() {
    this.url = '/explore-code/';
  }

  navigateByUrl() {
    return true;
  }
}

class MockSearchService {
  result = {total: 3, repos: [{name: 'GSA'}, {name: 'GSA 2'}, {name: 'GSA 3'}]};

  getResult() {
    return this.result['repos'];
  }

  search(arg, arg2, arg3) {
    return Observable.of(this.result);
  }

  setSearchResults(result) {
    return true;
  }
}
