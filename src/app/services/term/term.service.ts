import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { ApiService } from '../api';

@Injectable()

export class TermService extends ApiService {

  constructor(private http: Http) {
    super(http);
  }

  getTerms(query) {
    return super.fetch('terms', query);
  }
}
