import { APP_BASE_HREF } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ReposSearchComponent } from './';
import { SearchService } from '../../services/search';

describe('ReposSearchComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReposSearchComponent
      ],
      imports: [
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        SearchService,
      ]
    });

    this.fixture = TestBed.createComponent(ReposSearchComponent);
    this.reposSearchComponent = this.fixture.componentInstance;
  });

  describe('onSubmit', () => {
    it('should call the search function', () => {
      spyOn(this.reposSearchComponent, 'search');

      this.reposSearchComponent.onSubmit({query: 'GSA'});

      expect(this.reposSearchComponent.search).toHaveBeenCalledWith('GSA');
    });
  });
});
