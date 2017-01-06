import { Component, Input } from '@angular/core';

@Component({
  selector: 'autocomplete-result',
  styles: [require('./autocomplete-result.style.scss')],
  template: require('./autocomplete-result.template.html')
})

export class AutocompleteResultComponent {
  @Input() result;
  public resourceLoaded: boolean = false;
  public resource: Object = {};
  private termType: string;

  private filterTermType(term_type) {
    return term_type.replace(/\..*$/, '');
  }

  getResourceAttributes(resource){
    switch (resource.termType) {
      case 'agency':
        this.resource['name'] = 'Result Name';
        this.resource['iconId'] = 'assets/img/logos/whitehouse.png';
        this.resource['imageIcon'] = true;
        this.resource['url'] = '/agencies/cfpb';
        this.resourceLoaded = true;
        break;
      default:
        //Do nothing & hide the resource?
        break;
    }
  }

  ngOnInit() {
    this.setTermType();
    this.getResourceAttributes(this.resource);
  }

  setTermType() {
    this.resource['termType'] = this.filterTermType(this.result.term_type);
    console.log(this.resource);
  }
}
