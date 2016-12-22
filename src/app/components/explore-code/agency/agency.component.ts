import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AgencyService, Agency } from '../../../services/agency';
import { LanguageIconPipe } from '../../../pipes/language-icon';
import { PluralizePipe } from '../../../pipes/pluralize';
import { SeoService } from '../../../services/seo';
import { TruncatePipe } from '../../../pipes/truncate';

@Component({
  selector: 'agency',
  styles: [require('./agency.styles.scss')],
  template: require('./agency.template.html')
})

export class AgencyComponent implements OnInit, OnDestroy {
  agency: Agency;
  public hasRepos: boolean = false;
  public repos;
  public searchQuery: string;
  private eventSub: Subscription;

  constructor(
    private agencyService: AgencyService,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnDestroy() {
    this.hasRepos = false;
    this.agency = null;
    if (this.eventSub) this.eventSub.unsubscribe();
  }

  ngOnInit() {
    this.eventSub = this.route.params.subscribe(params => {

      let id = params['id'];
      let queryValue = 'agency.acronym=' + id;

      this.agency = this.agencyService.getAgency(id);
      this.searchQuery = '_fulltext=' + queryValue;

      this.seoService.setTitle(this.agency.name, true);
      this.seoService.setMetaDescription('Browse code from the ' + this.agency.name);
      this.seoService.setMetaRobots('Index, Follow');
    });
  }

  agencyId() {
    return this.agency.id;
  }
}
