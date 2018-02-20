import { Component, OnInit, Input } from '@angular/core';
import { Filters, Option, Config } from '../../../../..';
import { OptionType } from '../../../../../src/OptionType';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dyamic-filter.component.html',
 // styleUrls: ['./dynamic-filter.component.css']
})
export class DynamicFilterComponent implements OnInit {

  @Input() options: Option[];
  @Input() config: Config;

  filters: Filters;

  constructor() {

  }

  ngOnInit(): void {
    this.filters = new Filters(this.options, this.config);
    this.filters.add();
  }

}
