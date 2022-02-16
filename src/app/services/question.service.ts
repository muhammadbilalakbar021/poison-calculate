import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  count: any = null
  currentOption: any
  time: any = null
  estimatetime: any = null

  rumack_nomogram = false

  Timeofing = false
  previousAnswer: any

  ingested_dose: any
  weight: any
  age: any;
  durationIngestedDose: any
  riskbox: any;
  arterialPh: any = null
  measuredPT: any = null
  measuredInr: any = null
  measuredCreatinin: any = null
  calculatedEncephalopathyGrade: any = null
  measuredLactat4: any = null
  measuredLactat12: any = null
  measuredPhosphate48to96: any = null
  chronicuser = false
  signOfHepaticfailure = false
  durationofexposure = true
  checkTemp = false
  ransomLastCheck = false

  complexCount = 0
  patientsptvalue: any = null
  patientsarterialvalue: any;
  patientsinrvalue: any;
  patientscreatinevalue: any;
  patientsencephalopathyvalue: any;
  patientslactatelevelvalue: any;
  patientslactatelevelvalue12: any;
  patientshosphatevalue: any;

  alertCheck = 0;
  constructor() { }

  getQuestion(answer: any) {
    console.log(this.count, answer, this.chronicuser, this.durationofexposure, this.signOfHepaticfailure)
    if (this.chronicuser == false && this.durationofexposure == true && this.signOfHepaticfailure == false) {
      if (this.count == null && answer == 0) {
        this.count = "Is the duration of acetaminophen ingestion is known ?"
        return {
          question: "Is the duration of acetaminophen ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "Is the duration of acetaminophen ingestion is known ?" && answer == 'yes') {
        console.log(this.count)
        this.count = "How many hours was the duration of acetaminophen ingestion ?"
        return {
          question: "How many hours was the duration of acetaminophen ingestion ?",
          type: 'checkbox',
          answer: ['acute single ingestion', 'less than 8 hours', '8-24 hours', '24-48 hours', 'more than 48 hours']
        }

      }
      else if (this.count == "How many hours was the duration of acetaminophen ingestion ?" && (answer == 'acute single ingestion' || answer == 'less than 8 hours')) {
        this.Timeofing = true
        this.durationIngestedDose = "acute single ingestion"
        return {
          question: "Does patient has  any of these criteria: 1. Regular ethanol consumption in excess of 21 units/week in males, 14 units/week in females 2. Regular use of enzyme-inducing drugs (carbamazepine phenytoin, phenobarbitone rifampacin) 3. Conditions causing glutathione depletion (malnutrition, HIV, eating disorders, cystic fibrosis)?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.Timeofing == true) {
        this.riskbox = answer
        this.Timeofing = false
        this.count = "Is the time of ingestion known ?"
        return {
          question: "Is the time of ingestion known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "Is the time of ingestion known ?" && this.Timeofing == false && answer == 'yes' && this.durationIngestedDose == "acute single ingestion") {
        this.count = "How many hours after ingestion ?"
        return {
          question: "How many hours after ingestion ?",
          type: 'input',
        }
      }
      else if (this.count == "Is the time of ingestion known ?" && this.Timeofing == false && answer == 'no' && this.durationIngestedDose == "acute single ingestion") {
        this.count = "Is the earliest possible time of ingestion less than 24 hours?"
        return {
          question: "Is the earliest possible time of ingestion less than 24 hours?",
          type: 'checkbox',
          answer: ['yes, less than 24h', 'more than 24 hours or unknown']
        }
      }
      else if (this.count == "How many hours after ingestion ?" && this.durationIngestedDose == "acute single ingestion") {
        this.time = answer
        this.count = "The exact dose of ingestion is known ?"
        console.log(this.riskbox, this.count)
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "Is the earliest possible time of ingestion less than 24 hours?" && this.durationIngestedDose == "acute single ingestion") {
        this.estimatetime = answer
        this.count = "The exact dose of ingestion is known ?"
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }

      else if (this.count == "The exact dose of ingestion is known ?" && (this.riskbox == "no" || this.riskbox == "yes") && answer == "yes" && this.durationIngestedDose == "acute single ingestion") {
        this.count = "how many milligrams of acetaminophen is ingested?"
        return {
          question: "how many milligrams of acetaminophen is ingested?",
          type: 'input',
        }
      }
      else if (this.count == "how many milligrams of acetaminophen is ingested?" && (this.riskbox == "no" || this.riskbox == "yes") && this.durationIngestedDose == "acute single ingestion") {
        this.count = "How many kilograms is the patient ?"
        this.ingested_dose = answer
        return {
          question: "How many kilograms is the patient ?",
          type: 'input',
        }
      }
      else if (this.count == "How many kilograms is the patient ?" && (this.riskbox == "no" || this.riskbox == "yes") && this.durationIngestedDose == "acute single ingestion") {
        this.weight = answer
        this.count = "How old is the patient ?"
        return {
          question: "How old is the patient ?",
          type: 'input',
        }
      }
      else if (this.count == "How old is the patient ?" && (this.riskbox == "no" || this.riskbox == "yes") && this.durationIngestedDose == "acute single ingestion") {
        this.age = answer
        this.rumack_nomogram = true
        this.count = "Does patient live in United Kingdom ?"
        console.log("hello", this.age, this.weight, this.ingested_dose, this.ingested_dose / this.weight, this.time)
        if (this.age >= 12 && (this.ingested_dose / this.weight < 142.86 || this.ingested_dose < 10000)) {
          console.log("hello",)
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age >= 12 && (this.ingested_dose / this.weight < 250 && this.ingested_dose / this.weight >= 142.86)) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age >= 12 && (this.ingested_dose / this.weight < 350 && this.ingested_dose / this.weight >= 250)) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age >= 12 && (this.ingested_dose / this.weight < 500 && this.ingested_dose / this.weight >= 350)) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age >= 12 && this.ingested_dose / this.weight >= 500) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age < 12 && (this.ingested_dose / this.weight < 150)) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age < 12 && (this.ingested_dose / this.weight < 250 && this.ingested_dose / this.weight >= 150)) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age < 12 && (this.ingested_dose / this.weight < 350 && this.ingested_dose / this.weight >= 250)) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age < 12 && (this.ingested_dose / this.weight < 500 && this.ingested_dose / this.weight >= 350)) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
        else if (this.age < 12 && (this.ingested_dose / this.weight <= 500)) {
          if (this.time != null && this.time >= 4 && this.time <= 24) {
            this.count = "Does patient live in United Kingdom ?"
            return {
              question: "Does patient live in United Kingdom ?",
              type: 'checkbox',
              answer: ['yes', 'no']
            }
          }
          else if (this.time == null && this.estimatetime == "yes, less than 24h") {
            this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
            this.chronicuser = true
            this.durationofexposure = false
            this.signOfHepaticfailure = false
            return {
              question: "Start standard doses of NAC and measure ALT,AST",
              type: 'input',
            }
          }
          else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
            return {
              question: "Start standard doses of NAC and measure ALT,AST,PT,INR",
              type: 'input',
            }
          }
        }
      }
      else if (this.count == "The exact dose of ingestion is known ?" && (this.riskbox == "no" || this.riskbox == "yes") && answer == "no" && this.durationIngestedDose == "acute single ingestion") {
        this.count = "To be continued"
        console.log("hello", this.time, this.estimatetime)
        if (this.time != null && (this.time >= 4 && this.time <= 24)) {
          this.rumack_nomogram = true
          this.count = "Does patient live in United Kingdom ?"
          return {
            question: "Does patient live in United Kingdom ?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else if (this.time == null && this.estimatetime == "yes, less than 24h") {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: "Start standard or high doses of NAC and measure ALT,AST",
            type: 'empty',
          }
        }
        else if (this.time == null && this.estimatetime == "more than 24 hours or unknown") {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: "Start standard or high doses of NAC and measure ALT,AST,PT,INR",
            type: 'empty',
          }
        }
      }
      else if (this.count == "Does patient live in United Kingdom ?" && this.rumack_nomogram == true) {
        this.previousAnswer = answer
        this.count = "What is acetaminophen level(mcg/mL)?"
        return {
          question: "What is acetaminophen level(mcg/mL)?",
          type: 'input',
        }
      }
      else if (this.count == "What is acetaminophen level(mcg/mL)?" && this.rumack_nomogram == true && this.previousAnswer == "no") {
        let line200: any
        let uk: any
        let line98: any
        let line150: any
        let line140: any
        let line300: any
        let line450: any
        let line600: any
        console.log(this.time)
        if (this.time >= 4 && this.time <= 24) {
          line200 = Math.round(Math.exp(5.298317 - ((this.time - 4) * 0.1732868)))
          uk = Math.round(line200 - (0.5 * line200))
          line98 = Math.round(line200 - (0.51 * line200))
          line150 = Math.round(line200 - (0.25 * line200))
          line140 = Math.round(line200 - (0.3 * line200))
          line300 = Math.round(line200 + (0.5 * line200))
          line450 = Math.round(line200 + (1.25 * line200))
          line600 = Math.round(line200 + (2 * line200))
          console.log(line200, uk, line98, line150, line140, line300, line450, line600)
        }
        if (answer < line140) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after` + this.time + `hours is around` + line150 + `,so there is low risk of significant toxicity. Antidote adminitration is not neccessary`,
            type: 'empty',
          }
        }
        else if (answer <= line150 && answer >= line140) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after` + this.time + `hours is around` +
              line150 + `, patient’s acetaminophen(` + line140 + `) is so close to the threshold, rechecking of the level is strongly recommended`,
            type: 'empty',
          }
        }
        else if (answer >= line150 && answer <= line200) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after` + this.time + `hours is around` + line150 + `,so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg over 16 hours.`,
            type: 'empty',
          }
        }
        else if (answer > line200 && answer <= line300) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The toxic threshold after` + this.time + `hours is around` + line200 + `,so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg) over 16 hours.`,
            type: 'empty',
          }
        }
        else if (answer > line300 && answer <= line450) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The measured APAP level is ` + this.time + `   the acetamiinophenlevels of higher than ` + line300 + `indicates possibility of a massive intoxication, Consider increased doses of NAC .\
            NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 12.5 mg/kg rate (200 mg/kg over 16 hours.`,
            type: 'empty',
          }
        }
        else if (answer > line450 && answer <= line600) {
          console.log(line450)
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The measured Acetaminophen level` + this.time + `, the levels of higher than ` + line450 + `,  indicates a massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 18.75 mg/kg rate (200 mg/kg) over 16 hours also fomepizole can be started as a loading dose of 15 mg/kg IV, followed by 10 mg/kg IV every 12 hours for four doses (48-hour period). If indicated beyond this period, dosing is increased to 15 mg/kg every 12 hours to compensate for CYP autoinduction.`,
            type: 'empty',
          }
        }
        else {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The measured Acetaminophen level ` + answer + `, the levels of higher than ` + line600 + `, indicates  a  massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously.Intravenous dosing typically involves a 150 mg / kl bolus over 60 min followed by 12.5 mg / kg / h for 4 hours(50 mg/ kg over 4 hours) then 25 mg / kg rate(200 mg / kg) over 16 hours, in addition, consider Intermittent hemodialysis and fomepizole administration can be started as a loading dose of 15 mg / kg IV, followed by 10 mg / kg IV every 12 hours for four doses(48 - hour period).If indicated beyond this period, dosing is increased to 15 mg / kg every 12 hours to compensate for CYP autoinduction."`,
            type: 'empty',
          }
        }
      }
      else if (this.count == "What is acetaminophen level(mcg/mL)?" && this.rumack_nomogram == true && this.previousAnswer == "yes") {
        let line200: any
        let uk: any
        let line98: any
        let line150: any
        let line140: any
        let line300: any
        let line450: any
        let line600: any
        console.log(this.time)
        if (this.time >= 4 && this.time <= 24) {
          line200 = Math.round(Math.exp(5.298317 - ((this.time - 4) * 0.1732868)))
          uk = Math.round(line200 - (0.5 * line200))
          line98 = Math.round(line200 - (0.51 * line200))
          line150 = Math.round(line200 - (0.25 * line200))
          line140 = Math.round(line200 - (0.3 * line200))
          line300 = Math.round(line200 + (0.5 * line200))
          line450 = Math.round(line200 + (1.25 * line200))
          line600 = Math.round(line200 + (2 * line200))
          console.log(line200, uk, line98, line150, line140, line300, line450, line600)
        }
        if (answer < line98) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after` + this.time + `hours is around` + uk + `,so there is low risk of significant toxicity. Antidote adminitration is not neccessary`,
            type: 'empty',
          }
        }
        else if (answer > line98 && answer < uk) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after` + this.time + `hours is around` +
              line150 + `, patient's acetaminophen(` + answer + `) is so close to the threshold, rechecking of the level is strongly recommended`,
            type: 'empty',
          }
        }
        else if (answer >= uk && answer <= line200) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The treatment threshold after` + this.time + `hours is around` + uk + `,so,the paracetamol level indicates possible toxicity , antidote administration is recomended`,

            type: 'empty',
          }
        }
        else if (answer > line200 && answer <= line300) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The toxic threshold after ` + this.time + `hours is around ` + line200 + `, so, NAC administration is recommended. Acute ingestion standard NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 6.25 mg/kg rate (100 mg/kg) over 16 hours.`,
            type: 'empty',
          }
        }
        else if (answer > line300 && answer <= line450) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The measured acetaminophen level is ` + this.time + `   the acetamiinophenlevels of higher than ` + line300 + ` indicates possibility of a massive intoxication, Consider increased doses of NAC .\
            NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 12.5 mg/kg rate (200 mg/kg over 16 hours.`,
            type: 'empty',
          }
        }
        else if (answer > line450 && answer <= line600) {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The measured Acetaminophen level ` + this.time + `, the levels of higher than ` + line450 + `,  indicates a massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously. Intravenous dosing typically involves a 150 mg/kl bolus over 60 min followed by 12.5 mg/kg/h for 4 hours (50 mg/kg over 4 hours) then 18.75 mg/kg rate (200 mg/kg) over 16 hours also fomepizole can be started as a loading dose of 15 mg/kg IV, followed by 10 mg/kg IV every 12 hours for four doses (48-hour period). If indicated beyond this period, dosing is increased to 15 mg/kg every 12 hours to compensate for CYP autoinduction.`,
            type: 'empty',
          }
        }
        else {
          this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
          this.chronicuser = true
          this.durationofexposure = false
          this.signOfHepaticfailure = false
          return {
            question: `The measured Acetaminophen level ` + answer + `, the levels of higher than ` + line600 + `, indicates  a  massive intoxication, Consider increased doses of NAC .NAC dosing can be given orally or intravenously.Intravenous dosing typically involves a 150 mg / kl bolus over 60 min followed by 12.5 mg / kg / h for 4 hours(50 mg/ kg over 4 hours) then 25 mg / kg rate(200 mg / kg) over 16 hours, in addition, consider Intermittent hemodialysis and fomepizole administration can be started as a loading dose of 15 mg / kg IV, followed by 10 mg / kg IV every 12 hours for four doses(48 - hour period).If indicated beyond this period, dosing is increased to 15 mg / kg every 12 hours to compensate for CYP autoinduction."`,
            type: 'empty',
          }
        }
      }
      else if (this.count == "How many hours was the duration of acetaminophen ingestion ?" && answer == "8-24 hours") {
        this.count = "The exact dose of ingestion is known ?"
        this.durationIngestedDose = "8-24 hours"
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "The exact dose of ingestion is known ?" && answer == "yes" && this.durationIngestedDose == "8-24 hours") {
        this.count = "how many milligrams of acetaminophen is ingested?"
        return {
          question: "how many milligrams of acetaminophen is ingested?",
          type: 'input',
        }
      }
      else if (this.count == "how many milligrams of acetaminophen is ingested?" && this.durationIngestedDose == "8-24 hours") {
        this.ingested_dose = answer
        this.count = "How many kilograms is the patient ?"
        return {
          question: "How many kilograms is the patient ?",
          type: 'input',
        }
      }
      else if (this.count == "How many kilograms is the patient ?" && this.durationIngestedDose == "8-24 hours") {
        this.weight = answer
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        if (this.ingested_dose < 10000 || this.ingested_dose / this.weight < 200) {
          return {
            question: "No further treatment is required and no NAC is needed.",
            type: 'empty',
          }
        }
        else {
          return {
            question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
            type: 'empty',
          }
        }
      }
      else if (this.count == "The exact dose of ingestion is known ?" && answer == "no" && this.durationIngestedDose == "8-24 hours") {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false

        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
        }
      }
      else if (this.count == "How many hours was the duration of acetaminophen ingestion ?" && answer == "24-48 hours") {
        this.count = "The exact dose of ingestion is known ?"
        this.durationIngestedDose = "24-48 hours"
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "The exact dose of ingestion is known ?" && answer == "yes" && this.durationIngestedDose == "24-48 hours") {
        this.count = "how many milligrams of acetaminophen is ingested?"
        return {
          question: "how many milligrams of acetaminophen is ingested?",
          type: 'input',
        }
      }
      else if (this.count == "how many milligrams of acetaminophen is ingested?" && this.durationIngestedDose == "24-48 hours") {
        this.ingested_dose = answer
        this.count = "How many kilograms is the patient ?"
        return {
          question: "How many kilograms is the patient ?",
          type: 'input',
        }
      }
      else if (this.count == "How many kilograms is the patient ?" && this.durationIngestedDose == "24-48 hours") {
        this.weight = answer
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        if (this.ingested_dose < 12000 || this.ingested_dose / this.weight < 300) {
          return {
            question: "No further treatment is required and no NAC is needed.",
            type: 'empty',
          }
        }
        else {
          return {
            question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
            type: 'empty',
          }
        }
      }
      else if (this.count == "The exact dose of ingestion is known ?" && answer == "no" && this.durationIngestedDose == "24-48 hours") {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false

        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
        }
      }
      else if (this.count == "How many hours was the duration of acetaminophen ingestion ?" && answer == "more than 48 hours") {
        this.count = "The exact dose of ingestion is known ?"
        this.durationIngestedDose = "more than 48 hours"
        return {
          question: "The exact dose of ingestion is known ?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "The exact dose of ingestion is known ?" && answer == "yes" && this.durationIngestedDose == "more than 48 hours") {
        this.count = "how many milligrams of acetaminophen is ingested?"
        return {
          question: "how many milligrams of acetaminophen is ingested?",
          type: 'input',
        }
      }
      else if (this.count == "how many milligrams of acetaminophen is ingested?" && this.durationIngestedDose == "more than 48 hours") {
        this.ingested_dose = answer
        this.count = "How many kilograms is the patient ?"
        return {
          question: "How many kilograms is the patient ?",
          type: 'input',
        }
      }
      else if (this.count == "How many kilograms is the patient ?" && this.durationIngestedDose == "more than 48 hours") {
        this.weight = answer
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        if (this.ingested_dose <= 4000) {
          return {
            question: "No further treatment is required and no NAC is needed.",
            type: 'empty',
          }
        }
        else {
          this.count = "Does the patient have any of these signs: nausea/vomiting/abdominal pain?"
          return {
            question: "Does the patient have any of these signs: nausea/vomiting/abdominal pain?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
      }
      else if (this.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "yes") {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
        }
      }
      else if (this.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "no") {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "No further treatment is required and no NAC is needed.",
          type: 'empty',
        }
      }
      else if (this.count == "The exact dose of ingestion is known ?" && answer == "no" && this.durationIngestedDose == "more than 48 hours") {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "To be continued",
          type: 'empty',
        }
      }
      else if (this.count == "Is the duration of acetaminophen ingestion is known ?" && answer == 'no') {
        this.count = "What is acetaminophen level(mcg/mL)?"
        return {
          question: "What is acetaminophen level(mcg/mL)?",
          type: 'input',
        }

      }
      else if (this.count == "What is acetaminophen level(mcg/mL)?" && answer > 0) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "Start standard doses of NAC",
          type: 'empty',
        }
      }
      else if (this.count == "What is acetaminophen level(mcg/mL)?" && answer <= 0) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "What is patient's PT ?",
          type: 'input',
        }
      }
      else if (this.count == "What is patient's PT ?" && answer > 14) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "Start standard doses of NAC",
          type: 'empty',
        }
      }
      else if (this.count == "What is patient's PT ?" && answer <= 14) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "What is patient's INR ?",
          type: 'input',
        }
      }
      else if (this.count == "What is patient's INR ?" && answer > 2) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "Start standard doses of NAC",
          type: 'empty',
        }
      }
      else if (this.count == "What is patient's INR ?" && answer <= 2) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "What is patient's AST ?",
          type: 'input',
        }

      }
      else if (this.count == "What is patient's AST ?" && answer > 80) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "Start standard doses of NAC",
          type: 'empty',
        }
      }
      else if (this.count == "What is patient's AST ?" && answer <= 80) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.chronicuser = true
        this.durationofexposure = false
        this.signOfHepaticfailure = false
        return {
          question: "No further treatment is required and no NAC is needed.",
          type: 'empty',
        }
      }
    }
    else if (this.chronicuser == true && this.durationofexposure == false && this.signOfHepaticfailure == false) {
      if (this.count == "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?" && this.checkTemp == false) {
        this.count = "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?"
        this.checkTemp = true
        return {
          question: "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      if (this.count == "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?" && answer == "yes") {
        this.count = "Is the exact daily dose known?"
        return {
          question: "Is the exact daily dose known?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "Is the exact daily dose known?" && answer == "yes") {
        this.count = "how many miligrams of acetaminophen is ingested daily?"
        return {
          question: "how many miligrams of acetaminophen is ingested daily?",
          type: 'input',
        }
      }
      else if (this.count == "how many miligrams of acetaminophen is ingested daily?") {
        this.count = "how many miligrams of acetaminophen is ingested daily?"
        if (answer <= 4000) {
          this.count = "Is there any signs of hepatic failure?"
          this.chronicuser = false
          this.signOfHepaticfailure = true
          this.durationofexposure = false
          return {
            question: "No further treatment is required and no NAC is needed.",
            type: 'empty',
          }
        }
        else {
          this.count = "Does the patient have any of these signs: nausea/vomiting/abdominal pain?"
          return {
            question: "Does the patient have any of these signs: nausea/vomiting/abdominal pain?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
      }
      else if (this.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "no") {
        this.count = "Is there any signs of hepatic failure?"
        this.chronicuser = false
        this.signOfHepaticfailure = true
        this.durationofexposure = false
        return {
          question: "No further treatment is required and no NAC is needed.",
          type: 'empty',
        }
      }
      else if (this.count == "Does the patient have any of these signs: nausea/vomiting/abdominal pain?" && answer == "yes") {
        this.count = "Is there any signs of hepatic failure?"
        this.chronicuser = false
        this.signOfHepaticfailure = true
        this.durationofexposure = false
        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
        }
      }
      else if (this.count == "Is the exact daily dose known?" && answer == "no") {
        this.count = "Is there any signs of hepatic failure?"
        this.chronicuser = false
        this.signOfHepaticfailure = true
        this.durationofexposure = false
        return {
          question: "Start standard or high doses of NAC and measure serum ALT,AST,PT,INR, bicarbonat levels",
          type: 'empty',
        }
      }
      else if (this.count == "Is patient a chronic acetaminophen user? (using acetaminophen for more than 24 hours?" && answer == "no") {
        console.log(this.count)
        this.count = "Is there any signs of hepatic failure?"
        this.chronicuser = false
        this.signOfHepaticfailure = true
        this.durationofexposure = false
        return {
          question: "Is there any signs of hepatic failure?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }

      }
    }
    else if (this.chronicuser == false && this.durationofexposure == false && this.signOfHepaticfailure == true) {
      console.log("hello from outside 2")
      console.log(this.checkTemp)

      if (this.count == "Is there any signs of hepatic failure?" && this.checkTemp == true) {
        this.count = "Is there any signs of hepatic failure?"
        this.checkTemp = false
        return {
          question: "Is there any signs of hepatic failure?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      if (this.alertCheck >= 8) {
        return {
          question: "done"
        }
      }
      if (this.complexCount == 8 && this.alertCheck < 8) {
        console.log("hello from outside 1")
        console.log(this.measuredPT == "yes", this.patientsptvalue != null)
        if (this.measuredPT == "yes" && this.patientsptvalue > 100) {
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
          this.alertCheck += 1
          this.measuredPT == "no"
        }
        if (this.arterialPh == "yes" && this.patientsarterialvalue < 7.3) {
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
          this.alertCheck += 1
          this.arterialPh == "no"
        }
        if (this.measuredInr == "yes" && this.patientsinrvalue > 6.5) {
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
          this.alertCheck += 1
          this.measuredInr == "no"
        }
        if (this.measuredCreatinin == "yes" && this.patientscreatinevalue > 3.3) {
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
          this.alertCheck += 1
          this.measuredCreatinin == "no"
        }
        if (this.calculatedEncephalopathyGrade == "yes" && this.patientsencephalopathyvalue > 2) {
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
          this.alertCheck += 1
          this.calculatedEncephalopathyGrade == "no"
        }
        if (this.measuredLactat4 == "yes" && this.patientslactatelevelvalue > 3.5) {
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
          this.alertCheck += 1
          this.measuredLactat4 == "no"
        }
        if (this.measuredLactat12 == "yes" && this.patientslactatelevelvalue12 > 3) {
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
          this.alertCheck += 1
          this.measuredLactat12 == "no"
        }
        if (this.measuredPhosphate48to96 == "yes" && this.patientshosphatevalue > 3.75) {
          alert("In the presence of one of the following criteria, the patient needs a prompt referral / transfer to a liver transplant center: Acidosis (admission arterial pH < 7.30) OR Hepatic encephalopathy (grade III or IV), AND coagulopathy (PT > 100 s), AND acute kidney injury (creatinine > 3.3 mg/dL), OR Hyperlactatemia (4-hour lactate > 3.5 mmol/L, or 12-hour lactate > 3.0 mmol/L")
          this.alertCheck += 1
          this.measuredPhosphate48to96 == "no"
        }
        // else {
        //   alert("At this time, patient does not meet transplant or referral criteria.  Reevaluation of King's College Criteria for Acetaminophen Toxicity is recommended")
        //   this.alertCheck += 1
        //   this.measuredPT == "no"
        // }
      }
      if (this.count == "Is there any signs of hepatic failure?" && answer == "yes") {
        this.count = "PT is measured?"
        return {
          question: "PT is measured?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "PT is measured?") {
        this.measuredPT = answer
        this.count = "INR is measured?"
        return {
          question: "INR is measured?",
          type: 'checkbox',
          answer: ['yes', 'no']
        }
      }
      else if (this.count == "INR is measured?") {
        if (this.measuredInr == null) {
          this.measuredInr = answer
          this.count = "Arterial pH is measured?"
          return {
            question: "Arterial pH is measured?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.complexCount = this.complexCount + 1

          this.count = "Creatinine level is measured ?"
          if (this.measuredInr == "yes") {
            this.count = "What is INR ?"
            return {
              question: "What is INR ?",
              type: 'input',
            }
          }
          else {
            return {
              question: "Measuring INR is recommended",
              type: 'empty',
            }
          }
        }
      }
      else if (this.count == "Arterial pH is measured?") {
        if (this.arterialPh == null) {
          this.arterialPh = answer
          this.count = "Creatinine level is measured ?"
          return {
            question: "Creatinine level is measured ?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.complexCount = this.complexCount + 1

          this.count = "INR is measured?"
          if (this.arterialPh == "yes") {
            this.count = "What is Arterial pH ?"
            return {
              question: "What is Arterial pH ?",
              type: 'input',
            }
          }
          else {
            return {
              question: "arterial pH measurement is recommended",
              type: 'empty',
            }
          }
        }
      }
      else if (this.count == "Creatinine level is measured ?") {
        if (this.measuredCreatinin == null) {
          this.measuredCreatinin = answer
          this.count = "Encephalopathy Grade is evaluated?"
          return {
            question: "Encephalopathy Grade is evaluated?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.complexCount = this.complexCount + 1

          this.count = "Encephalopathy Grade is evaluated?"
          if (this.measuredCreatinin == "yes") {
            this.count = "What is creatinine value(mg/dL)?"
            return {
              question: "What is creatinine value(mg/dL)?",
              type: 'input',
            }
          }
          else {
            return {
              question: "Creatinine measurement is recommended",
              type: 'empty',
            }
          }
        }
      }
      else if (this.count == "Encephalopathy Grade is evaluated?") {
        if (this.calculatedEncephalopathyGrade == null) {
          this.calculatedEncephalopathyGrade = answer
          this.count = "4h Lactate level is evaluated?"
          return {
            question: "4h Lactate level is evaluated?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.complexCount = this.complexCount + 1

          this.count = "4h Lactate level is evaluated?"
          if (this.calculatedEncephalopathyGrade == "yes") {
            this.count = "What is the grade of encephalopathy?"
            return {
              question: "What is the grade of encephalopathy?",
              type: 'input',
            }
          }
          else {
            return {
              question: "Evaluation of encephalopathy grade is recommended",
              type: 'empty',
            }
          }
        }
      }
      else if (this.count == "4h Lactate level is evaluated?") {
        if (this.measuredLactat4 == null) {
          this.measuredLactat4 = answer
          this.count = "12h Lactate level is evaluated?"
          return {
            question: "12h Lactate level is evaluated?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.complexCount = this.complexCount + 1

          this.count = "12h Lactate level is evaluated?"
          if (this.measuredLactat4 == "yes") {
            this.count = "What is 4h lactate level (mmol/L) after fluid  resuscitation ?"
            return {
              question: "What is 4h lactate level (mmol/L) after fluid  resuscitation ?",
              type: 'input',
            }
          }
          else {
            return {
              question: "Evaluation of encephalopathy grade is recommended",
              type: 'empty',
            }
          }
        }
      }
      else if (this.count == "12h Lactate level is evaluated?") {
        if (this.measuredLactat12 == null) {
          this.measuredLactat12 = answer
          this.count = "48-96h Phosphate level (mmol/L) is evaluated?"
          return {
            question: "48-96h Phosphate level (mmol/L) is evaluated?",
            type: 'checkbox',
            answer: ['yes', 'no']
          }
        }
        else {
          this.count = "48-96h Phosphate level (mmol/L) is evaluated?"
          this.complexCount = this.complexCount + 1

          if (this.measuredLactat12 == "yes") {
            this.count = "What is 12h lactate level (mmol/L) after fluid  resuscitation ?"
            return {
              question: "What is 12h lactate level (mmol/L) after fluid  resuscitation ?",
              type: 'input',
            }
          }
          else {
            return {
              question: "Evaluation of encephalopathy grade is recommended",
              type: 'empty',
            }
          }
        }
      }
      else if (this.count == "48-96h Phosphate level (mmol/L) is evaluated?") {
        if (answer == 123456) {
          this.complexCount = this.complexCount + 1
          if (this.measuredPhosphate48to96 == "yes") {
            this.count = "What is 48-96h Phosphate level (mmol/L) after fluid  resuscitation ?)"
            return {
              question: "What is 48-96h Phosphate level (mmol/L) after fluid  resuscitation ?)",
              type: 'input',
            }
          }
          else {
            return {
              question: "Phosphate level measurement at 48-96 hrs. is recommended",
              type: 'empty',
            }
          }
        }
        if (this.ransomLastCheck == false) {
          this.measuredPhosphate48to96 = answer
          this.count = "Arterial pH is measured?"
          this.complexCount = this.complexCount + 1
          this.ransomLastCheck = true
          if (this.measuredPT == "yes") {
            this.count = "What is patient's PT ?"
            return {
              question: "What is patient's PT ?",
              type: 'input',
            }
          }
          else {
            return {
              question: "Measuring PT is recommended",
              type: 'empty',
            }
          }
        }
        else {
          this.count = "48-96h Phosphate level (mmol/L) is evaluated?"
          this.complexCount = this.complexCount + 1

          if (this.measuredPhosphate48to96 == "yes") {
            return {
              question: "What is 48-96h Phosphate level (mmol/L) after fluid  resuscitation ?",
              type: 'empty',
            }
          }
          else {
            return {
              question: "Phosphate level measurement at 48-96 hrs. is recommended",
              type: 'empty',
            }
          }
        }
      }
      else if (this.count == "What is patient's PT ?") {
        this.count = "Arterial pH is measured?"
        this.patientsptvalue = answer
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.count == "What is Arterial pH ?") {
        this.count = "INR is measured?"
        console.log("1227")
        this.patientsarterialvalue = answer
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.count == "What is INR ?") {
        this.count = "Creatinine level is measured ?"
        this.patientsinrvalue = answer
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.count == "What is creatinine value(mg/dL)?") {
        this.count = "Encephalopathy Grade is evaluated?"
        this.patientscreatinevalue = answer
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.count == "What is the grade of encephalopathy?") {
        this.count = "4h Lactate level is evaluated?"
        this.patientsencephalopathyvalue = answer
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.count == "What is 4h lactate level (mmol/L) after fluid  resuscitation ?") {
        this.count = "12h Lactate level is evaluated?"
        this.patientslactatelevelvalue = answer
        let abc: any = this.getQuestion(12)
        return abc
      }
      else if (this.count == "What is 12h lactate level (mmol/L) after fluid  resuscitation ?") {
        this.count = "48-96h Phosphate level (mmol/L) is evaluated?"
        this.patientslactatelevelvalue12 = answer
        let abc: any = this.getQuestion(123456)
        return abc
      }
      else if (this.count == "What is 48-96h Phosphate level (mmol/L) after fluid  resuscitation ?)") {
        // this.count = "12h Lactate level is evaluated?"
        this.patientshosphatevalue = answer
        let abc: any = this.getQuestion(12)
        return abc
      }

      else if (this.count == "Is there any signs of hepatic failure?" && answer == "no") {
        console.log(this.count)
        this.count = "Is there any signs of hepatic failure?"
        this.chronicuser = false
        this.signOfHepaticfailure = false
        this.durationofexposure = false
        return {
          question: "At this time , patient does not meet transplant or referral criteria.  Reevaluation of King's College Criteria for Acetaminophen Toxicity is recommended ",
          type: 'empty',
        }

      }
    }
    return {
      abc: "done"
    }
  }
}
