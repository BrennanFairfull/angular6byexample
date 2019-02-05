import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'abe-exercise-description',
  templateUrl: './exercise-description.component.html',
  styles: []
})
export class ExerciseDescriptionComponent implements OnInit {

  constructor() { }

  @Input() description: string; // @Input: component property is available for data binding
  @Input() steps: string;

  ngOnInit() {
    this.description = "Description property";
  }

}
