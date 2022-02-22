import { Injectable } from '@angular/core';

interface Istate {
  count: any,
  currentOption: any,
  time: any,
  estimatetime: any,
  rumack_nomogram: any,
  Timeofing: any,
  previousAnswer: any,
  ingested_dose: any,
  weight: any,
  age: any,
  durationIngestedDose: any,
  riskbox: any,
  arterialPh: any,
  measuredPT: any,
  measuredInr: any,
  measuredCreatinin: any,
  calculatedEncephalopathyGrade: any,
  measuredLactat4: any,
  measuredLactat12: any,
  measuredPhosphate48to96: any,
  chronicuser: boolean,
  signOfHepaticfailure: boolean,
  durationofexposure: boolean,
  checkTemp: boolean,
  ransomLastCheck: boolean,
  complexCount: any,
  patientsptvalue: any,
  patientsarterialvalue: any,
  patientsinrvalue: any,
  patientscreatinevalue: any,
  patientsencephalopathyvalue: any,
  patientslactatelevelvalue: any,
  patientslactatelevelvalue12: any,
  patientshosphatevalue: any,
  alertCheck: any,
  type: any,
  answer: any
}

interface IReturn {
  question: String,
  answer: Array<String>,
  type: String
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  state: Istate = {
    count: null,
    currentOption: null,
    time: null,
    estimatetime: null,
    rumack_nomogram: false,
    Timeofing: false,
    previousAnswer: null,
    ingested_dose: null,
    weight: null,
    age: null,
    durationIngestedDose: null,
    riskbox: null,
    arterialPh: null,
    measuredPT: null,
    measuredInr: null,
    measuredCreatinin: null,
    calculatedEncephalopathyGrade: null,
    measuredLactat4: null,
    measuredLactat12: null,
    measuredPhosphate48to96: null,
    chronicuser: false,
    signOfHepaticfailure: false,
    durationofexposure: true,
    checkTemp: false,
    ransomLastCheck: false,
    complexCount: 0,
    patientsptvalue: null,
    patientsarterialvalue: null,
    patientsinrvalue: null,
    patientscreatinevalue: null,
    patientsencephalopathyvalue: null,
    patientslactatelevelvalue: null,
    patientslactatelevelvalue12: null,
    patientshosphatevalue: null,
    alertCheck: 0,
    type: null,
    answer: null
  }
  history: Array<Istate> = []
  last: IReturn = {
    question: "",
    type: "",
    answer: []
  }
  constructor() { }

  getQuestionWrapper(answer: any) {
    if (answer === undefined) {
      return this.last;
    }
    // console.log("Wrapper called");
    this.state.answer = answer;
    this.state.type = this.last.type;
    // console.log("Pushing", answer);
    this.history.push(JSON.parse(JSON.stringify(this.state)));
    this.last = this.getQuestion(answer);
    console.log("Question:", this.last);
    return this.last;
  }

  getPreviousQuestion() {
    if (this.history.length > 1) {
      this.history.pop(); //Waste current state
      console.log("Popping", this.history[this.history.length - 1]);
      this.state = this.history.pop() || this.state;
      console.log(this.state);
      // console.log("Popped", this.state);
      // console.log("Get Previous Question:",this.state.answer);
    } else {
      this.state = JSON.parse(JSON.stringify(this.history[0]));
      this.history = [];
    }

    return this.getQuestionWrapper(this.state.answer);
  }

  getQuestion(answer: any): IReturn {
    // console.log("1S",this.state.count, answer, this.state.chronicuser, this.state.durationofexposure, this.state.signOfHepaticfailure)
    if (this.state.chronicuser == false && this.state.durationofexposure == true && this.state.signOfHepaticfailure == false) {
      if (this.state.count == null && answer == 0) {
        this.state.count = "Is the duration of acetaminophen ingestion is known ?"
        return {
          question: "Is the duration of acetaminophen ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "Is the duration of acetaminophen ingestion is known ?" && answer == 'yes') {
        //console.log(this.state.count)
        this.state.count = "How many hours was the duration of acetaminophen ingestion ?"
        return {
          question: "How many hours was the duration of acetaminophen ingestion ?",
          type: 'checkbox',
          answer: ['acute single ingestion', 'less than 8 hours', '8-24 hours', '24-48 hours', 'more than 48 hours']
        }

      }
      else if (this.state.count == "How many hours was the duration of acetaminophen ingestion ?" && (answer == 'acute single ingestion' || answer == 'less than 8 hours')) {
        this.state.Timeofing = true
        this.state.durationIngestedDose = "acute single ingestion"
        return {
          question: `Does patient has any of these criteria:
          1. Regular ethanol consumption in excess of 21 units/week in males, 14 units/week in females
          2. Regular use of enzyme-inducing drugs (carbamazepine phenytoin, phenobarbitone rifampacin)
          3. Conditions causing glutathione depletion (malnutrition, HIV, eating disorders, cystic fibrosis)?`,
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.Timeofing == true) {
        this.state.riskbox = answer
        this.state.Timeofing = false
        this.state.count = "Is the time of ingestion known ?"
        return {
          question: "Is the time of ingestion known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "Is the time of ingestion known ?" && this.state.Timeofing == false && answer == 'yes' && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.count = "How many hours after ingestion ?"
        return {
          question: "How many hours after ingestion ?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "Is the time of ingestion known ?" && this.state.Timeofing == false && answer == 'no' && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.count = "Is the earliest possible time of ingestion less than 24 hours?"
        return {
          question: "Is the earliest possible time of ingestion less than 24 hours?",
          type: 'checkbox',
          answer: ['yes, less than 24h', 'more than 24 hours or unknown']
        }
      }
      else if (this.state.count == "How many hours after ingestion ?" && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.time = answer
        this.state.count = "The exact dose of ingestion is known ?"
        //console.log(this.state.riskbox, this.state.count)
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "Is the earliest possible time of ingestion less than 24 hours?" && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.estimatetime = answer
        this.state.count = "The exact dose of ingestion is known ?"
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }

      else if (this.state.count == "The exact dose of ingestion is known ?" && (this.state.riskbox == "no" || this.state.riskbox == "yes") && answer == "yes" && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.count = "how many milligrams of acetaminophen is ingested?"
        return {
          question: "how many milligrams of acetaminophen is ingested?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "how many milligrams of acetaminophen is ingested?" && (this.state.riskbox == "no" || this.state.riskbox == "yes") && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.count = "How many kilograms is the patient ?"
        this.state.ingested_dose = answer
        return {
          question: "How many kilograms is the patient ?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "How many kilograms is the patient ?" && (this.state.riskbox == "no" || this.state.riskbox == "yes") && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.weight = answer
        this.state.count = "How old is the patient ?"
        return {
          question: "How old is the patient ?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "How old is the patient ?" && (this.state.riskbox == "no" || this.state.riskbox == "yes") && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.age = answer
        this.state.rumack_nomogram = true
        this.state.count = "Does patient live in United Kingdom ?"
        //console.log("hello", this.state.age, this.state.weight, this.state.ingested_dose, this.state.ingested_dose / this.state.weight, this.state.time)
        if (this.state.age >= 12 && (this.state.ingested_dose / this.state.weight < 142.86 || this.state.ingested_dose < 10000)) {
          //console.log("hello",)
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age >= 12 && (this.state.ingested_dose / this.state.weight < 250 && this.state.ingested_dose / this.state.weight >= 142.86)) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age >= 12 && (this.state.ingested_dose / this.state.weight < 350 && this.state.ingested_dose / this.state.weight >= 250)) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age >= 12 && (this.state.ingested_dose / this.state.weight < 500 && this.state.ingested_dose / this.state.weight >= 350)) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age >= 12 && this.state.ingested_dose / this.state.weight >= 500) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age < 12 && (this.state.ingested_dose / this.state.weight < 150)) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age < 12 && (this.state.ingested_dose / this.state.weight < 250 && this.state.ingested_dose / this.state.weight >= 150)) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age < 12 && (this.state.ingested_dose / this.state.weight < 350 && this.state.ingested_dose / this.state.weight >= 250)) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age < 12 && (this.state.ingested_dose / this.state.weight < 500 && this.state.ingested_dose / this.state.weight >= 350)) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
        else if (this.state.age < 12 && (this.state.ingested_dose / this.state.weight <= 500)) {
          if (this.state.time != null && this.state.time >= 4 && this.state.time <= 24) {
            this.state.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
            this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.state.chronicuser = true
            this.state.durationofexposure = false
            this.state.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
              answer: []
            }
          }
          else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
              answer: []
            }
          }
        }
      }
      else if (this.state.count == "The exact dose of ingestion is known ?" && (this.state.riskbox == "no" || this.state.riskbox == "yes") && answer == "no" && this.state.durationIngestedDose == "acute single ingestion") {
        this.state.count = "To be continued"
        //console.log("hello", this.state.time, this.state.estimatetime)
        if (this.state.time != null && (this.state.time >= 4 && this.state.time <= 24)) {
          this.state.rumack_nomogram = true
          this.state.count = "Does patient live in United Kingdom ?"
          return {
            question: "Does patient live in United Kingdom ?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else if (this.state.time == null && this.state.estimatetime == "yes, less than 24h") {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: "Start standard or high doses of NAC and measure ALT,AST",
            type: 'empty',
            answer: []
          }
        }
        else if (this.state.time == null && this.state.estimatetime == "more than 24 hours or unknown") {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: "Start standard or high doses of NAC and measure ALT,AST,PT,INR",
            type: 'empty',
            answer: []
          }
        }
      }
      else if (this.state.count == "Does patient live in United Kingdom ?" && this.state.rumack_nomogram == true) {
        this.state.previousAnswer = answer
        this.state.count = "What is acetaminophen level(mcg/mL)?"
        return {
          question: "What is acetaminophen level(mcg/mL)?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "What is acetaminophen level(mcg/mL)?" && this.state.rumack_nomogram == true && this.state.previousAnswer == "no") {
        let line200: any
        let uk: any
        let line98: any
        let line150: any
        let line140: any
        let line300: any
        let line450: any
        let line600: any
        //console.log(this.state.time)
        if (this.state.time >= 4 && this.state.time <= 24) {
          line200 = Math.round(Math.exp(5.298317 - ((this.state.time - 4) * 0.1732868)))
          uk = Math.round(line200 - (0.5 * line200))
          line98 = Math.round(line200 - (0.51 * line200))
          line150 = Math.round(line200 - (0.25 * line200))
          line140 = Math.round(line200 - (0.3 * line200))
          line300 = Math.round(line200 + (0.5 * line200))
          line450 = Math.round(line200 + (1.25 * line200))
          line600 = Math.round(line200 + (2 * line200))
          //console.log(line200, uk, line98, line150, line140, line300, line450, line600)
        }
        if (answer < line140) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after ` + this.state.time + ` hours is around ` + line150 + ` ,so there is low risk of significant toxicity. Antidote adminitration is not neccessary`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer <= line150 && answer >= line140) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after ` + this.state.time + ` hours is around ` +
              line150 + `, patient’s acetaminophen (` + line140 + `) is so close to the threshold, rechecking of the level is strongly recommended`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer >= line150 && answer <= line200) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after ` + this.state.time + ` hours is around ` + line150 + `, so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg over 16 hours.`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer > line200 && answer <= line300) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The toxic threshold after ` + this.state.time + `hours is around ` + line200 + `, so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg) over 16 hours.`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer > line300 && answer <= line450) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The measured APAP level is ` + this.state.time + `   the acetamiinophenlevels of higher than ` + line300 + `indicates possibility of a massive intoxication, Consider increased doses of NAC .\
            NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 12.5 mg/kg rate (200 mg/kg over 16 hours.`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer > line450 && answer <= line600) {
          //console.log(line450)
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The measured Acetaminophen level ` + this.state.time + `, the levels of higher than ` + line450 + `, indicates a massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 18.75 mg/kg rate (200 mg/kg) over 16 hours also fomepizole can be started as a loading dose of 15 mg/kg IV, followed by 10 mg/kg IV every 12 hours for four doses (48-hour period). If indicated beyond this period, dosing is increased to 15 mg/kg every 12 hours to compensate for CYP autoinduction.`,
            type: 'empty',
            answer: []
          }
        }
        else {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The measured Acetaminophen level ` + answer + `, the levels of higher than ` + line600 + `, indicates  a  massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously.Intravenous dosing typically involves a 150 mg / kl bolus over 60 min followed by 12.5 mg / kg / h for 4 hours(50 mg/ kg over 4 hours) then 25 mg / kg rate(200 mg / kg) over 16 hours, in addition, consider Intermittent hemodialysis and fomepizole administration can be started as a loading dose of 15 mg / kg IV, followed by 10 mg / kg IV every 12 hours for four doses(48 - hour period).If indicated beyond this period, dosing is increased to 15 mg / kg every 12 hours to compensate for CYP autoinduction."`,
            type: 'empty',
            answer: []
          }
        }
      }
      else if (this.state.count == "What is acetaminophen level(mcg/mL)?" && this.state.rumack_nomogram == true && this.state.previousAnswer == "yes") {
        let line200: any
        let uk: any
        let line98: any
        let line150: any
        let line140: any
        let line300: any
        let line450: any
        let line600: any
        //console.log(this.state.time)
        if (this.state.time >= 4 && this.state.time <= 24) {
          line200 = Math.round(Math.exp(5.298317 - ((this.state.time - 4) * 0.1732868)))
          uk = Math.round(line200 - (0.5 * line200))
          line98 = Math.round(line200 - (0.51 * line200))
          line150 = Math.round(line200 - (0.25 * line200))
          line140 = Math.round(line200 - (0.3 * line200))
          line300 = Math.round(line200 + (0.5 * line200))
          line450 = Math.round(line200 + (1.25 * line200))
          line600 = Math.round(line200 + (2 * line200))
          //console.log(line200, uk, line98, line150, line140, line300, line450, line600)
        }
        if (answer < line98) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after ` + this.state.time + ` hours is around ` + uk + `, so there is low risk of significant toxicity. Antidote adminitration is not neccessary`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer > line98 && answer < uk) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after ` + this.state.time + ` hours is around ` +
              line150 + `, patient's acetaminophen (` + answer + `) is so close to the threshold, rechecking of the level is strongly recommended`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer >= uk && answer <= line200) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after ` + this.state.time + ` hours is around ` + uk + `, so,the paracetamol level indicates possible toxicity , antidote administration is recomended`,

            type: 'empty',
            answer: []
          }
        }
        else if (answer > line200 && answer <= line300) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The toxic threshold after ` + this.state.time + ` hours is around ` + line200 + `, so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg) over 16 hours.`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer > line300 && answer <= line450) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The measured acetaminophen level is ` + this.state.time + ` the acetamiinophenlevels of higher than ` + line300 + ` indicates possibility of a massive intoxication, Consider increased doses of NAC .\
            NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 12.5 mg/kg rate (200 mg/kg over 16 hours.`,
            type: 'empty',
            answer: []
          }
        }
        else if (answer > line450 && answer <= line600) {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The measured Acetaminophen level ` + this.state.time + `, the levels of higher than ` + line450 + `,  indicates a massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 18.75 mg/kg rate (200 mg/kg) over 16 hours also fomepizole can be started as a loading dose of 15 mg/kg IV, followed by 10 mg/kg IV every 12 hours for four doses (48-hour period). If indicated beyond this period, dosing is increased to 15 mg/kg every 12 hours to compensate for CYP autoinduction.`,
            type: 'empty',
            answer: []
          }
        }
        else {
          this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.state.chronicuser = true
          this.state.durationofexposure = false
          this.state.signOfHepaticfailure = false
          return {
            question: `The measured Acetaminophen level ` + answer + `, the levels of higher than ` + line600 + `, indicates  a  massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously.Intravenous dosing typically involves a 150 mg / kl bolus over 60 min followed by 12.5 mg / kg / h for 4 hours(50 mg/ kg over 4 hours) then 25 mg / kg rate(200 mg / kg) over 16 hours, in addition, consider Intermittent hemodialysis and fomepizole administration can be started as a loading dose of 15 mg / kg IV, followed by 10 mg / kg IV every 12 hours for four doses(48 - hour period).If indicated beyond this period, dosing is increased to 15 mg / kg every 12 hours to compensate for CYP autoinduction."`,
            type: 'empty',
            answer: []
          }
        }
      }
      else if (this.state.count == "How many hours was the duration of acetaminophen ingestion ?" && answer == "8-24 hours") {
        this.state.count = "The exact dose of ingestion is known ?"
        this.state.durationIngestedDose = "8-24 hours"
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "The exact dose of ingestion is known ?" && answer == "yes" && this.state.durationIngestedDose == "8-24 hours") {
        this.state.count = "how many milligrams of acetaminophen is ingested?"
        return {
          question: "how many milligrams of acetaminophen is ingested?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "how many milligrams of acetaminophen is ingested?" && this.state.durationIngestedDose == "8-24 hours") {
        this.state.ingested_dose = answer
        this.state.count = "How many kilograms is the patient ?"
        return {
          question: "How many kilograms is the patient ?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "How many kilograms is the patient ?" && this.state.durationIngestedDose == "8-24 hours") {
        this.state.weight = answer
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        if (this.state.ingested_dose < 10000 || this.state.ingested_dose / this.state.weight < 200) {
          return {
            question: "No further treatment is required and no NAC is needed.",
            type: 'empty',
            answer: []
          }
        }
        else {
          return {
            question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
            type: 'empty',
            answer: []
          }
        }
      }
      else if (this.state.count == "The exact dose of ingestion is known ?" && answer == "no" && this.state.durationIngestedDose == "8-24 hours") {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false

        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "How many hours was the duration of acetaminophen ingestion ?" && answer == "24-48 hours") {
        this.state.count = "The exact dose of ingestion is known ?"
        this.state.durationIngestedDose = "24-48 hours"
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "The exact dose of ingestion is known ?" && answer == "yes" && this.state.durationIngestedDose == "24-48 hours") {
        this.state.count = "how many milligrams of acetaminophen is ingested?"
        return {
          question: "how many milligrams of acetaminophen is ingested?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "how many milligrams of acetaminophen is ingested?" && this.state.durationIngestedDose == "24-48 hours") {
        this.state.ingested_dose = answer
        this.state.count = "How many kilograms is the patient ?"
        return {
          question: "How many kilograms is the patient ?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "How many kilograms is the patient ?" && this.state.durationIngestedDose == "24-48 hours") {
        this.state.weight = answer
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        if (this.state.ingested_dose < 12000 || this.state.ingested_dose / this.state.weight < 300) {
          return {
            question: "No further treatment is required and no NAC is needed.",
            type: 'empty',
            answer: []
          }
        }
        else {
          return {
            question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
            type: 'empty',
            answer: []
          }
        }
      }
      else if (this.state.count == "The exact dose of ingestion is known ?" && answer == "no" && this.state.durationIngestedDose == "24-48 hours") {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false

        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "How many hours was the duration of acetaminophen ingestion ?" && answer == "more than 48 hours") {
        this.state.count = "The exact dose of ingestion is known ?"
        this.state.durationIngestedDose = "more than 48 hours"
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "The exact dose of ingestion is known ?" && answer == "yes" && this.state.durationIngestedDose == "more than 48 hours") {
        this.state.count = "how many milligrams of acetaminophen is ingested?"
        return {
          question: "how many milligrams of acetaminophen is ingested?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "how many milligrams of acetaminophen is ingested?" && this.state.durationIngestedDose == "more than 48 hours") {
        this.state.ingested_dose = answer
        this.state.count = "How many kilograms is the patient ?"
        return {
          question: "How many kilograms is the patient ?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "How many kilograms is the patient ?" && this.state.durationIngestedDose == "more than 48 hours") {
        this.state.weight = answer
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        if (this.state.ingested_dose <= 4000) {
          return {
            question: "No further treatment is required and no NAC is needed.",
            type: 'empty',
            answer: []
          }
        }
        else {
          this.state.count = "Does the patient have any of these signs: nausea/vomiting/abdominal pain?"
          return {
            question: "Does the patient have any of these signs: nausea/vomiting/abdominal pain?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
      }
      else if (this.state.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "yes") {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "no") {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "No further treatment is required and no NAC is needed.",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "The exact dose of ingestion is known ?" && answer == "no" && this.state.durationIngestedDose == "more than 48 hours") {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "To be continued",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "Is the duration of acetaminophen ingestion is known ?" && answer == 'no') {
        this.state.count = "What is acetaminophen level(mcg/mL)?"
        return {
          question: "What is acetaminophen level(mcg/mL)?",
          type: 'input',
          answer: []
        }

      }
      else if (this.state.count == "What is acetaminophen level(mcg/mL)?" && answer > 0) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "Start standard doses of NAC",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "What is acetaminophen level(mcg/mL)?" && answer <= 0) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "What is patient's PT ?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "What is patient's PT ?" && answer > 14) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "Start standard doses of NAC",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "What is patient's PT ?" && answer <= 14) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "What is patient's INR ?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "What is patient's INR ?" && answer > 2) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "Start standard doses of NAC",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "What is patient's INR ?" && answer <= 2) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "What is patient's AST ?",
          type: 'input',
          answer: []
        }

      }
      else if (this.state.count == "What is patient's AST ?" && answer > 80) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "Start standard doses of NAC",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "What is patient's AST ?" && answer <= 80) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.chronicuser = true
        this.state.durationofexposure = false
        this.state.signOfHepaticfailure = false
        return {
          question: "No further treatment is required and no NAC is needed.",
          type: 'empty',
          answer: []
        }
      }
    }
    else if (this.state.chronicuser == true && this.state.durationofexposure == false && this.state.signOfHepaticfailure == false) {
      if (this.state.count == "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?" && this.state.checkTemp == false) {
        this.state.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.state.checkTemp = true
        console.log('hello')
        return {
          question: "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      if (this.state.count == "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?" && answer == "yes") {
        this.state.count = "Is the exact daily dose known?"
        return {
          question: "Is the exact daily dose known?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "Is the exact daily dose known?" && answer == "yes") {
        this.state.count = "how many miligrams of acetaminophen is ingested daily?"
        return {
          question: "how many miligrams of acetaminophen is ingested daily?",
          type: 'input',
          answer: []
        }
      }
      else if (this.state.count == "how many miligrams of acetaminophen is ingested daily?") {
        this.state.count = "how many miligrams of acetaminophen is ingested daily?"
        if (answer <= 4000) {
          this.state.count = "Is there any signs of hepatic failure?"
          this.state.chronicuser = false
          this.state.signOfHepaticfailure = true
          this.state.durationofexposure = false
          return {
            question: "No further treatment is required and no NAC is needed.",
            type: 'empty',
            answer: []
          }
        }
        else {
          this.state.count = "Does the patient have any of these signs: nausea/vomiting/abdominal pain?"
          return {
            question: "Does the patient have any of these signs: nausea/vomiting/abdominal pain?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
      }
      else if (this.state.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "no") {
        this.state.count = "Is there any signs of hepatic failure?"
        this.state.chronicuser = false
        this.state.signOfHepaticfailure = true
        this.state.durationofexposure = false
        return {
          question: "No further treatment is required and no NAC is needed.",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "yes") {
        this.state.count = "Is there any signs of hepatic failure?"
        this.state.chronicuser = false
        this.state.signOfHepaticfailure = true
        this.state.durationofexposure = false
        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "Is the exact daily dose known?" && answer == "no") {
        this.state.count = "Is there any signs of hepatic failure?"
        this.state.chronicuser = false
        this.state.signOfHepaticfailure = true
        this.state.durationofexposure = false
        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
          answer: []
        }
      }
      else if (this.state.count == "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?" && answer == "no") {
        //console.log(this.state.count)
        this.state.count = "Is there any signs of hepatic failure?"
        this.state.chronicuser = false
        this.state.signOfHepaticfailure = true
        this.state.durationofexposure = false
        console.log('helloabcd')
        return {
          question: "Is there any signs of hepatic failure?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }

      }
    }
    else if (this.state.chronicuser == false && this.state.durationofexposure == false && this.state.signOfHepaticfailure == true) {
      //console.log("hello from outside 2")
      //console.log(this.state.checkTemp, this.state.complexCount)
      if (this.state.alertCheck >= 1) {
        return {
          question: "done",
          answer: [],
          type: ""
        }
      }

      if (this.state.count == "Is there any signs of hepatic failure?" && this.state.checkTemp == true) {
        this.state.count = "Is there any signs of hepatic failure?"
        this.state.checkTemp = false
        return {
          question: "Is there any signs of hepatic failure?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      if (this.state.alertCheck >= 8) {
        return {
          question: "done",
          answer: [],
          type: ""
        }
      }

      if (this.state.count == "Is there any signs of hepatic failure?" && answer == "yes") {
        this.state.count = "PT is measured?"
        return {
          question: "PT is measured?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "PT is measured?") {
        this.state.measuredPT = answer
        this.state.count = "INR is measured?"
        return {
          question: "INR is measured?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.state.count == "INR is measured?") {
        if (this.state.measuredInr == null) {
          this.state.measuredInr = answer
          this.state.count = "Arterial pH is measured?"
          return {
            question: "Arterial pH is measured?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.state.complexCount = this.state.complexCount + 1

          this.state.count = "Creatinine level is measured ?"
          if (this.state.measuredInr == "yes") {
            this.state.count = "What is INR ?"
            return {
              question: "What is INR ?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "Measuring INR is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
      }
      else if (this.state.count == "Arterial pH is measured?") {
        if (this.state.arterialPh == null) {
          this.state.arterialPh = answer
          this.state.count = "Creatinine level is measured ?"
          return {
            question: "Creatinine level is measured ?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.state.complexCount = this.state.complexCount + 1

          this.state.count = "INR is measured?"
          if (this.state.arterialPh == "yes") {
            this.state.count = "What is Arterial pH ?"
            return {
              question: "What is Arterial pH ?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "arterial pH measurement is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
      }
      else if (this.state.count == "Creatinine level is measured ?") {
        if (this.state.measuredCreatinin == null) {
          this.state.measuredCreatinin = answer
          this.state.count = "Encephalopathy Grade is evaluated?"
          return {
            question: "Encephalopathy Grade is evaluated?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.state.complexCount = this.state.complexCount + 1

          this.state.count = "Encephalopathy Grade is evaluated?"
          if (this.state.measuredCreatinin == "yes") {
            this.state.count = "What is creatinine value(mg/dL)?"
            return {
              question: "What is creatinine value(mg/dL)?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "Creatinine measurement is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
      }
      else if (this.state.count == "Encephalopathy Grade is evaluated?") {
        if (this.state.calculatedEncephalopathyGrade == null) {
          this.state.calculatedEncephalopathyGrade = answer
          this.state.count = "4h Lactate level is evaluated?"
          return {
            question: "4h Lactate level is evaluated?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.state.complexCount = this.state.complexCount + 1

          this.state.count = "4h Lactate level is evaluated?"
          if (this.state.calculatedEncephalopathyGrade == "yes") {
            this.state.count = "What is the grade of encephalopathy?"
            return {
              question: "What is the grade of encephalopathy?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "Evaluation of encephalopathy grade is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
      }
      else if (this.state.count == "4h Lactate level is evaluated?") {
        if (this.state.measuredLactat4 == null) {
          this.state.measuredLactat4 = answer
          this.state.count = "12h Lactate level is evaluated?"
          return {
            question: "12h Lactate level is evaluated?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.state.complexCount = this.state.complexCount + 1

          this.state.count = "12h Lactate level is evaluated?"
          if (this.state.measuredLactat4 == "yes") {
            this.state.count = "What is 4h lactate level (mmol/L) after fluid  resuscitation ?"
            return {
              question: "What is 4h lactate level (mmol/L) after fluid  resuscitation ?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "Evaluation of encephalopathy grade is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
      }
      else if (this.state.count == "12h Lactate level is evaluated?") {
        if (this.state.measuredLactat12 == null) {
          this.state.measuredLactat12 = answer
          this.state.count = "48-96h Phosphate level (mmol/L) is evaluated?"
          return {
            question: "48-96h Phosphate level (mmol/L) is evaluated?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.state.count = "48-96h Phosphate level (mmol/L) is evaluated?"
          this.state.complexCount = this.state.complexCount + 1

          if (this.state.measuredLactat12 == "yes") {
            this.state.count = "What is 12h lactate level (mmol/L) after fluid  resuscitation ?"
            return {
              question: "What is 12h lactate level (mmol/L) after fluid  resuscitation ?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "Evaluation of encephalopathy grade is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
      }
      else if (this.state.count == "48-96h Phosphate level (mmol/L) is evaluated?") {
        if (answer == 123456) {
          this.state.complexCount = this.state.complexCount + 1
          if (this.state.measuredPhosphate48to96 == "yes") {
            this.state.count = "What is 48-96h Phosphate level (mmol/L) after fluid  resuscitation ?"
            return {
              question: "What is 48-96h Phosphate level (mmol/L) after fluid  resuscitation ?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "Phosphate level measurement at 48-96 hrs. is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
        if (this.state.ransomLastCheck == false) {
          this.state.measuredPhosphate48to96 = answer
          this.state.count = "Arterial pH is measured?"
          this.state.complexCount = this.state.complexCount + 1
          this.state.ransomLastCheck = true
          if (this.state.measuredPT == "yes") {
            this.state.count = "What is patient's PT ?"
            return {
              question: "What is patient's PT ?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "Measuring PT is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
        else {
          this.state.count = "48-96h Phosphate level (mmol/L) is evaluated?"
          this.state.complexCount = this.state.complexCount + 1

          if (this.state.measuredPhosphate48to96 == "yes") {
            return {
              question: "What is 48-96h Phosphate level (mmol/L) after fluid  resuscitation ?",
              type: 'input',
              answer: []
            }
          }
          else {
            return {
              question: "Phosphate level measurement at 48-96 hrs. is recommended",
              type: 'empty',
              answer: []
            }
          }
        }
      }
      else if (this.state.count == "What is patient's PT ?") {
        this.state.count = "Arterial pH is measured?"
        this.state.patientsptvalue = answer
        if (answer > 100) {
          this.state.measuredPT == "no"
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
        }
        else {
          alert("At this time, patient does not meet transplant or referral criteria.  Reevaluation of King's College Criteria for Acetaminophen Toxicity is recommended")
          this.state.measuredPT == "no"
        }
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.state.count == "What is Arterial pH ?") {
        this.state.count = "INR is measured?"
        //console.log("1227")
        this.state.patientsarterialvalue = answer
        if (answer < 7.3) {
          this.state.arterialPh == "no"
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
        }
        else {
          alert("At this time, patient does not meet transplant or referral criteria.  Reevaluation of King's College Criteria for Acetaminophen Toxicity is recommended")
          this.state.arterialPh == "no"
        }
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.state.count == "What is INR ?") {
        this.state.count = "Creatinine level is measured ?"
        this.state.patientsinrvalue = answer
        if (answer > 6.5) {
          this.state.measuredInr == "no"
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
        }
        else {
          alert("At this time, patient does not meet transplant or referral criteria.  Reevaluation of King's College Criteria for Acetaminophen Toxicity is recommended")
          this.state.measuredInr == "no"
        }
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.state.count == "What is creatinine value(mg/dL)?") {
        this.state.count = "Encephalopathy Grade is evaluated?"
        this.state.patientscreatinevalue = answer
        if (answer > 3.3) {
          this.state.measuredCreatinin == "no"
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
        }
        else {
          alert("At this time, patient does not meet transplant or referral criteria.  Re evaluation of king colledge criteria is recommended")
          this.state.measuredCreatinin == "no"
        }
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.state.count == "What is the grade of encephalopathy?") {
        this.state.count = "4h Lactate level is evaluated?"
        this.state.patientsencephalopathyvalue = answer
        if (answer > 2) {
          this.state.calculatedEncephalopathyGrade == "no"
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
        }
        else {
          alert("At this time, patient does not meet transplant or referral criteria.  Reevaluation of King's College Criteria for Acetaminophen Toxicity is recommended ")
          this.state.calculatedEncephalopathyGrade == "no"
        }
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.state.count == "What is 4h lactate level (mmol/L) after fluid  resuscitation ?") {
        this.state.count = "12h Lactate level is evaluated?"
        this.state.patientslactatelevelvalue = answer
        if (answer > 3.5) {
          this.state.measuredLactat4 == "no"
          alert("Although hyperlactatemia is not part of King's criteria, they predict poor prognosis for survival without transplantation.")
        }
        else {
          alert("Evaluation of other criteria of king college is recommended.")
          this.state.measuredLactat4 == "no"
        }
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.state.count == "What is 12h lactate level (mmol/L) after fluid  resuscitation ?") {
        this.state.count = "48-96h Phosphate level (mmol/L) is evaluated?"
        this.state.patientslactatelevelvalue12 = answer
        if (answer > 3) {
          this.state.measuredLactat12 == "no"
          alert("Although hyperlactatemia is not part of King's criteria, they predict poor prognosis for survival without transplantation.")
        }
        else {
          alert("Evaluation of other criteria of king college is recommended.")
          this.state.measuredLactat12 == "no"
        }
        let abc: any = this.getQuestion(123456)
        return abc
      }
      else if (this.state.count == "What is 48-96h Phosphate level (mmol/L) after fluid  resuscitation ?") {
        //console.log(answer, "asdasda")
        // this.state.count = "12h Lactate level is evaluated?"
        this.state.patientshosphatevalue = answer
        if (answer > 3.75) {
          this.state.measuredPhosphate48to96 == "no"
          alert("Although hyperlactatemia is not part of King's criteria, they predict poor prognosis for survival without transplantation.")
        }
        else {
          alert("Evaluation of other criteria of king college is recommended.")
          this.state.measuredPhosphate48to96 == "no"
        }
        this.state.complexCount = 9
        return {
          question: "done",
          type: "",
          answer: []
        }
      }

      else if (this.state.count == "Is there any signs of hepatic failure?" && answer == "no") {
        //console.log(this.state.count)
        this.state.count = "Is there any signs of hepatic failure?"
        this.state.chronicuser = false
        this.state.signOfHepaticfailure = false
        this.state.durationofexposure = false
        return {
          question: "At this time , patient does not meet transplant or referral criteria.  Reevaluation of King's College Criteria for Acetaminophen Toxicity is recommended ",
          type: 'empty',
          answer: []
        }

      }
    }
    return {
      question: "done",
      type: "",
      answer: []
    }
  }
}
