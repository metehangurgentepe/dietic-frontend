import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDietPlan } from './update_dietPlan.component';

describe('IconsComponent', () => {
  let component: UpdateDietPlan;
  let fixture: ComponentFixture<UpdateDietPlan>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDietPlan ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDietPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

