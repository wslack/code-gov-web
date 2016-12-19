import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { SearchService } from '../../services/search';

@Component({
  selector: 'repos-search',
  template: require('./repos-search.template.html'),
  styles: [require('./repos-search.style.scss')],
})

export class ReposSearchComponent {
  @Input() queryValue: string;

  constructor(
    public formBuilder: FormBuilder,
    private searchService: SearchService,
    private router: Router
  ) {}

  searchForm: FormGroup;

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: [''],
    });
  }

  onSubmit(form: any): void {
    this.search(form.query);
  }

  search(query: string) {
    this.router.navigateByUrl('/search?q=' + query);
  }
}
