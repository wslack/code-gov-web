import { Component, OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AgencyService, Agency } from '../../../../../services/agency';
import { StatusService } from '../../../../../services/status';

import { Subscription } from 'rxjs/Subscription';
import { SeoService } from '../../../../../services/seo';

//import { TruncatePipe } from '../../../pipes/truncate';
//import { MobileService } from '../../../../../services/mobile';
//import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'compliance-dashboard',
  template: require('./compliance-dashboard.template.html')
})

export class ComplianceDashboardComponent implements OnInit, OnDestroy {
  agencies: Agency[];
  public statuses[];
  private statusesSub: Subscription;

  constructor(
    private agencyService: AgencyService,
    private statusService: StatusService
    ) {}

  ngOnInit() {
    this.agencies = this.agencyService.getAgencies();
    this.getStatuses();
  }

  ngOnDestroy(){
  	if (this.statusesSub) this.statusesSub.unsubscribe();
  }

  getStatuses() {
    var agency;
    var requirements
    var rValue;
    var requirementStatus;
    var overallStatus;

    this.statusesSub = this.statusService.getJsonFile().
      subscribe((result) => {
        if (result) {
          console.log(result);
          for (let status in result.statuses) {
 			      // TODO: pull from AgencyService. AgencyService currently fails if json couldn't be parsed.

            requirements = new Array();
            for(let requirement in result.statuses[status].requirements){
             
              rValue = result.statuses[status].requirements[requirement];
              if(rValue <1){
                if(rValue > 0){
                  requirementStatus = "partial";
                }
                else {
                  requirementStatus = "noncompliant";
                }
              }
              else{
                requirementStatus = "compliant";
              }

              if(requirement != "overallCompliance"){
                requirements.push({"text": requirement, "status": requirementStatus});
              }
              else{
               overallStatus = requirementStatus;
              }
            }

            agency = { "id" : status, "name" : result.statuses[status].metadata.agency.name, "overall" : overallStatus }; 
          	this.statuses.push({"id": status, "agency": agency, "requirements": requirements});
          }
        } else {
          console.log('Error.');
        }
        console.log(this.statuses);
    });
  }

}
