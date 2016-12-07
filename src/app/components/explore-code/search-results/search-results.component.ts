import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../../../services/search';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.template.html'
})

export class SearchResultsComponent {
  public repos: any;
  private reposSub: Subscription;

  constructor(private searchService: SearchService){
    this.repos = searchService.getRepos();
  }

  hasRepos() {
    this.searchService.hasRepos;
  }

  ngOnInit() {
    this.reposSub = this.searchService.searchResults$.subscribe((result) => {
      this.repos = result;
    });
  }
}
