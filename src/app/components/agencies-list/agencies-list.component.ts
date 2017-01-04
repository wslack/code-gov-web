import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { TermService } from '../../services/term';

@Component({
  selector: 'agencies-list',
  template: require('./agencies-list.template.html')
})

export class AgenciesListComponent{
  public hasAgencies: boolean = false;
  public agencies: any;
  private agenciesSub: Subscription;

  constructor(private termService: TermService){}

  getAgencies(): Observable<any> {
    return this.termService.getTerms();
  }

  newAgenciesSubscription(): Subscription {
    return this.getAgencies().subscribe(
      (response: any) => {
        this.agencies = response['terms'];
        console.log(this.agencies);
        this.hasAgencies = true;
      }
    );
  }

  ngOnInit() {
    this.agenciesSub = this.newAgenciesSubscription();
  }

  ngOnDestroy() {
    if (typeof this.agenciesSub !== 'undefined') {
      this.agenciesSub.unsubscribe();
    }
  }
}
