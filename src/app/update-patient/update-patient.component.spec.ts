import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientComponents } from './update.component';

describe('UserProfileComponent', () => {
  let component: UpdatePatientComponents;
  let fixture: ComponentFixture<UpdatePatientComponents>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePatientComponents ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatientComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});