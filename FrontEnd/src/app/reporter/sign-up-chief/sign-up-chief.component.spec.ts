import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpChiefComponent } from './sign-up-chief.component';

describe('SignUpChiefComponent', () => {
  let component: SignUpChiefComponent;
  let fixture: ComponentFixture<SignUpChiefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpChiefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpChiefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
