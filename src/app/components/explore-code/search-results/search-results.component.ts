import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { SearchService } from '../../../services/search';
import { StateService } from '../../../services/state';

@Component({
  selector: 'search-results',
  template: require('./search-results.template.html')
})

export class SearchResultsComponent {
  public hasRepos: boolean = false;
  public repos: any;
  private numberOfReposToFetch: number = 15;
  private query: string = '';
  private reposTotal: number;
  private searchStart: number = 0;
  private reposSub: Subscription;

  constructor(
    public stateService: StateService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ){
    this.stateService.set('section', 'explore-code');
  }

  checkRepos(): boolean {
    if (this.repos != null && this.repos.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getMoreRepos() {
    if (this.searchStart < this.reposTotal) {
      this.searchService.search(
        this.searchStart,
        this.numberOfReposToFetch,
        this.query
      )
      .subscribe(
        result => {
          if (result) {
            let returnedReposCount = result['repos'].length
            this.searchStart += returnedReposCount;
            this.repos.push(...result['repos']);
          } else {
            console.log("No Repos Found");
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }


  newSearch(): Observable<any> {
    return this.activatedRoute.queryParams.map((params) => {
      //Get the Query Param from the URL
      this.query = params['q'];
    }).flatMap(() => {
      //Perform a Search
      return this.searchService.search(
        this.searchStart,
        this.numberOfReposToFetch,
        this.query
      );
    });
  }

  newSearchSubscription(): Subscription {
    return this.newSearch().subscribe(
      (response: any) => {
        this.searchStart = response.repos.length;
        this.reposTotal = response.total;
        this.repos = response.repos;
        this.hasRepos = this.checkRepos();
      }
    );
  }

  ngOnDestroy() {
    if (typeof this.reposSub !== 'undefined') {
      this.reposSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.reposSub = this.newSearchSubscription();
  }

  onScroll() {
    //Triggered by Infinite Scroll
    this.getMoreRepos();
  }
}
