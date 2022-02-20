import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radiooptions',
  templateUrl: './radiooptions.component.html',
  styleUrls: ['./radiooptions.component.css']
})
export class RadiooptionsComponent {
  @Input() label: string = "";

  constructor() { }
}
