import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()

export class SearchService {
  public hasRepos: boolean;
  private repos: Array<any>;
  private results = new Subject<boolean>();
  searchResults$ = this.results.asObservable();

  constructor(private http: Http) {}

  checkRepos() {
    if (this.getRepos() != null && this.getRepos().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getRepos() {
    return this.repos;
  }

  search(from: number, size: number, query: string): Observable<Response> {
    let queryParams = '?_fulltext=' + query + '&from=' + from + '&size=' + size;
    let queryUrl = API_URL + 'repos' + queryParams;

    return this.http.get(queryUrl).map((res:Response) => res.json());
  }

  setSearchResults(result) {
    this.hasRepos = this.checkRepos();
    this.repos = result;
    this.results.next(result);
  }
}
