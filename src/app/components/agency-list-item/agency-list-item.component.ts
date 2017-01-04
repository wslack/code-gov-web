import { Component, Input } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Component({
  selector: 'agency-list-item',
  template: require('./agency-list-item.template.html')
})

export class AgencyListItemComponent {
  @Input() agency;

  constructor() {}
}
