import { Component } from '@angular/core';
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
  template: require('./repos-search.template.html')
})

export class ReposSearchComponent {
  constructor(
    public formBuilder: FormBuilder,
    private searchService: SearchService,
    private router: Router
  ) {}

  searchForm: FormGroup;

  navigateToResults() {
    if (this.router.url != '/explore-code/results') {
      this.router.navigateByUrl('/explore-code/results');
    }
  }

  ngOnInit() {
      this.searchForm = this.formBuilder.group({
        query: [''],
    });
  }

  onSubmit(form: any): void {
    this.search(form.query);
  }

  search(query: string) {
    this.searchService.search(0, 10, query).subscribe(
      result => {
        if (result) {
          this.searchService.setSearchResults(result['repos'], result['total']);
          this.navigateToResults();
        } else {
          console.log("No Repos Found");
        }
      },
      error => {
        console.log(error)
      }
    );
  }
}
