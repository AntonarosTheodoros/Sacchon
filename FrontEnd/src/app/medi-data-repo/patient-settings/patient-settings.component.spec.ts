import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSettingsComponent } from './patient-settings.component';

describe('PatientSettingsComponent', () => {
  let component: PatientSettingsComponent;
  let fixture: ComponentFixture<PatientSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
