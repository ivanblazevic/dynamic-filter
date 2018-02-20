import { Component, OnInit } from '@angular/core';

import { Filters, Option, Config } from '../../../..';
import { OptionType } from '../../../../src/OptionType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  options: Option[] = [];
  config: Config;

  constructor() {

    this.config = {
      callback: this.onCallback,
      errorCallback: this.onCallback
    };

    const option1: Option = {
      label: 'Option 1',
      field: 'Option 1',
      type: OptionType.OPTIONS,
      options: ['Test 1']
    };

    this.options.push(option1);

  }

  onCallback(result) {
    console.log(result);
  }

  onErrorCallback(error) {
    console.log(error);
  }

}
