import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';

const routes: Routes = [
  {
    path: '', component: HomepageComponent
  },
  {
    path: 'questionanaire', component: QuestionnaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
