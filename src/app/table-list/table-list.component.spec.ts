import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListComponent } from './table-list.component';

describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  function openPopup() {
    // URL of the popup screen
    var url = "https://www.example.com/popup.html";
  
    // Options for the popup screen
    var options = "width=500,height=500,menubar=no,toolbar=no";
  
    // Open the popup screen
    window.open(url, "Popup", options);
  }
});
