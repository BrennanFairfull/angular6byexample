import { Component, OnInit } from '@angular/core';
import { Exercise, ExercisePlan, WorkoutPlan } from './model';
import { buildWorkout } from './WorkoutBuilder';

@Component({
  selector: 'abe-workout-runner',
  templateUrl: './workout-runner.component.html',
  styles: []
})
export class WorkoutRunnerComponent implements OnInit {
  constructor() { }

  workoutPlan: WorkoutPlan;
  restExercise: ExercisePlan;
  ngOnInit() {
    this.workoutPlan = buildWorkout();
    this.restExercise = new ExercisePlan(
      new Exercise('rest', 'relax!', 'Relax a bit', 'rest.png'),
      this.workoutPlan.restBetweenExercise
    );
  }

}
