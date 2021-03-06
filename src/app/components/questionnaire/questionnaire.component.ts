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
  render = true
  constructor(public questionsService: QuestionService) { }

  ngOnInit(): void {
    this.currentQuestion = this.questionsService.getQuestionWrapper(0)
  }

  log(t: any): void {
    console.log(t);
  }

  reload() {
    this.render = false;
    setTimeout(() => this.render = true);  }


  onNext() {
    // this.radio = !this.radio
    // console.log(this.currentQuestion.type, this.currentAnswer)
    if (this.currentQuestion.type !== "empty" && !this.currentAnswer) {
      return;
    }
    let t = this.currentAnswer;
    this.currentAnswer = null;
    this.currentQuestion = this.questionsService.getQuestionWrapper(t);
    this.renderOptions();

  }
  checked = false

  onClick() {
    return this.checked
  }

  onPrev() {
    this.currentQuestion = this.questionsService.getPreviousQuestion();
    this.renderOptions();
  }

  renderOptions() {
    this.reload();
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

  saveAnswer($event: any, type: string) {
    this.currentAnswer = $event
    if (type === "text") {
      if (!this.currentAnswer.match(/\d+/)) {
        this.currentAnswer = null;
      }
    } else if (type === "radio") {
      // if(!this.currentAnswer.match());
    }
  }

}
