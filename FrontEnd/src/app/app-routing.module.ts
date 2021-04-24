import { DaSearchComponent } from './doctor-advice/da-search/da-search.component';
import { MyPatientsComponent } from './doctor-advice/my-patients/my-patients.component';
import { ViewConsultationComponent } from './medi-data-repo/view-consultation/view-consultation.component';
import { PatientSettingsComponent } from './medi-data-repo/patient-settings/patient-settings.component';
import { SignupDoctorComponent } from './welcome-page/signup-doctor/signup-doctor.component';
import { RPatientDataComponent } from './reporter/r-patient-data/r-patient-data.component';
import { HomeComponent } from './welcome-page/home/home.component';
import { RHomeComponent } from './reporter/r-home/r-home.component';
import { DaHomeComponent } from './doctor-advice/da-home/da-home.component';
import { MdrHomeComponent } from './medi-data-repo/mdr-home/mdr-home.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MediDataRepoComponent } from './medi-data-repo/medi-data-repo.component';
import { HistoryComponent } from './medi-data-repo/history/history.component';
import { InsertDataComponent } from './medi-data-repo/insert-data/insert-data.component';
import { SignupComponent } from './welcome-page/signup/signup.component';
import { LogInComponent } from './welcome-page/log-in/log-in.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpChiefComponent } from './reporter/sign-up-chief/sign-up-chief.component';
import { DoctorDataComponent } from './reporter/doctor-data/doctor-data.component';

const routes: Routes = [
  //{path: 'home1', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {path: 'home', component: HomeComponent},
  {path: 'login', component: LogInComponent},
  {path: 'signup', component: SignupComponent},

  {path: 'patient', redirectTo: 'patient/home' },
  {path: 'patient/home', component: MdrHomeComponent},
  {path: 'patient/data', component: InsertDataComponent},
  {path: 'patient/history', component: HistoryComponent},
  {path: 'patient/settings', component: PatientSettingsComponent},
  {path: 'patient/consultations', component: ViewConsultationComponent},
  


  { path: 'doctor', redirectTo: 'doctor/home'},
  {path: 'doctor/home', component: DaHomeComponent},
  {path: 'doctor/search', component: DaSearchComponent},
  {path: 'doctor/patients', component: MyPatientsComponent},
  // {path: 'doctor/settings', component: DaHomeComponent},

  {path: 'chief', redirectTo: 'chief/home'},
  {path: 'chief/home', component: RHomeComponent},
  {path: 'chief/patients', component: RPatientDataComponent},
  {path: 'chief/newDoctor', component: SignupDoctorComponent},
  {path: 'chief/newChief', component: SignUpChiefComponent},
  {path: 'chief/doctors', component: DoctorDataComponent}



];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
