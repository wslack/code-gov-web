import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()

export class SearchService {
  public query: string;
  private displayedRepos: number;
  private repos: Array<any>;
  private reposCount: number;
  private results = new Subject<boolean>();
  private searchStart: number;

  constructor(private http: Http) {}

  search(from: number, size: number, query: string): Observable<Response> {
    this.query = query;

    let queryParams = '?_fulltext=' + query + '&from=' + from + '&size=' + size;
    let queryUrl = API_URL + 'repos' + queryParams;

    return this.http.get(queryUrl).map(
      (res:Response) => {
        return res.json()
      }
    );
  }
}
