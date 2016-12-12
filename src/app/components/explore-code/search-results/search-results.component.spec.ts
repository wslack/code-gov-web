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
import { TruncatePipe } from '../../../pipes/truncate';

describe('SearchResultsComponent', () => {

  describe('getMoreRepos', () => {

    describe(
      'when the repo count is greater than or equal to the number of' +
      'Displayed Repos ', () => {
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
              RouterModule
            ],
            providers: [
              { provide: SearchService, useClass: MockSearchService },
              { provide: Router, useClass: MockRouter }
            ]
          });

          let service = TestBed.get(SearchService, null);

          spyOn(service, 'getDisplayedRepos').and.returnValue(5);
          spyOn(service, 'getReposCount').and.returnValue(5);

          this.fixture = TestBed.createComponent(SearchResultsComponent);
          this.searchResultsComponent = this.fixture.componentInstance;
        });

        it('does nothing', inject([SearchService], searchService => {
          spyOn(searchService, 'search');

          this.searchResultsComponent.getMoreRepos();

          expect(searchService.search).not.toHaveBeenCalled();
        }));
      }
    );

    describe(
      'when the number of Displayed Repos is less than the total number ' +
      'of Repos', () => {
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
              { provide: Router, useClass: MockRouter }
            ]
          });

          let service = TestBed.get(SearchService, null);

          spyOn(service, 'getDisplayedRepos').and.returnValue(4);
          spyOn(service, 'getReposCount').and.returnValue(5);

          this.fixture = TestBed.createComponent(SearchResultsComponent);
          this.searchResultsComponent = this.fixture.componentInstance;
        });

        it('calls the Search Service search function',
          inject([SearchService], searchService => {
            spyOn(searchService, 'getSearchStart').and.returnValue(4);
            spyOn(searchService, 'getQuery').and.returnValue('GSA');
            spyOn(searchService, 'search').and.callThrough();

            this.searchResultsComponent.getMoreRepos();

            expect(searchService.search).toHaveBeenCalledWith(
              searchService.getSearchStart(),
              10,
              searchService.getQuery()
            );
          }
        ));
      }
    );
  });

  describe('ngOnInit', () => {
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
          RouterTestingModule.withRoutes([
           {
             path: 'explore-code/repos/:id',
             component: SearchResultsComponent
           }
          ])
        ],
        providers: [
          { provide: SearchService, useClass: MockSearchService }
        ]
      });
    });

    it('subscribes to the searchResults from the SearchService',
      inject([SearchService], searchService => {
        spyOn(searchService, 'searchResults').and.callFake(function() {
          return Observable.of([{repoId: 1}, {repoId: 2}])
        });

        let fixture = TestBed.createComponent(SearchResultsComponent);
        fixture.detectChanges();

        expect(searchService.searchResults).toHaveBeenCalled();
      })
    );
  });

  describe('onScroll', () => {
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
          { provide: SearchService, useClass: MockSearchService }
        ]
      });

      this.fixture = TestBed.createComponent(SearchResultsComponent);
      this.searchResultsComponent = this.fixture.componentInstance;
    });

    it('calls the getMoreRepos function', () => {
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

  navigateByUrl() {
    return true;
  }
}

class MockSearchService {
  result = {total: 3, repos: [{name: 'GSA'}, {name: 'GSA 2'}, {name: 'GSA 3'}]};
  repos: any = this.result['repos'];

  addDisplayedRepos(value) {
    return true;
  }

  addSearchStart(value) {
    return true;
  }

  checkRepos() {
    if (this.getRepos() != null && this.getRepos().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getDisplayedRepos() {
    return 2;
  }

  getRepos() {
    return this.repos;
  }

  getReposCount() {
    return this.result['total'];
  }

  getSearchStart() {
    return 2;
  }

  getQuery() {
    return 'GSA';
  }

  search(arg, arg2, arg3) {
    return Observable.of(this.result);
  }

  searchResults() {
    return Observable.of(this.repos);
  }

  setSearchResults(result) {
    return true;
  }
}
