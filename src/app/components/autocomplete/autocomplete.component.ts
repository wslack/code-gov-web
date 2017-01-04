import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { TermService } from '../../services/term';

@Component({
  selector: 'autocomplete',
  template: require('./autocomplete.template.html')
})

export class AutocompleteComponent {
  @Input() query: string;
  public results: any;
  private termsSub: Subscription;

  constructor(private termService: TermService){}

  newTermsSubscription(): Subscription {
    return this.newTermQuery().subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }

  newTermQuery(): Observable<any> {
    return this.termService.getTerms('term=' + this.query + '&size=4');
  }

  ngOnChanges() {
    this.termsSub = this.newTermsSubscription();
  }

  ngOnDestroy() {
    if (typeof this.termsSub !== 'undefined') {
      this.termsSub.unsubscribe();
    }
  }
}
