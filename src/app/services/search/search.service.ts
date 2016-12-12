import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()

export class SearchService {
  public hasRepos: boolean = false;
  public query: string;
  private displayedRepos: number;
  private repos: Array<any>;
  private reposCount: number;
  private results = new Subject<boolean>();
  private searchStart: number;

  constructor(private http: Http) {}

  addDisplayedRepos(count) {
    this.displayedRepos += count;
  }

  addSearchStart(newStart) {
    this.searchStart += newStart;
  }


  checkRepos() {
    if (this.getRepos() != null && this.getRepos().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getDisplayedRepos() {
    return this.displayedRepos;
  }

  getSearchStart() {
    return this.searchStart;
  }

  getRepos() {
    return this.repos;
  }

  getReposCount() {
    return this.reposCount;
  }

  getQuery() {
    return this.query;
  }

  search(from: number, size: number, query: string): Observable<Response> {
    this.query = query;

    let queryParams = '?_fulltext=' + query + '&from=' + from + '&size=' + size;
    let queryUrl = API_URL + 'repos' + queryParams;

    return this.http.get(queryUrl).map(
      (res:Response) => res.json());
  }

  searchResults(): Observable<any> {
    return this.results;
  }

  setSearchResults(result, total) {
    this.repos = result;
    this.displayedRepos = result.length;
    this.hasRepos = this.checkRepos();
    this.reposCount = total;
    this.searchStart = result.length;

    this.results.next(result);
  }
}
