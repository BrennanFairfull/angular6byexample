import { Component, OnInit } from '@angular/core';
import { Exercise, ExercisePlan, WorkoutPlan } from './model';
import { buildWorkout } from './WorkoutBuilder';

@Component({
  selector: 'abe-workout-runner',
  //templateUrl: './workout-runner.component.html',
  templateUrl: './workout-runner.component.html',
  styles: []
})
export class WorkoutRunnerComponent implements OnInit {

  constructor() { }

  workoutPlan: WorkoutPlan;
  restExercise: ExercisePlan;
  currentExerciseIndex: number;
  workoutTimeRemaining: number;
  // Current exercise duration
  exerciseRunningDuration: number;
  // Current exercise
  currentExercise: ExercisePlan;
  
  ngOnInit() {
    this.workoutPlan = buildWorkout();
    this.restExercise = new ExercisePlan(
      new Exercise('rest', 'relax!', 'Relax a bit', 'rest.png'),
      this.workoutPlan.restBetweenExercise
    );
    this.start();
  }

  start() {
    this.workoutTimeRemaining = this.workoutPlan.totalWorkoutDuration();
    this.currentExerciseIndex = 0;
    this.startExcercise(this.workoutPlan.exercises[this.currentExerciseIndex])
  }

  startExcercise(exercisePlan: ExercisePlan) {
    this.currentExercise = exercisePlan;
    this.exerciseRunningDuration = 0;
    
    // JS function with a delay of 1000ms 
    const intervalId = setInterval(() => {
      if(this.exerciseRunningDuration >= this.currentExercise.duration) {
        clearInterval(intervalId);
        const next: ExercisePlan = this.getNextExercise();
        if(next) {
          if(next !== this.restExercise){
            this.currentExerciseIndex++;
          }
          this.startExcercise(next);
        } else {
          console.log('Workout complete!');
        } 
      } else {
        this.exerciseRunningDuration++;
      }
    }, 1000);
  }

  getNextExercise(): ExercisePlan {
    let nextExercise: ExercisePlan = null;
    // If currently resting, return next exercise
    if (this.currentExercise === this.restExercise) {
      nextExercise = this.workoutPlan.exercises[this.currentExerciseIndex + 1];
    }
    // If not resting, next exercise is rest
    else if (this.currentExerciseIndex < this.workoutPlan.exercises.length - 1) {
      nextExercise = this.restExercise;
    }
    return nextExercise;
  }

}
