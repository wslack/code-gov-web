import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../../../services/search';

@Component({
  selector: 'search-results',
  template: require('./search-results.template.html')
})

export class SearchResultsComponent {
  public hasRepos: boolean;
  public repos: any;
  private displayedRepos: number;
  private query: string;
  private reposCount: number;
  private searchStart: number = 0;
  private reposSub: Subscription;

  constructor(private searchService: SearchService){
    this.hasRepos = searchService.checkRepos();

    this.repos = searchService.getRepos();
    this.reposCount = searchService.getReposCount();
    this.displayedRepos = searchService.getDisplayedRepos();
    this.searchStart = searchService.getSearchStart();
  }

  getMoreRepos() {
    if (this.displayedRepos < this.reposCount) {
      this.searchService.search(
        this.searchService.getSearchStart(),
        10,
        this.searchService.getQuery()).subscribe(
        result => {
          if (result) {
            this.searchService.addDisplayedRepos(result['repos'].length);
            this.searchService.addSearchStart(result['repos'].length);
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

  ngOnInit() {
    this.reposSub = this.searchService.searchResults().subscribe((result) => {
      this.displayedRepos = this.searchService.getDisplayedRepos();
      this.searchStart = this.searchService.getSearchStart();
      this.reposCount = this.searchService.getReposCount();
      this.repos = result;
      this.hasRepos = this.searchService.checkRepos();
    });
  }

  onScroll() {
    this.getMoreRepos();
  }
}
