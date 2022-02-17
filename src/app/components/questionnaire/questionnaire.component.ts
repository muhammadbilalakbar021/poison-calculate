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

  onNext() {
    this.currentQuestion = this.questionsService.getQuestionWrapper(this.currentAnswer)
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

  saveAnswer($event: any) {
    console.log($event)
    this.currentAnswer = $event

  }

}
