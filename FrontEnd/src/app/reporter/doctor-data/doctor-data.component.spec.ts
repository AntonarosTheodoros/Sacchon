import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDataComponent } from './doctor-data.component';

describe('DoctorDataComponent', () => {
  let component: DoctorDataComponent;
  let fixture: ComponentFixture<DoctorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
