import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  currentQuestion: String | any
  currentAnswer: any
  checkBox: boolean = true
  answer = false
  ended: boolean = true
  constructor(public questionsService: QuestionService) { }

  ngOnInit(): void {
    this.currentQuestion = this.questionsService.getQuestionWrapper(0)
  }

  log(t: any): void {
    console.log(t);
  }

  onNext() {
    if(this.currentQuestion.type !== "empty" && !this.currentAnswer) {
      return;
    }
    let t = this.currentAnswer;
    this.currentAnswer = null;
    this.currentQuestion = this.questionsService.getQuestionWrapper(t);
    // console.log("H",this.currentQuestion, this.currentAnswer)
    if (this.currentQuestion.question == "done") {
      this.ended = false
    }
    if (this.currentQuestion.type == "checkbox") {
      this.checkBox = true
    }
    else if (this.currentQuestion.type == "input") {
      this.checkBox = false
    }
    else if (this.currentQuestion.type == "empty") {
      this.checkBox = true
    }

  }

  onPrev(){
    this.currentQuestion = this.questionsService.getPreviousQuestion();
  }

  saveAnswer($event: any, type: string) {
    this.currentAnswer = $event
    if(type === "text") {
      if(!this.currentAnswer.match(/\d+/)){
        this.currentAnswer = null;
      }
    } else if (type === "radio"){
      // if(!this.currentAnswer.match());
    }
  }

}
