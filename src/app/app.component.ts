import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-calculator';
  previousInput = 0;
  superscript = '';
  input = '';

  appendToInput(num) {
    this.input = `${this.input}${num}`;
  }

  clearInput() {
    this.input = '';
    this.superscript = '';
    this.previousInput = 0;
  }

  prepareToAdd() {
    this.previousInput = this.previousInput + parseInt(this.input);
    this.superscript = `${this.previousInput}`;
    this.input = '';
  }

  executeEquals() {
    this.input = `${this.previousInput + parseInt(this.input)}`;
    this.previousInput = 0;
    this.superscript = '';
  }
}
