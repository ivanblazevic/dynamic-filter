import { Component, OnInit, NgZone } from '@angular/core';
import { Filters, Option, Config, OptionType } from 'dynamic-filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  options: Option[] = [];
  config: Config;
  result: any = {};

  constructor(private ngZone: NgZone) {

    this.config = {
      callback: this.onCallback,
      errorCallback: this.onCallback
    };

    const option1: Option = {
      label: 'Option 1',
      field: 'Option1',
      type: OptionType.OPTIONS,
      options: ['Test 1', 'Test 2']
    };

    const option2: Option = {
      label: 'Text Option',
      field: 'Option2',
      type: OptionType.TEXT
    };

    this.options.push(option1);
    this.options.push(option2);

  }

  // NOTE: it is importat to use es6-arrow-function to gain access to 'this'
  onCallback = (result) => {
    this.result = result;
  }

  onErrorCallback = (error) => {
    alert(error);
  }

}
