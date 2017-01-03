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

  getTerms() {
    let params = 'term_type=agency.acronym';

    return super.fetch('terms', params);
  }
}
