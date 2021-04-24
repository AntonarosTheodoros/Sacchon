import { SignupComponent } from './welcome-page/signup/signup.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MediDataRepoComponent } from './medi-data-repo/medi-data-repo.component';
import { CarbService } from './medi-data-repo/service/carb.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InsertCarbComponent } from './medi-data-repo/insert-data/insert-carb/insert-carb.component';

import { LogInComponent } from './welcome-page/log-in/log-in.component';
import { HomeComponent } from './welcome-page/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HistoryComponent } from './medi-data-repo/history/history.component';
import { InsertDataComponent } from './medi-data-repo/insert-data/insert-data.component';
import { PatientSettingsComponent } from './medi-data-repo/patient-settings/patient-settings.component';
import { InsertGlucoseComponent } from './medi-data-repo/insert-data/insert-glucose/insert-glucose.component';
import { NavBarComponent } from './welcome-page/nav-bar/nav-bar.component';
import { MdrNavBarComponent } from './medi-data-repo/mdr-nav-bar/mdr-nav-bar.component';
import { MdrHomeComponent } from './medi-data-repo/mdr-home/mdr-home.component';
import { DoctorAdviceComponent } from './doctor-advice/doctor-advice.component';
import { DaNavBarComponent } from './doctor-advice/da-nav-bar/da-nav-bar.component';
import { DaHomeComponent } from './doctor-advice/da-home/da-home.component';
import { InsertConsultationComponent } from './doctor-advice/insert-consultation/insert-consultation.component';
import { AverageDataComponent } from './medi-data-repo/history/average-data/average-data.component';
import { CommonModule } from '@angular/common';
import { EditCardComponent } from './medi-data-repo/history/edit-card/edit-card.component';
import { LogOutComponent } from './welcome-page/log-out/log-out.component';
import { SignupDoctorComponent } from './welcome-page/signup-doctor/signup-doctor.component';
import { ReporterComponent } from './reporter/reporter.component';
import { RHomeComponent } from './reporter/r-home/r-home.component';
import { RNavBarComponent } from './reporter/r-nav-bar/r-nav-bar.component';
import { RPatientDataComponent } from './reporter/r-patient-data/r-patient-data.component';
import { ViewConsultationComponent } from './medi-data-repo/view-consultation/view-consultation.component';
import { MyPatientsComponent } from './doctor-advice/my-patients/my-patients.component';
import { DaSearchComponent } from './doctor-advice/da-search/da-search.component';
import { NewDoctorComponent } from './reporter/new-doctor/new-doctor.component';
import { SignUpChiefComponent } from './reporter/sign-up-chief/sign-up-chief.component';
import { DoctorDataComponent } from './reporter/doctor-data/doctor-data.component';


@NgModule({
  declarations: [
    AppComponent,
    InsertCarbComponent,
    HistoryComponent,
    InsertDataComponent,
    PatientSettingsComponent,
    InsertGlucoseComponent,
    HistoryComponent,
    MediDataRepoComponent,
    WelcomePageComponent,
    LogInComponent,
    SignupComponent,
    HomeComponent,
    NavBarComponent,
    MdrNavBarComponent,
    MdrHomeComponent,
    DoctorAdviceComponent,
    DaNavBarComponent,
    DaHomeComponent,
    InsertConsultationComponent,
    AverageDataComponent,
    EditCardComponent,
    LogOutComponent,
    SignupDoctorComponent,
    ReporterComponent,
    RHomeComponent,
    RNavBarComponent,
    RPatientDataComponent,
    ViewConsultationComponent,
    MyPatientsComponent,
    DaSearchComponent,
    NewDoctorComponent,
    SignUpChiefComponent,
    DoctorDataComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CarbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
