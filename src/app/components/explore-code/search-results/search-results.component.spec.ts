import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { Observable } from 'rxjs/Rx';

import { LanguageIconPipe } from '../../../pipes/language-icon';
import { PluralizePipe } from '../../../pipes/pluralize';
import { ReposSearchComponent } from '../../repos-search';
import { SearchResultsComponent } from './';
import { SearchService } from '../../../services/search';
import { StateService } from '../../../services/state';
import { TruncatePipe } from '../../../pipes/truncate';

describe('SearchResultsComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LanguageIconPipe,
        PluralizePipe,
        ReposSearchComponent,
        SearchResultsComponent,
        TruncatePipe
      ],
      imports: [
        HttpModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SearchService, useClass: MockSearchService },
        { provide: StateService, useClass: MockStateService },
        { provide: ActivatedRoute, useClass: MockRouter }
      ]
    });

    this.fixture = TestBed.createComponent(SearchResultsComponent);
    this.searchResultsComponent = this.fixture.componentInstance;
  });

  describe('getMoreRepos', () => {
    /*
    it('calls the Search Service search function',
      inject([SearchService], searchService => {
        spyOn(searchService, 'search').and.callThrough();

        this.searchResultsComponent.getMoreRepos();
        expect(searchService.search).toHaveBeenCalledWith(
          0,
          15,
          ''
        );
      }
    ));
    */
  });

  describe('onScroll', () => {
    it('triggers the getMoreRepos function', () => {
      spyOn(this.searchResultsComponent, 'getMoreRepos');

      this.searchResultsComponent.onScroll();
      expect(this.searchResultsComponent.getMoreRepos).toHaveBeenCalled();
    });
  });
});

class MockRouter {
  url: string;
  constructor() {
    this.url = '/explore-code/';
  }

  navigateByUrl(arg) {
    return true;
  }
}

class MockSearchService {
  result = {total: 3, repos: [{name: 'GSA'}, {name: 'GSA 2'}, {name: 'GSA 3'}]};

  search(arg, arg2, arg3) {
    return Observable.of(this.result);
  }
}

class MockStateService {

  set(arg, arg2) {
    return true;
  }
}
