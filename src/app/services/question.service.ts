import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  count: any = null
  currentOption: any
  time: any
  estimatetime: any

  rumack_nomogram = false

  Timeofing = false
  previousAnswer: any

  ingested_dose: any
  weight: any
  age: any;
  constructor() { }

  getQuestion(answer: any) {
    console.log(this.count, answer)
    if (this.count == null && answer == 0) {
      return {
        question: "Is the duration of acetaminophen ingestion is known ?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.count == null && answer == 'yes') {
      this.count = "How many hours was the duration of acetaminophen ingestion ?"
      return {
        question: "How many hours was the duration of acetaminophen ingestion ?",
        type: 'checkbox',
        answer: ['acute single ingestion', 'less than 8 hours', '8-24 hours', 'more than 48 hours']
      }

    }
    else if (this.count == "How many hours was the duration of acetaminophen ingestion ?" && (answer == 'acute single ingestion' || answer == 'less than 8 hours')) {
      this.Timeofing = true
      return {
        question: "Does patient has  any of these criteria: 1. Regular ethanol consumption in excess of 21 units/week in males, 14 units/week in females 2. Regular use of enzyme-inducing drugs (carbamazepine phenytoin, phenobarbitone rifampacin) 3. Conditions causing glutathione depletion (malnutrition, HIV, eating disorders, cystic fibrosis)?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.Timeofing == true) {
      this.Timeofing = false
      this.count = "Is the time of ingestion known ?"
      return {
        question: "Is the time of ingestion known ?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.count = "Is the time of ingestion known ?" && this.Timeofing == false && answer == 'yes') {
      this.count = "How many hours was the duration of acetaminophen ingestion ?"
      return {
        question: "How many hours was the duration of acetaminophen ingestion ?",
        type: 'input',
      }
    }
    else if (this.count = "Is the time of ingestion known ?" && this.Timeofing == false && answer == 'no') {
      this.count = "Is the earliest possible time of ingestion less than 24 hours?"
      return {
        question: "Is the earliest possible time of ingestion less than 24 hours?",
        type: 'checkbox',
        answer: ['yes', 'less than 24h/more than 24 hours or unknown']
      }
    }
    else if (this.count = "How many hours was the duration of acetaminophen ingestion ?") {
      this.time = answer
      this.count = "The exact dose of ingestion is known ?"
      return {
        question: "The exact dose of ingestion is known ?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.count = "Is the earliest possible time of ingestion less than 24 hours?") {
      this.estimatetime = answer
      this.count = "The exact dose of ingestion is known ?"
      return {
        question: "The exact dose of ingestion is known ?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.count = "The exact dose of ingestion is known ?" && answer == "yes") {
      this.count = "how many milligrams of acetaminophen is ingested?"
      return {
        question: "how many milligrams of acetaminophen is ingested?",
        type: 'input',
      }
    }
    else if (this.count = "how many milligrams of acetaminophen is ingested?") {
      this.previousAnswer = answer
      this.count = "How many kilograms is the patient ?"
      return {
        question: "How many kilograms is the patient ?",
        type: 'input',
      }
    }
    else if (this.count = "How many kilograms is the patient ?") {
      this.weight = answer
      this.count = "How old is the patient ?"
      return {
        question: "How old is the patient ?",
        type: 'input',
      }
    }
    else if (this.count = "How old is the patient ?") {
      this.age = answer
      this.count = "How old is the patient ?"
      if (this.age >= 12 && (this.previousAnswer / this.weight < 142 || this.previousAnswer < 10000)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age >= 12 && (this.previousAnswer / this.weight < 250 && this.previousAnswer / this.weight < 142.86)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age >= 12 && (this.previousAnswer / this.weight < 350 && this.previousAnswer / this.weight < 250)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age >= 12 && (this.previousAnswer / this.weight < 500 && this.previousAnswer / this.weight < 350)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age >= 12 && this.previousAnswer / this.weight >= 500) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age < 12 && (this.previousAnswer / this.weight < 500)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age < 12 && (this.previousAnswer / this.weight < 250 && this.previousAnswer / this.weight < 150)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age < 12 && (this.previousAnswer / this.weight < 350 && this.previousAnswer / this.weight < 250)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age < 12 && (this.previousAnswer / this.weight < 500 && this.previousAnswer / this.weight < 350)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
      else if (this.age < 12 && (this.previousAnswer / this.weight < 500)) {
        if (this.time != null && this.time >= 4 && this.time <= 24) {
          //todo
        }
        else if (this.time == null && this.time == "yes, less than 24h") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST",
            type: 'input',
          }
        }
        else if (this.time == null && this.time == "more than 24 hours or unknown") {
          return {
            question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
            type: 'input',
          }
        }
      }
    }
    else if (this.count = "The exact dose of ingestion is known ?" && answer == "yes") {
      this.count = "The exact dose of ingestion is known ?"
      return {
        question: "The exact dose of ingestion is known ?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.count = "The exact dose of ingestion is known ?" && answer == "no") {
      this.count = "The exact dose of ingestion is known ?"
      return {
        question: "The exact dose of ingestion is known ?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.count = "The exact dose of ingestion is known ?" && answer == "no") {
      this.estimatetime = answer
      this.count = "Does patient live in United Kingdom ?"
      if (this.time != null && (this.time >= 4 && this.time <= 24)) {
        this.rumack_nomogram = true
        return {
          question: "Does patient live in United Kingdom ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.time != null && this.estimatetime == "yes, less than 24h") {
        return {
          question: "Start standard or high doses of NAC and measure ALT,AST",
          type: 'empty',
        }
      }
      else if (this.time != null && this.estimatetime == "more than 24 hours or unknown") {
        return {
          question: "Start standard or high doses of NAC and measure ALT,AST,PT,INR",
          type: 'empty',
        }
      }
    }
    else if (this.count = "Does patient live in United Kingdom ?" && this.rumack_nomogram == true) {
      this.previousAnswer = answer
      this.count = "What is acetaminophen level(mcg/mL)?"
      return {
        question: "What is acetaminophen level(mcg/mL)?",
        type: 'input',
      }
    }
    else if (this.count = "What is acetaminophen level(mcg/mL)?" && this.rumack_nomogram == true && this.previousAnswer == "no") {
      let line200: any
      let uk: any
      let line98: any
      let line150: any
      let line140: any
      let line300: any
      let line450: any
      let line600: any
      if (this.time <= 4 && this.time >= 24) {
        line200 = Math.round(Math.exp(5.298317 - ((this.time - 4) * 0.1732868)))
        uk = Math.round(line200 - (0.5 * line200))
        line98 = Math.round(line200 - (0.51 * line200))
        line150 = Math.round(line200 - (0.25 * line200))
        line140 = Math.round(line200 - (0.3 * line200))
        line300 = Math.round(line200 + (0.5 * line200))
        line450 = Math.round(line200 + (1.25 * line200))
        line600 = Math.round(line200 + (2 * line200))
      }
      if (answer < line140) {
        return {
          question: `The treatment threshold after` + this.time.toString() + `hours is around` + line150.toString() + `,so there is low risk of significant toxicity. Antidote adminitration is not neccessary`,
          type: 'empty',
        }
      }
      else if (answer <= line150 && answer >= line140) {
        return {
          question: `The treatment threshold after` + this.time.toString() + `hours is around` +
            line150.toString() + `, patient’s acetaminophen(` + line140.toString() + `) is so close to the threshold, rechecking of the level is strongly recommended`,
          type: 'empty',
        }
      }
      else if (answer >= line150 && answer <= line200) {
        return {
          question: `The treatment threshold after` + this.time.toString() + `hours is around` + line150.toString() + `,so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg over 16 hours.`,

          type: 'empty',
        }
      }
      else if (answer > line200 && answer <= line300) {
        return {
          question: `The toxic threshold after` + this.time.toString() + `hours is around` + line200.toString() + `,so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg) over 16 hours.`,
          type: 'empty',
        }
      }
      else if (answer > line300 && answer <= line450) {
        return {
          question: `The measured APAP level is ` + this.time.toString() + `   the acetamiinophenlevels of higher than ` + line300.toString() + `indicates possibility of a massive intoxication, Consider increased doses of NAC .\
          NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 12.5 mg/kg rate (200 mg/kg over 16 hours.`,
          type: 'empty',
        }
      }
      else if (answer > line450 && answer <= line600) {
        return {
          question: `The measured Acetaminophen level` + this.time.toString() + `, the levels of higher than ` + line450.toString() + `,  indicates a massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 18.75 mg/kg rate (200 mg/kg) over 16 hours also fomepizole can be started as a loading dose of 15 mg/kg IV, followed by 10 mg/kg IV every 12 hours for four doses (48-hour period). If indicated beyond this period, dosing is increased to 15 mg/kg every 12 hours to compensate for CYP autoinduction.`,
          type: 'empty',
        }
      }
      else {
        return {
          question: `The measured Acetaminophen level ` + answer.toString() + `, the levels of higher than ` + line600.toString() + `, indicates  a  massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously.Intravenous dosing typically involves a 150 mg / kl bolus over 60 min followed by 12.5 mg / kg / h for 4 hours(50 mg/ kg over 4 hours) then 25 mg / kg rate(200 mg / kg) over 16 hours, in addition, consider Intermittent hemodialysis and fomepizole administration can be started as a loading dose of 15 mg / kg IV, followed by 10 mg / kg IV every 12 hours for four doses(48 - hour period).If indicated beyond this period, dosing is increased to 15 mg / kg every 12 hours to compensate for CYP autoinduction."`,
          type: 'empty',
        }
      }
    }
    else if (this.count = "What is acetaminophen level(mcg/mL)?" && this.rumack_nomogram == true && this.previousAnswer == "yes") {
      let line200: any
      let uk: any
      let line98: any
      let line150: any
      let line140: any
      let line300: any
      let line450: any
      let line600: any
      if (this.time <= 4 && this.time >= 24) {
        line200 = Math.round(Math.exp(5.298317 - ((this.time - 4) * 0.1732868)))
        uk = Math.round(line200 - (0.5 * line200))
        line98 = Math.round(line200 - (0.51 * line200))
        line150 = Math.round(line200 - (0.25 * line200))
        line140 = Math.round(line200 - (0.3 * line200))
        line300 = Math.round(line200 + (0.5 * line200))
        line450 = Math.round(line200 + (1.25 * line200))
        line600 = Math.round(line200 + (2 * line200))
      }
      if (answer < line98) {
        return {
          question: `The treatment threshold after` + this.time.toString() + `hours is around` + uk.toString() + `,so there is low risk of significant toxicity. Antidote adminitration is not neccessary`,
          type: 'empty',
        }
      }
      else if (answer > line98 && answer < uk) {
        return {
          question: `The treatment threshold after` + this.time.toString() + `hours is around` +
            line150.toString() + `, patient’s acetaminophen(` + answer.toString() + `) is so close to the threshold, rechecking of the level is strongly recommended`,
          type: 'empty',
        }
      }
      else if (answer >= uk && answer <= line200) {
        return {
          question: `The treatment threshold after` + this.time.toString() + `hours is around` + uk.toString() + `,so,the paracetamol level indicates possible toxicity , antidote administration is recomended`,

          type: 'empty',
        }
      }
      else if (answer > line200 && answer <= line300) {
        return {
          question: `The toxic threshold after` + this.time.toString() + `hours is around` + line200.toString() + `,so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg) over 16 hours.`,
          type: 'empty',
        }
      }
      else if (answer > line300 && answer <= line450) {
        return {
          question: `The measured acetaminophen level is` + this.time.toString() + `   the acetamiinophenlevels of higher than ` + line300.toString() + `indicates possibility of a massive intoxication, Consider increased doses of NAC .\
          NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 12.5 mg/kg rate (200 mg/kg over 16 hours.`,
          type: 'empty',
        }
      }
      else if (answer > line450 && answer <= line600) {
        return {
          question: `The measured Acetaminophen level` + this.time.toString() + `, the levels of higher than ` + line450.toString() + `,  indicates a massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 18.75 mg/kg rate (200 mg/kg) over 16 hours also fomepizole can be started as a loading dose of 15 mg/kg IV, followed by 10 mg/kg IV every 12 hours for four doses (48-hour period). If indicated beyond this period, dosing is increased to 15 mg/kg every 12 hours to compensate for CYP autoinduction.`,
          type: 'empty',
        }
      }
      else {
        return {
          question: `The measured Acetaminophen level ` + answer.toString() + `, the levels of higher than ` + line600.toString() + `, indicates  a  massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously.Intravenous dosing typically involves a 150 mg / kl bolus over 60 min followed by 12.5 mg / kg / h for 4 hours(50 mg/ kg over 4 hours) then 25 mg / kg rate(200 mg / kg) over 16 hours, in addition, consider Intermittent hemodialysis and fomepizole administration can be started as a loading dose of 15 mg / kg IV, followed by 10 mg / kg IV every 12 hours for four doses(48 - hour period).If indicated beyond this period, dosing is increased to 15 mg / kg every 12 hours to compensate for CYP autoinduction."`,
          type: 'empty',
        }
      }
    }
    else if (this.count == "How many hours was the duration of acetaminophen ingestion ?" && answer == "24-48 hours") {
      this.count = "The exact dose of ingestion is known ?"
      return {
        question: "The exact dose of ingestion is known ?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.count == "The exact dose of ingestion is known ?" && answer == "yes") {
      this.count = "how many milligrams of acetaminophen is ingested?"
      return {
        question: "how many milligrams of acetaminophen is ingested?",
        type: 'input',
      }
    }
    else if (this.count == "how many milligrams of acetaminophen is ingested?") {
      this.ingested_dose = answer
      this.count = "How many kilograms is the patient ?"
      return {
        question: "How many kilograms is the patient ?",
        type: 'input',
      }
    }
    else if (this.count == "How many kilograms is the patient ?") {
      this.weight = answer
      this.count = "How many kilograms is the patient ?"
      if (this.ingested_dose < 12000 || this.ingested_dose / this.weight < 300) {
        return {
          question: "No further treatment and no NAC",
          type: 'empty',
        }
      }
      else {
        return {
          question: "Start standard or high doses of NAC and measure ALT,AST,PT,INR, bicarbonat",
          type: 'empty',
        }
      }
    }
    else if (this.count == "The exact dose of ingestion is known ?" && answer == "no") {
      this.count = "The exact dose of ingestion is known ?"
      return {
        question: "Start standard or high doses of NAC and measure ALT,AST,PT,INR, bicarbonat",
        type: 'empty',
      }
    }
    else if (this.count == "How many hours was the duration of acetaminophen ingestion ?" && answer == "more than 48 hours") {
      return {
        question: "The exact dose of ingestion is known ?",
        type: 'checkbox',
        answer: ['yes', 'no']
      }
    }
    else if (this.count == "The exact dose of ingestion is known ?" && answer == "yes") {
      this.count = "how many milligrams of acetaminophen is ingested?"
      return {
        question: "how many milligrams of acetaminophen is ingested?",
        type: 'input',
      }
    }
    else if (this.count == "how many milligrams of acetaminophen is ingested?") {
      this.ingested_dose = answer
      this.count = "How many kilograms is the patient ?"
      return {
        question: "How many kilograms is the patient ?",
        type: 'input',
      }
    }
    else if (this.count == "How many kilograms is the patient ?") {
      this.weight = answer
      this.count = "How many kilograms is the patient ?"
      if (this.ingested_dose <= 4000) {
        return {
          question: "No further treatment and no NAC",
          type: 'empty',
        }
      }
      else {
        this.count = "Does the patient have any of these signs: nausea/vomiting/abdominal pain?"
        return {
          question: "Does the patient have any of these signs: nausea/vomiting/abdominal pain?",
          type: 'input',
          answer: ['yes', 'no']
        }
      }
    }
    else if (this.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "yes") {
      return {
        question: "No further treatment and no NAC",
        type: 'empty',
      }
    }
    else if (this.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "no") {
      return {
        question: "Start standard or high doses of NAC and measure ALT,AST,PT,INR, bicarbonat",
        type: 'empty',
      }
    }
    else if (this.count == "The exact dose of ingestion is known ?" && answer == "no") {
      this.count = "The exact dose of ingestion is known ?"
      return {
        question: "Start standard or high doses of NAC and measure ALT,AST,PT,INR, bicarbonat",
        type: 'empty',
      }
    }
    else if (this.count == "What is acetaminophen level(mcg/mL) ?" && answer > 0) {
      this.count == 0
      return {
        question: "Start standard doses of NAC",
        type: 'empty',
      }
    }
    else if (this.count == "What is acetaminophen level(mcg/mL) ?" && answer < 0) {
      this.count = "What is patient's PT ?"
      return {
        question: "What is patient's PT ?",
        type: 'input',
      }
    }
    else if (this.count == "What is patient's PT ?" && answer > 14) {
      this.count = "00"
      return {
        question: "Start standard doses of NAC",
        type: 'empty',
      }
    }
    else if (this.count == "What is patient's PT ?" && answer < 14) {
      this.count = "What is patient's INR ?"
      return {
        question: "What is patient's INR ?",
        type: 'input',
      }
    }
    else if (this.count == "What is patient's INR ?" && answer > 2) {
      this.count = "000"
      return {
        question: "Start standard doses of NAC",
        type: 'empty',
      }
    }
    else if (this.count == "What is patient's INR ?" && answer < 2) {
      this.count = "What is patient's AST ?"
      return {
        question: "What is patient's AST ?",
        type: 'input',
      }
    }
    else if (this.count == "What is patient's AST ?" && answer > 80) {
      return {
        question: "Start standard doses of NAC",
        type: 'empty',
      }
    }
    else if (this.count == "What is patient's AST ?" && answer < 80) {
      return {
        question: "No further treatment and no NAC",
        type: 'empty',
      }
    }
    return 0
  }
}
